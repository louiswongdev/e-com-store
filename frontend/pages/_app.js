import Router from 'next/router';
import NProgress from 'nprogress';
import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';

import '../components/styles/nprogress.css';
import withData from '../lib/withData';
// import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  console.log(apollo);
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

// if any of the pages have a getInitialProps method on them
// (they will since withData HOC is adding to them), then we're
// going to wait
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
