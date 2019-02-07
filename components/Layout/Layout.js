import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { TimelineLite, Power2 } from 'gsap';
import { Logo } from 'icons';
import s from './Layout.scss';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.headerRef = React.createRef();
    this.wallRef = React.createRef();
    this.logoRef = React.createRef();

    this.entryAnimation = new TimelineLite({ paused: true });
  }

  componentDidMount() {
    this.headerEntryAnimation = this.headerRef.current.entryAnimation;
    this.fillEntryAnimation();
  }

  fillEntryAnimation = () => this.entryAnimation
    .to(this.logoRef.current, 0.6, { transform: 'scale(1.2)' })
    .to(this.logoRef.current, 0.8, { opacity: 0, transform: 'scale(0)' })
    .to(this.wallRef.current, 2, { transform: 'translateY(100%)', ease: Power2.easeOut }, '-=0.2')
    .set(this.wallRef.current, { css: { display: 'none' } });

  render() {
    const { children } = this.props;

    return (
      <div className={s.root}>
        <div className={s.page}>
          <Header ref={this.headerRef} />
          <main className={s.body}>
            {children}
          </main>
          <Footer />
        </div>
        <div className={s.wall} ref={this.wallRef}>
          <div className={s.logo} ref={this.logoRef}>
            <Logo />
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
