import React, { Component } from 'react';
import Link from 'next/link';
import s from './Footer.scss';

class Footer extends Component {
  render() {
    const langs = [
      {
        text: 'En',
        link: '/en',
      },
      {
        text: 'De',
        link: '/de',
      },
    ];

    return (
      <footer className={s.root}>
        <div className={s.container}>
          <span className={s.copyright}>© 2018 Apical Technology Group, LP</span>
          <div className={s.langs}>
            Language:
            {langs.map(({ text, link }) => (
              <Link key={text} href={link}>
                <a className={s.lang}>{text}</a>
              </Link>
            ))}
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
