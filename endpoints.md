
# Endpoints
## VIRUS
GET WORLD DATA:\
`fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2b77998fcemsh394d28feaaeaeebp1e00b0jsn01de2fd7d8dc",
		"x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
	}
})`


GET ALL COUNTRIES DATA:\
`fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2b77998fcemsh394d28feaaeaeebp1e00b0jsn01de2fd7d8dc",
		"x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
	}
})`


GET SPECIFIC COUNTRY DATA:\
`fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/Canada/can", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2b77998fcemsh394d28feaaeaeebp1e00b0jsn01de2fd7d8dc",
		"x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
	}
})`\
REQUIRED PARAMETERS:\
`iso`(string) -> can\
`countryname`(string) -> Canada


GET SPECIFIC CONTINENT DATA:\
`fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/africa", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2b77998fcemsh394d28feaaeaeebp1e00b0jsn01de2fd7d8dc",
		"x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
	}
})`\
REQUIRED PARAMETERS:\
`continent name`(static url) -> africa

## VACCINE

## NEWS
GET ALL COVID NEWS
`fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-coronavirus-news/0", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2b77998fcemsh394d28feaaeaeebp1e00b0jsn01de2fd7d8dc",
		"x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
	}
})`\
REQUIRED PARAMETERS:\
`page`(string) -> 0

GET ALL VACCINE NEWS
`fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-vaccine-news/0", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2b77998fcemsh394d28feaaeaeebp1e00b0jsn01de2fd7d8dc",
		"x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
	}
})`\
REQUIRED PARAMETERS:\
`page`(string) -> 0