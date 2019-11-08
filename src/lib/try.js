export default function(fn) {
	try {
		fn()
	} catch(error) {
		console.error(error)
	}
}
