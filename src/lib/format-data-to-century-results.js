export default function(data) {
	return Object.entries(data)
		.map(([key, value]) => ({
			century: key,
			results: [...value.results, ...value.emptyResults]
		}))
}
