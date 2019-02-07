import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Loading.scss';

class Loading extends Component {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
  };

  static defaultProps = {
    size: 24,
    color: '#000',
  };

  render() {
    const { size, color } = this.props;

    return (
      <div className={s.root}>
        <span
          className={s.spinner}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderColor: color,
            borderRightColor: 'transparent',
          }}
        />
      </div>
    );
  }
}

export default Loading;
