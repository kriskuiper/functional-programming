import encodeQuery from '../encode-query'

export default function(query) {
	const endpoint = 'https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-21/sparql'
	const encodedQuery = encodeQuery(query)

	return `${endpoint}?query=${encodedQuery}&format=json`
}
