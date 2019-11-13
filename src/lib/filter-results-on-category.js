export default function(category, ...results) {
	return results.flat().filter(item => item.category === category)
}
