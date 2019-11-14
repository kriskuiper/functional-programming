import * as d3 from 'd3'

export default function(data, width = 500, height = 360) {
	const padding = 50
	const ticks = 6

	const svg = createChartBlock('.bar-chart', width, height)
	const scale = calculateXScale(data, padding, width)

	addLabelsToBars(data, svg)
	addGridLinesToHorizontalAxis(svg, height, scale)
	addHorizontalAxis(svg, scale, height, padding, ticks)
	addBars(data, svg, scale, padding)
}

function createChartBlock(selector, width, height) {
	return d3.select(selector)
		.append('svg')
		.attr('width', width)
		.attr('height', height)
}

function calculateXScale(data, padding, width) {
	return d3.scaleLinear()
		.domain([0, d3.max(data, d => d.results.length)])
		.range([padding, width - padding])
		.nice()
}

function addHorizontalAxis(svg, scale, height, padding, ticks) {
	const horizontalAxis = d3.axisBottom(scale).ticks(ticks)

	return svg.append('g')
		.attr('transform', `translate(50, ${height - padding})`)
		.attr('class', 'bar-chart__x-axis')
		.call(horizontalAxis)
		.call(g => g.select('.domain').remove())
}

function addGridLinesToHorizontalAxis(svg, height, scale) {
	return svg.append('g')
		.attr('class', 'bar-chart__x-axis-grid')
		.attr('transform', `translate(50, ${height - 45})`)
		.attr('stroke', 'grey')
		.call(
			createGridLines(scale)
				.tickSize(-height)
				.tickFormat('')
		)
}

function addBars(data, svg, scale, padding) {
	const barHeight = 15

	svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('x', padding * 2)
		.attr('y', (d, i) => i * 50)
		.attr('width', (d) => scale(d.results.length - padding))
		.attr('height', barHeight)
		.attr('class', 'bar-chart__bar')
		.attr('fill', '#ffff72')
}

function addLabelsToBars(data, svg) {
	svg.selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.text((d) => d.century)
		.attr('x', 0)
		.attr('y', (d, i) => (i * 50) + 10)
		.attr('dy', 0)
		.attr('text-anchor', 'end')
		.attr('transform', 'translate(90, 3)')
}

function createGridLines(scale, ticks) {
	return d3.axisBottom(scale).ticks(ticks)
}
