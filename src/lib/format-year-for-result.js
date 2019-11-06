export default function(timestamp) {
	if (!timestamp) {
		return
	}

	return new Date(timestamp).getFullYear()
}
