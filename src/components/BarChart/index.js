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

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#537492')
      .style('stroke', 'black')
      .style('stroke-width', '2px')
      .attr('x', 250)
      .attr('y', (d, i) => i * 25 + 5)
      .attr('height', 20)
      .attr('width', d => xScale(d.value))
  }

  render() {
    return <svg
      ref={node => this.node = node} width={500} height={300}>
    </svg>
  }
}

export default BarChart;
