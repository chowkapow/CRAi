import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer text-center text-muted">
        <div className="=container">
          <p>
            Powered by <a href="http://themoviedb.org">TMDb</a> | Source on{' '}
            <a href="https://github.com/chowkapow/CRAi">Github</a>
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
