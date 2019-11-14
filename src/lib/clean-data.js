import formatLengthForResult from './formatters/format-length-for-result'
import formatYearForResult from './formatters/format-year-for-result'

export default function(data) {
	return data
		.map(item => ({
			title: item.title && item.title.value,
			img: item.img && item.img.value,
			size: item.size && formatLengthForResult(item.size.value),
			year: item.year && formatYearForResult(item.year.value),
			category: item.subjectLabel && item.subjectLabel.value
		}))
		.filter(item => {
			return !isNaN(item.year) // Deletes two items
		})
		.reduce((centuries, currentItem) => {
			const min = getRangeMin(currentItem.year)
			const max = getRangeMax(currentItem.year)
			let range = formatRange(min, max)
			const defaultCentury = {
				results: [],
				emptyResults: []
			}

			/*
			* If the year (1900) is now less then the min range (i.e. 1901), format
			* the range again but then taking currentItem.year as the max so you get a
			* range like "1801 - 1900", now you can safely put the currentitem in
			* that range.
			*/

			if(currentItem.year < min) {
				range = formatRangeFromMax(currentItem.year)
			}

			const hasRange = centuries[range]

			if(!hasRange) {
				centuries[range] = defaultCentury
			}

			if (currentItem.size) {
				addCurrentItemToResults(centuries[range].results, currentItem)
			} else {
				addCurrentItemToResults(centuries[range].emptyResults, currentItem)
			}

			return centuries
		}, {})
}

function getRangeMin(num) {
	return (Math.floor(num / 100) * 100) + 1
}

function getRangeMax(num) {
	return Math.ceil(num / 100) * 100
}

function getRangeMinFromMax(max) {
	return max - 99
}

function formatRange(min, max) {
	return `${min} - ${max}`
}

function formatRangeFromMax(max) {
	return formatRange(getRangeMinFromMax(max), max)
}

function addCurrentItemToResults(results, item) {
	return results.push(item)
}
