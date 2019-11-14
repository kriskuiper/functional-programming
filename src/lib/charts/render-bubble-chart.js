import * as d3 from 'd3'

// https://bl.ocks.org/alokkshukla/3d6be4be0ef9f6977ec6718b2916d168
// And then written it cleaner and more functional
export default function(data, diameter = 600) {
	const boundaries = d3.pack(data)
		.size([diameter, diameter])
		.padding(1.5)
	const svg = createChartBlock(diameter)
	const hierarchy = setHierarchy(data)
	const bubble = createBubble(svg, hierarchy, boundaries)

	createBubbleContents(bubble)
	setFrameHeight(diameter)
}

function createChartBlock(diameter) {
	return d3.select('.bubble-chart')
		.append('svg')
		.attr('width', diameter)
		.attr('height', diameter)
		.attr('class', 'bubble-chart__boundary')
}

function setHierarchy(data) {
	return d3.hierarchy(data)
		.sum((d) => d.average)
}

function createBubble(svg, hierarchy, boundaries) {
	return svg.selectAll('.bubble')
		.data(boundaries(hierarchy).descendants())
		.enter()
		.filter((d) => !d.children)
		.append('g')
		.attr('class', 'bubble')
		.attr('transform', (d) => `translate(${d.x}, ${d.y})`)
}

function createBubbleContents(bubble, color) {
	bubble.append('title')
		.text((d) => `${d.key}: ${d.average}`)

	bubble.append('circle')
		.attr('r', (d) => d.r)
		.style('fill', 'yellow')

	bubble.append('text')
		.attr('dy', '.2em')
		.style('text-anchor', 'middle')
		.text((d) => d.data.key.substring(0, d.r / 3))
		.attr('font-size', (d) => d.r / 4)
		.attr('fill', 'black')

	bubble.append('text')
		.attr('dy', '1.3em')
		.style('text-anchor', 'middle')
		.text((d) => d.data.average)
		.attr('fill', 'black')
}

function setFrameHeight(diameter) {
	return d3.select(self.frameElement)
		.style('height', `${diameter}px`)
}
