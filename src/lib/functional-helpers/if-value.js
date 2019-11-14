export default function (value, fn, alternative) {
	if (value) {
		return fn()
	} else if (alternative) {
		return alternative
	}

	return ''
}
