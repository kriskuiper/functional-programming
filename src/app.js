import getCleanData from './lib/get-clean-data'
import transformDataToCenturyResults from './lib/transformers/transform-data-to-century-results'
import transformDataToCategories from './lib/transformers/transform-data-to-categories'
import renderBarChart from './lib/chart/render-bar-chart'
import renderBubbleChart from './lib/chart/render-bubble-chart'

// Have to use an iife here because we can't use await without async
(async () => {
	const data = await getCleanData()
	const centuryResults = transformDataToCenturyResults(data)
	const categoryResults = transformDataToCategories(data['2001 - 2100'].results)

	renderBarChart(centuryResults)
	renderBubbleChart(categoryResults)
})()


