import { pack, select, hierarchy } from 'd3'

// Props to Alok K. Shukla for writing the article and to Marc for providing the link
// source: https://bl.ocks.org/alokkshukla/3d6be4be0ef9f6977ec6718b2916d168
// And then written it cleaner and more functional

export default function(data, diameter = 600) {
	const boundaries = pack(data)
		.size([diameter, diameter])
		.padding(1.5)
	const svg = createChartBlock(diameter)
	const hierarchy = setHierarchy(data)
	const bubble = createBubble(svg, hierarchy, boundaries)

	createBubbleContents(bubble)
	setFrameHeight(diameter)

	return svg
}

function createChartBlock(diameter) {
	return select('.bubble-chart')
		.append('svg')
		.attr('width', diameter)
		.attr('height', diameter)
		.attr('class', 'bubble-chart__boundary')
}

function setHierarchy(data) {
	return hierarchy(data)
		.sum((d) => d.average)
}

function createBubble(svg, hierarchy, boundaries) {
	return svg.selectAll('.bubble')
		.data(boundaries(hierarchy).descendants())
		.enter()
		.filter((d) => !d.children)
		.append('g')
		.attr('class', 'bubble-chart__bubble')
		.attr('transform', (d) => `translate(${d.x}, ${d.y})`)
}

function createBubbleContents(bubble) {
	bubble.append('circle')
		.attr('r', (d) => d.r)
		.attr('class', 'bubble-chart__bubble-circle')

	bubble.append('text')
		.attr('dy', '.2em')
		.style('text-anchor', 'middle')
		.text((d) => d.data.key.substring(0, d.r / 3))
		.attr('font-size', (d) => d.r / 4)
		.attr('class', 'bubble__text')

	bubble.append('text')
		.attr('dy', '2em')
		.style('text-anchor', 'middle')
		.text((d) => d.data.average)
		.attr('class', 'bubble__text')
}

function setFrameHeight(diameter) {
	return select(self.frameElement)
		.style('height', `${diameter}px`)
}
