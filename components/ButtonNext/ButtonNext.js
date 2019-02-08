import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'i18n';
import { ChevronRight } from 'icons';
import s from './ButtonNext.scss';

class Button extends Component {
  static propTypes = {
    element: PropTypes.string,
    children: PropTypes.string.isRequired,
  };

  static defaultProps = {
    element: 'button',
  }

  render() {
    const { element, children, ...props } = this.props;

    if (element === 'link') {
      return (
        <Link {...props}>
          <a className={s.link}>{children}</a>
        </Link>
      );
    }

    return (
      /* eslint-disable-next-line react/button-has-type */
      <button className={s.button} {...props}>
        <span>
          {children}
          <span className={s.icon}>
            <ChevronRight />
          </span>
        </span>
      </button>
    );
  }
}

export default Button;
