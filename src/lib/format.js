/*
* Implemented using the following example:
* https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/
*/

export default function(...functions) {
	return (text) => functions.reduce((value, currentFunction) => {
		return currentFunction(value)
	}, text)
}
