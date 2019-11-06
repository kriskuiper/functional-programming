export function getFirstNumber(size) {
	return size.slice(0, getFinalCharacter(size))
}

export function getFirstNumberUnicode(size) {
	return size.slice(0, getUnicodeCharacter(size))
}

export function getFirstNumberFromLength(size) {
	return size.slice(getLengthIndex(size), getFinalCharacter(size))
}

export function getFirstNumberFromLengthUnicode(size) {
	return size.slice(getLengthIndex(size), getUnicodeCharacter(size))
}

export function startsWithNumber(size) {
	return size.match(/^\d/)
}

export function hasLength(size) {
	return size.indexOf('l') !== -1
}

export function hasRemainingLetters(size) {
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

