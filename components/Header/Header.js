import React, { Component } from 'react';
import Link from 'next/link';
import Navigation from 'components/Navigation';
import Button from 'components/Button';
import { TimelineLite } from 'gsap';
import { Logo } from 'icons';
import s from './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);

    this.logoRef = React.createRef();
    this.navRef = React.createRef();
    this.loginRef = React.createRef();
    this.lineRef = React.createRef();

    this.entryAnimation = new TimelineLite({ paused: true });
  }

  componentDidMount() {
    this.fillEntryAnimation();
  }

  fillEntryAnimation = () => this.entryAnimation
    .to(this.logoRef.current, 0.6, { opacity: 1, visibility: 'visible', transform: 'translateY(0)' })
    .to(this.navRef.current, 0.6, { opacity: 1, visibility: 'visible', transform: 'translateY(0)' }, '-=0.2')
    .to(this.loginRef.current, 0.6, { opacity: 1, visibility: 'visible', transform: 'translateY(0)' }, '-=0.4')
    .to(this.lineRef.current, 0.6, { opacity: 1, transform: 'translateX(0)' }, '-=0.6');

  render() {
    return (
      <header className={s.root}>
        <div className={s.container}>
          <Link prefetch href="/">
            <a className={s.logo} ref={this.logoRef}>
              <Logo />
            </a>
          </Link>
          <div className={s.nav} ref={this.navRef}>
            <Navigation />
          </div>
          <div className={s.login} ref={this.loginRef}>
            <Button element="link" href="/login">Investor login</Button>
          </div>
        </div>
        <div className={s.line} ref={this.lineRef} />
      </header>
    );
  }
}

export default Header;
