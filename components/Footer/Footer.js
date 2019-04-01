import React, { Component } from 'react';
import { config, i18n } from 'i18n';
import s from './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <footer className={s.root}>
        <div className={s.container}>
          <span className={s.copyright}>© 2018 Technology Group, LP</span>
          <div className={s.langs}>
            Language:
            {[config.defaultLanguage, ...config.otherLanguages].map((lang) => {
              const text = lang.substr(0, 1).toUpperCase() + lang.substr(1, lang.length - 1);

              return (
                <button
                  className={i18n.language === lang ? s.langActive : s.lang}
                  key={lang}
                  type="button"
                  onClick={() => i18n.changeLanguage(lang)}
                >
                  {text}
                </button>
              );
            })}
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
