import { select, scaleLinear, axisBottom, max } from 'd3'

// Thanks to Martijn for providing a template
// https://github.com/MartijnKeesmaat/functional-programming/blob/master/src/scripts/renderBarChart.js

export default function(data, width = 800, height = 320) {
	const padding = 50
	const ticks = 6

	const svg = createChartBlock('.bar-chart', width, height)
	const scale = calculateXScale(data, padding, width)

	addLabelsToBars(data, svg)
	addHorizontalAxis(svg, scale, height, padding, ticks)
	addBars(data, svg, scale, padding)

	return svg
}

function createChartBlock(selector, width, height) {
	return select(selector)
		.append('svg')
		.attr('width', width)
		.attr('height', height)
}

function calculateXScale(data, padding, width) {
	return scaleLinear()
		.domain([0, max(data, d => d.results.length)])
		.range([padding, width - padding])
		.nice()
}

function addHorizontalAxis(svg, scale, height, padding, ticks) {
	const horizontalAxis = axisBottom(scale).ticks(ticks)

	return svg.append('g')
		.attr('transform', `translate(50, ${height - padding})`)
		.attr('class', 'bar-chart__x-axis')
		.call(horizontalAxis)
		.call(g => g.select('.domain').remove())
}

function addBars(data, svg, scale, padding) {
	const barHeight = 15
	const barSpacing = 30

	return svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('x', padding * 2)
		.attr('y', (d, i) => i * barSpacing)
		.attr('width', (d) => scale(d.results.length - padding))
		.attr('height', barHeight)
		.attr('class', 'bar-chart__bar')
}

function addLabelsToBars(data, svg) {
	const extraSpacingToCenterLabels = 10
	const barSpacing = 30

	return svg.selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.text((d) => d.century)
		.attr('x', 0)
		.attr('y', (d, i) => (i * barSpacing) + extraSpacingToCenterLabels)
		.attr('dy', 0)
		.attr('text-anchor', 'end')
		.attr('transform', 'translate(90, 3)')
		.attr('class', 'bar-chart__label')
}
