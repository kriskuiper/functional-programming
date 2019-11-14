import { nest, descending } from 'd3'

export default function(results) {
	// Thanks to Chazz for this
	const newData = nest()
		.key(result => result.category)
		.entries(results)

	const dataWithAverage = newData
		.map(item => ({
			...item,
			average: formatAverageLength(item.values)
		}))
		.sort((a, b) => descending(a.average, b.average))
		.slice(0, 5)

	return {
		children: dataWithAverage
	}
}

function formatAverageLength(results) {
	const sum = results.reduce((total, result) => {
		return total + result.size
	}, 0)

	return sum / results.length
}
