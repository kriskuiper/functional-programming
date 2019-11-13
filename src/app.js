import getCleanData from './lib/get-clean-data'
import formatDataToCenturyResults from './lib/format-data-to-century-results'
import renderBarChart from './lib/chart/render-bar-chart'

// Have to use an iife here because we can't use await without async
(async () => {
	const data = await getCleanData()
	const centuryResults = formatDataToCenturyResults(data)

	console.log(centuryResults)

	renderBarChart(centuryResults)
})()


