export default function(fn) {
	try {
		return fn()
	} catch(error) {
		console.error(error)
	}
}
