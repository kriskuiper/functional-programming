export default `
	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	PREFIX dc: <http://purl.org/dc/elements/1.1/>
	PREFIX dct: <http://purl.org/dc/terms/>
	PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
	PREFIX edm: <http://www.europeana.eu/schemas/edm/>
	PREFIX foaf: <http://xmlns.com/foaf/0.1/>

	SELECT ?obj ?title (SAMPLE(?img) AS ?img) ?year (SAMPLE(?size) AS ?size) ?subject ?subjectLabel WHERE {
		?sub dc:type ?obj .
		?sub dc:title ?title .
		?sub edm:isShownBy ?img .
		?sub dct:created ?date .
		?sub dct:extent ?size .
		?sub dc:subject ?subject .
		?subject skos:prefLabel ?subjectLabel .
		BIND (xsd:gYear(?date) AS ?year) .
		FILTER (?year > xsd:gYear("1000")) .
	} LIMIT 1000
`
