/**
* formatLengthForResult: returns the length if available in a size,
* otherwise returns an empty string.

/**
* @description Parses the size to a series of functions to format a size
* @param {string} size The full size string, something very dirty
* @returns a number that is the size or null if the size is neglected while formatting
**/

export default function(size) {
	return format(
		textToLowerCase,
		replaceUnknownSize,
		fixCharacters,
		replaceMathematicalCharacters
	)(size)
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

function replaceMathematicalCharacters(size) {
	return size
		.replace(/[x]/g, '')
		.replace(/cm/g, '')
}

function textToLowerCase(size) {
	return size.toLowerCase()
}

function replaceUnknownSize(size) {
	return size === '[n.b.]' || size === '[ni]'
		? ''
		: size
}

/*
* Implemented using the following example:
* https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/
*/
function format(...functions) {
	return (size) => functions.reduce((value, currentFunction) => {
		return currentFunction(value)
	}, size)
}
