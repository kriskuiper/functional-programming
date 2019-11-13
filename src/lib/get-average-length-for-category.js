import { nest } from 'd3'

export default function(results) {
	// Thanks to Chazz for this
	const newData = nest()
		.key(result => result.category)
		.entries(results)

	return newData.map(item => ({
		...item,
		average: formatAverageLength(item.values)
	}))
}

function formatAverageLength(results) {
	const sum = results.reduce((total, result) => {
		return total + result.size
	}, 0)

	return sum / results.length
}
