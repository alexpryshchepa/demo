import '@babel/polyfill';
import App, { Container } from 'next/app';
import { appWithTranslation } from 'i18n';
import React from 'react';
import Page from 'components/Page';
import withReduxStore from 'core/withReduxStore';
import { Provider } from 'react-redux';

class MyApp extends App {
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

export default withReduxStore(appWithTranslation(MyApp));
