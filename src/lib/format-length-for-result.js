import format from './format'
import {
	getFirstNumber,
	getFirstNumberUnicode,
	getFirstNumberFromLength,
	getFirstNumberFromLengthUnicode,
	startsWithNumber,
	hasLength,
	hasRemainingLetters
} from './format-length-utils'

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
		deleteSpaces,
		checkFirstNumber,
		checkLength,
		replaceMathematicalCharacters,
		resetRemainingSize,
		trimWhiteSpace,
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


function deleteSpaces(size) {
	return size.replace(/\s/g, '')
}

function checkFirstNumber(size) {
	if (startsWithNumber(size)) {
		return format(
			getFirstNumberUnicode,
			getFirstNumber
		)(size)
	}

	return size
}

function checkLength(size) {
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

function trimWhiteSpace(size) {
	return size.trim()
}

function convertToNumber(size) {
	if (size) {
		return Number(size)
}

	return null
}
