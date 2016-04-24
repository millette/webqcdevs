/* globals $, d3*/
'use strict'

$(() => {
  const margin = {top: 20, right: 20, bottom: 30, left: 40}
  const width = 660 - margin.left - margin.right
  const height = 350 - margin.top - margin.bottom

  const x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1)

  const y = d3.scale.linear()
    .range([height, 0])

  const xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')

  const yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(10, '%')

  const svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.csv('data.csv', type, function (error, data) {
    if (error) throw error

    x.domain(data.map(function (d) { return d.letter }))
    y.domain([0, d3.max(data, function (d) { return d.frequency })])

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Frequency')

    svg.selectAll('.bar')
        .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function (d) { return x(d.letter) })
        .attr('width', x.rangeBand())
        .attr('y', function (d) { return y(d.frequency) })
        .attr('height', function (d) { return height - y(d.frequency) })
  })

  function type (d) {
    d.frequency = +d.frequency
    return d
  }
})
