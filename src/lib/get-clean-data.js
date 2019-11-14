import query from './query'
import formatEncodedEndpoint from './formatters/format-encoded-endpoint'
import cleanData from './clean-data'
import Try from './functional-helpers/try'

export default function() {
	return Try(async () => {
		const endpoint = formatEncodedEndpoint(query)
		const response = await fetch(endpoint)
		const data = await response.json()

		return cleanData(data.results.bindings)
	})
}
