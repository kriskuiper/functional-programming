export default function (value, fn, alternative) {
	if (value) {
		return fn()
	} else if (alternative) {
		return alternative
	}

	// Nothing is literally defined so this would suffice
	return undefined
}
