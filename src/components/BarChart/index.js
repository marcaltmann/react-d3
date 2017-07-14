import React, { Component } from 'react'
import './style.css'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'

class BarChart extends Component {
  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }

  componentDidMount() {
    this.createBarChart()
  }

  componentDidUpdate() {
    this.createBarChart()
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
    const dataMax = max(this.props.data, d => d.value)
    const xScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[0]])

    const rects = this.props.data.map((d, i) => {
      return (
        <rect className="bar-chart__bar" key={i} x={250} y={i * 25 + 5} width={xScale(d.value)} height={20} />
      )
    });

    return (
      <svg className="bar-chart" ref={node => this.node = node} width={500} height={300}>
        {rects}
      </svg>
    );
  }
}

export default BarChart;
