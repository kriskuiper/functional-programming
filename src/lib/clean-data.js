import formatLengthForResult from './format-length-for-result'
import formatYearForResult from './format-year-for-result'

export default function(data) {
	console.log(data)

	return data
		.map(item => ({
			title: item.title && item.title.value,
			img: item.img && item.img.value,
			size: item.size && formatLengthForResult(item.size.value),
			year: item.year && formatYearForResult(item.year.value)
		}))
		.filter(item => {
			return item.size !== null
		})
}
