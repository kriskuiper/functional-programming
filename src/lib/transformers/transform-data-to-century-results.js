import { descending } from 'd3'

export default function(data) {
	return Object.entries(data)
		.map(([key, value]) => ({
			century: key,
			results: [...value.results, ...value.emptyResults]
		}))
		.sort((first, second) => {
			return descending(first.century, second.century)
		})
}
