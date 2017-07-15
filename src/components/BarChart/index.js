import React, { Component } from 'react'
import enhanceWithClickOutside from 'react-click-outside';
import './style.css'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'

class BarChart extends Component {
  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
    this.selectBar = this.selectBar.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.state = {
      selected: null
    }
  }

  componentDidMount() {
    this.createBarChart()
  }

  componentDidUpdate() {
    this.createBarChart()
  }

  selectBar(newSelected) {
    if (newSelected === this.state.selected) {
      this.setState({selected: null});
      return;
    }

    this.setState({
      selected: newSelected
    });
  }

  handleClickOutside() {
    this.setState({selected: null});
  }

  createBarChart() {
    const node = this.node
    const dataMax = max(this.props.data, d => d.value)
    const xScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[0]])
    const yScale = scaleOrdinal()
      .domain(this.props.data.map(d => d.label))
      .range([0, 25, 50, 75, 100, 125, 150, 175, 200, 225]);

    let xAxis = axisBottom()
      .scale(xScale)
      .ticks(5);


    let yAxis = axisLeft()
      .scale(yScale)

    select(node)
      .selectAll('g')
      .remove();

    select(node)
      .append('g')
      .attr('transform', 'translate(240, 15)')
      .call(yAxis);

    select(node)
      .append('g')
      .attr('transform', 'translate(250, 260)')
      .call(xAxis);

  }

  render() {
    const { data } = this.props;
    const { selected } = this.state;

    const dataMax = max(this.props.data, d => d.value)
    const xScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[0]])

    const rects = this.props.data.map((d, i) => {
      let className = 'bar-chart__bar';
      if (this.state.selected === i) {
        className += ' bar-chart__bar--selected';
      }

      return (
        <rect
          className={className}
          key={i} x={250} y={i * 25 + 5}
          width={xScale(d.value)}
          height={20}
          onClick={(e) => { e.stopPropagation(); this.selectBar(i); }}
        />
      )
    });

    let details
    let current = data[selected]
    if (current) {
      details = (
        <aside onClick={(e) => { e.stopPropagation(); }}>
          <h2>{current.label}</h2>
          <p>Value: {current.value}</p>
        </aside>
      )
    }

    return (
      <div className="container" onClick={this.handleClickOutside}>
        <svg className="bar-chart" ref={node => this.node = node} width={500} height={300}>
          {rects}
        </svg>
        {details}
      </div>
    );
  }
}

export default enhanceWithClickOutside(BarChart);
