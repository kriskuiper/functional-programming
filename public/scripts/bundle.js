(function () {
	'use strict';

	var query = `
	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	PREFIX dc: <http://purl.org/dc/elements/1.1/>
	PREFIX dct: <http://purl.org/dc/terms/>
	PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
	PREFIX edm: <http://www.europeana.eu/schemas/edm/>
	PREFIX foaf: <http://xmlns.com/foaf/0.1/>

	SELECT ?obj ?title ?img ?year ?size WHERE {
		?sub dc:type ?obj .
		?sub dc:title ?title .
		?sub edm:isShownBy ?img .
		?sub dct:created ?date .
		?sub dct:extent ?size .
		BIND (xsd:gYear(?date) AS ?year) .
		FILTER (?year > xsd:gYear("1000")) .
	} LIMIT 5000
`;

	function encodeQuery(query) {
		return encodeURIComponent(query)
	}

	function formatEncodedEndpoint(query) {
		const endpoint = 'https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-21/sparql';
		const encodedQuery = encodeQuery(query);

		return `${endpoint}?query=${encodedQuery}&format=json`
	}

	/*
	* Implemented using the following example:
	* https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/
	*/
	function format(...functions) {
		return (text) => functions.reduce((value, currentFunction) => {
			return currentFunction(value)
		}, text)
	}

	function getFirstNumber(size) {
		return size.slice(0, getFinalCharacter(size))
	}

	function getFirstNumberUnicode(size) {
		return size.slice(0, getUnicodeCharacter(size))
	}

	function getFirstNumberFromLength(size) {
		return size.slice(getLengthIndex(size), getFinalCharacter(size))
	}

	function getFirstNumberFromLengthUnicode(size) {
		return size.slice(getLengthIndex(size), getUnicodeCharacter(size))
	}

	function startsWithNumber(size) {
		return size.match(/^\d/)
	}

	function hasLength(size) {
		return size.indexOf('l') !== -1
	}

	function hasRemainingLetters(size) {
		return size.match(/[a-z]/)
	}

	function getUnicodeCharacter(size) {
		return size.indexOf('×')
	}

	function getFinalCharacter(size) {
		return size.indexOf('x') ||
			size.indexOf('cm') ||
			size.indexOf('b')
	}

	function getLengthIndex(size) {
		return size.indexOf('lengte') + 1 || size.indexOf('l') + 1
	}

	/**
	* @description Parses the size to a series of functions to format a size
	* @param {string} size The full size string, something very dirty
	* @returns a number that is the size or null if the size is neglected while formatting
	**/

	function formatLengthForResult(size) {
		if (!size) {
			return
		}

		return format(
			textToLowerCase,
			replaceUnknownSize,
			fixCharacters,
			trimAllWhiteSpace,
			checkFirstCharacter,
			checkForLength,
			replaceMathematicalCharacters,
			resetRemainingSize,
			convertToNumber,
		)(size)
	}

	function textToLowerCase(size) {
		return size.toLowerCase()
	}

	function replaceUnknownSize(size) {
		return size === '[n.b.]' || size === '[ni]'
			? ''
			: size
	}

	function fixCharacters(size) {
		return size
			.replace(/[,]/g, '.')
			.replace(/circa/g, '')
			.replace(/midden/g, '')
			.replace(/object/g, '')
			.replace(/algemeen/g, '')
			.replace(/[;]/g, '')
			.replace(/[:]/g, '')
	}


	function trimAllWhiteSpace(size) {
		return size.replace(/\s/g, '')
	}

	function checkFirstCharacter(size) {
		if (startsWithNumber(size)) {
			return format(
				getFirstNumberUnicode,
				getFirstNumber
			)(size)
		}

		return size
	}

	function checkForLength(size) {
		if (hasLength(size)) {
			return format(
				getFirstNumberFromLengthUnicode,
				getFirstNumberFromLength
			)(size)
		}

		return size
	}

	function replaceMathematicalCharacters(size) {
		return size
			.replace(/[x]/g, '')
			.replace(/cm/g, '')
	}

	function resetRemainingSize(size) {
		if (hasRemainingLetters(size)) {
			return ''
		}

		return size
	}

	function convertToNumber(size) {
		if (size) {
			return Number(size)
		}

		return null
	}

	function formatYearForResult(timestamp) {
		if (!timestamp) {
			return
		}

		return new Date(timestamp).getFullYear()
	}

	/**
	@description beautifies raw ugly data
	@param {array} data raw data
	@returns {object} a newItems object with years as keys, each key has
	an array with results
	*/

	function cleanData(data) {
		return data
			.map(item => ({
				title: item.title && item.title.value,
				img: item.img && item.img.value,
				size: item.size && formatLengthForResult(item.size.value),
				year: item.year && formatYearForResult(item.year.value)
			}))
			.filter(item => {
				return item.size !== null
			})
			.reduce((newItems, currentItem) => {
				const hasYear = newItems[currentItem.year];

				if (!hasYear) {
					newItems[currentItem.year] = [];
				}

				newItems[currentItem.year].push(currentItem);

				return newItems
			}, {})
	}

	async function getCleanData() {
		const endpoint = formatEncodedEndpoint(query);
		const response = await fetch(endpoint);
		const data = await response.json();

		return cleanData(data.results.bindings)
	}

	// Have to use an iife here because we can't use await without async
	(async () => {
		const data = await getCleanData();

		console.log(data);

	})();

}());
