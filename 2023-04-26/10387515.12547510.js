class city {
    constructor(name, population, temperature, weatherDescription){
        this.name = name;
        this.population = population;
        this.temperature = temperature;
        this.weatherDescription = weatherDescription;
    }

    setParameters(name, population, temperature, weatherDescription)
    {
        this.name=name;
        this.population=population;
        this.temperature=temperature;
        this.weatherDescription=weatherDescription;
    }

    getName()
    {
        return this.name;
    }

    getPopulation()
    {
        return this.population;
    }

    getTemperature(){
        return this.temperature;
    }

    getWeather()
    {
        return this.weatherDescription;
    }
}
let rio = new city("Rio de Janeiro", 1000000, 30, "cloudy");
let sp = new city("Sao Paulo", 2000000, 20, "sunny");
let salvador = new city("Salvador", 500000, 40, "rainy");
let jp = new city("Joao Pessoa", 200000, 35, "sunny");
let maceio = new city("Maceio", 400000, 25, "rainy");

let cities = [
    rio, sp, salvador, jp, maceio
];

let newCities = cities;

newCities = sortCities(cities, "weather");

for(capital of newCities) { console.log(capital); }

newCities = cities;

newCities = sortCities(cities, "population");

for(capital of newCities) { console.log(capital); }

newCities = cities;

// filter cities parameters: name, temperature{Greater, Lesser, Equal}, weather, population{Greater, Lesser, Equal}
newCities = filterCities(cities, "temperatureGreater", 30);

for(capital of newCities) { console.log(capital); }

newCities = cities;

newCities = filterCities(cities, "name", "Joao Pessoa");

for(capital of newCities) { console.log(capital); }

newCities = cities;

newCities = processCities(cities, "name", "rainy", "weather");

for(capital of newCities) { console.log(capital); }

newCities = cities;

// sorts cities according to the type of crit
function sortCities(cities, type)
{
    let newCities = cities;
    switch(type)
    {
        case "name":
            sortName(newCities);
            break;
        case "population":
            sortPop(newCities);
            break;
        case "temperature":
            sortTemp(newCities);
            break;
        case "weather":
            sortWeather(newCities);
            break;
        default:
            break;
    }

    return newCities;
}

function sortName(cities)
{
    cities.sort(function(a, b){
    if(a.name > b.name)
    {
        return 1;
    }
    if(a.name < b.name)
    {
        return -1;
    }

    return 0;
})
}

function sortPop(cities)
{
    cities.sort(function(a, b){
    if(a.population > b.population)
    {
        return 1;
    }
    if(a.population < b.population)
    {
        return -1;
    }

    return 0;
})
}

function sortTemp(cities)
{
    cities.sort(function(a, b){
    if(a.temperature > b.temperature)
    {
        return 1;
    }
    if(a.temperature < b.temperature)
    {
        return -1;
    }

    return 0;
})
}

function sortWeather(cities)
{
    cities.sort(function(a, b){
    if(a.weatherDescription > b.weatherDescription)
    {
        return 1;
    }
    if(a.weatherDescription < b.weatherDescription)
    {
        return -1;
    }

    return 0;
})
}

function filterCities(cities, type, criterion)
{
    let filteredArray = [];

    switch(type)
    {
        case "name":
            for(capital of cities)
            {
                let name = filterName(capital, criterion);
                if(name != null)
                {
                    filteredArray.push(capital);
                }
            }
            break;
        case "populationEqual":
            for(capital of cities)
                {
                    let pop = filterPopEqual(capital, criterion);
                    if(pop != null)
                    {
                        filteredArray.push(capital);
                    }
                }
                break;
        case "populationGreater":
            for(capital of cities)
                {
                    let pop = filterPopGreater(capital, criterion);
                    if(pop != null)
                    {
                        filteredArray.push(capital);
                    }
                }
                break;
        case "populationLesser":
            for(capital of cities)
                {
                    let pop = filterPopLesser(capital, criterion);
                    if(pop != null)
                    {
                        filteredArray.push(capital);
                    }
                }
                break;
        case "temperatureEqual":
            for(capital of cities)
                {
                    let temp = filterTemp(capital, criterion);
                    if(temp != null)
                    {
                        filteredArray.push(capital);
                    }
                }
                break;
        case "temperatureGreater":
            for(capital of cities)
                {
                    let temp = filterTempGreater(capital, criterion);
                    if(temp != null)
                    {
                        filteredArray.push(capital);
                    }
                }
                break;
        case "temperatureLesser":
            for(capital of cities)
                {
                    let temp = filterLesser(capital, criterion);
                    if(temp != null)
                    {
                        filteredArray.push(capital);
                    }
                }
                break;
        case "weather":
            for(capital of cities)
            {
                let weather = filterWeather(capital, criterion);
                if(weather != null)
                {
                    filteredArray.push(capital);
                }
            }
            break;
        default:
            console.log("ERRO");
            break;
    }

    return filteredArray;
}

function filterName(cities, criterion)
{
    if(cities.name === criterion)
    {
        return cities.name;
    }
    return null;
}

function filterPopEqual(cities, criterion)
{
    if(cities.population === criterion)
    {
        return cities.population;
    }
    return null;
}

function filterPopGreater(cities, criterion)
{
    if(cities.population > criterion)
    {
        return cities.population;
    }
    return null;
}

function filterPopLesser(cities, criterion)
{
    if(cities.population < criterion)
    {
        return cities.population;
    }
    return null;
}

function filterTemp(cities, criterion)
{
    if(cities.temperature === criterion)
    {
        return cities.temperature;
    }
    return null;
}

function filterTempGreater(cities, criterion)
{
    if(cities.temperature > criterion)
    {
        return cities.temperature;
    }
    return null;
}

function filterTempLesser(cities, criterion)
{
    if(cities.temperature < criterion)
    {
        return cities.temperature;
    }
    return null;
}

function filterWeather(cities, criterion)
{
    if(cities.weatherDescription === criterion)
    {
        return cities.weatherDescription;
    }
    return null;
}

function processCities(cities, sortCrit, filtCrit, type)
{
    newCities = cities;

    newCities = sortCities(newCities, sortCrit);
    newCities = filterCities(newCities, type, filtCrit);

    return newCities;
}