import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './Page.scss';

class Page extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <style global jsx>{styles}</style>
        <style global jsx>{styles}</style>
        {children}
      </Fragment>
    );
  }
}

export default Page;
