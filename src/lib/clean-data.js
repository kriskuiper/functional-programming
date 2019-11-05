import formatLengthForResult from './format-length-for-result'

export default function(data) {
	return data.map(item => {
		return formatLengthForResult(item.size.value)
	})
}
