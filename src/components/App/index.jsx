import React, { Component } from 'react';
//import classnames from 'classnames';
import BarChart from '../BarChart';

import './style.css';

function transformData(originalData) {
  let transformedData = [];
  for (let key in originalData) {
    transformedData.push({
      label: key,
      value: originalData[key][0],
    });
  }
  return transformedData;
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch('http://81.169.214.217:12345/chartdata')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response not ok.');
    })
    .then((json) => {
      console.log(json)
      this.setState({
        data: transformData(json),
      });
    })
    .catch((error) => {
      console.log('There has been an error');
    })
  }

  render() {
    return (
      <main>
        <div>
          <BarChart data={this.state.data} size={[250, 250]} />
        </div>
        <div>
          <button onClick={this.getData}>
            Update
          </button>
        </div>
      </main>
    );
  }
}

export default App;





