import format from '../format'
import ifValue from '../functional-helpers/if-value'
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
	return ifValue(startsWithNumber(size), () => {
		return format(
			getFirstNumberUnicode,
			getFirstNumber
		)(size)
	}, size)
}

function checkForLength(size) {
	return ifValue(hasLength(size), () => {
		return format(
			getFirstNumberFromLengthUnicode,
			getFirstNumberFromLength
		)(size)
	}, size)
}

function replaceMathematicalCharacters(size) {
	return size
		.replace(/[x]/g, '')
		.replace(/cm/g, '')
}

function resetRemainingSize(size) {
	return ifValue(hasRemainingLetters(size), () => '', size)
}

function convertToNumber(size) {
	return ifValue(size, () => Number(size), null)
}
