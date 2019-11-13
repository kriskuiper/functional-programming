import formatLengthForResult from './formatters/format-length-for-result'
import formatYearForResult from './formatters/format-year-for-result'

export default function(data) {
	return data
		.map(item => ({
			title: item.title && item.title.value,
			img: item.img && item.img.value,
			size: item.size && formatLengthForResult(item.size.value),
			year: item.year && formatYearForResult(item.year.value)
		}))
		.filter(item => {
			return !isNaN(item.year) // Deletes two items
		})
		.reduce((newItems, currentItem) => {
			const minRange = getRangeMin(currentItem.year)
			const maxRange = getRangeMax(currentItem.year)
			let rangeKey = formatKey(minRange, maxRange)

			/*
			* If the year (1900) is now less then the min range (i.e. 1901), format
			* the key again but then taking currentItem.year as the max so you get a
			* rangeKey like "1801 - 1900", now you can safely put the currentitem in
			* that range.
			*/
			if(currentItem.year < minRange) {
				rangeKey = formatKey(
					getRangeMinFromMax(currentItem.year),
					currentItem.year
				)
			}

			const hasRange = newItems[rangeKey]

			if(!hasRange) {
				newItems[rangeKey] = {
					results: [],
					emptyResults: []
				}
			}

			if (!currentItem.year) {
				newItems[rangeKey].emptyResults.push(currentItem)
			}

			newItems[rangeKey].results.push(currentItem)

			return newItems
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

function formatKey(min, max) {
	return `${min} - ${max}`
}
