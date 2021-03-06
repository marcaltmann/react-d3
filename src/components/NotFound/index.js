// src/components/NotFound/index.js
import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

import './style.css';

export default class NotFound extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('NotFound', className)} {...props}>
        <h1>
          404 <small>Not Found :(</small>
        </h1>
        <p>
          <Link to="/about">About</Link>
        </p>
      </div>
    );
  }
}
