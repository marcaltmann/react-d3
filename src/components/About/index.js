import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

import './style.css';

export default class About extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('About', className)} {...props}>
        <h1>
          About
        </h1>
        <p>
          <Link to="/">Back</Link>
        </p>
      </div>
    );
  }
}
