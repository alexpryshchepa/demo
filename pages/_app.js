import '@babel/polyfill';
import App, { Container } from 'next/app';
import React from 'react';
import Page from 'components/Page';
import withReduxStore from 'core/withReduxStore';
import { Provider } from 'react-redux';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let componentProps = {};

    if (Component.getInitialProps) {
      componentProps = await Component.getInitialProps(ctx);
    }

    return { componentProps };
  }

  render() {
    const {
      Component,
      componentProps,
      reduxStore,
    } = this.props;

    return (
      <Container>
        <Provider store={reduxStore}>
          <Page>
            <Component {...componentProps} />
          </Page>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
