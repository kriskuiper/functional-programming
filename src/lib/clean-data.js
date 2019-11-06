import formatLengthForResult from './format-length-for-result'

export default function(data) {
	return data
		.map(item => ({
			title: item.title && item.title.value,
			img: item.img && item.img.value,
			size: item.size && formatLengthForResult(item.size.value)
		}))
		.filter(item => {
			return item.size !== null
		})
}
