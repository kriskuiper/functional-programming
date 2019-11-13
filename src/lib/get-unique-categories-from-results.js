export default function(...results) {
	return unique(results.flat().map(result => result.category))
}

function unique(array) {
	return array.filter((item, index, self) => {
		return self.indexOf(item) === index
	})
}
