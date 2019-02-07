import React, { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import s from './Navigation.scss';

class Navigation extends Component {
  render() {
    const links = [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Mission',
        link: '/mission',
      },
      {
        text: 'About us',
        link: '/about',
      },
      {
        text: 'Talentica',
        link: '/talentica',
      },
      {
        text: 'Careers',
        link: '/career',
      },
      {
        text: 'Contact us',
        link: '/contact',
      },
    ];
    const { router } = this.props;

    return (
      <nav>
        <ul className={s.list}>
          {links.map(({ text, link }, index) => (
            <li key={text}>
              <Link prefetch href={link}>
                <a className={router.pathname === link ? s.linkActive : s.link} title={text}>
                  {text}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default withRouter(Navigation);
