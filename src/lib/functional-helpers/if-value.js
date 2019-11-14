export default function (value, fn, alternative) {
	if (value) {
		return fn()
	}

	return alternative
}
