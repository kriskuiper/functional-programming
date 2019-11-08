import query from './query'
import formatEncodedEndpoint from './formatters/format-encoded-endpoint'
import cleanData from './clean-data'

export default async function() {
	const endpoint = formatEncodedEndpoint(query)
	const response = await fetch(endpoint)
	const data = await response.json()

	return cleanData(data.results.bindings)
}
