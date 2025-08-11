'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://countries-api-836d.onrender.com/countries/name/portugal
// https://countries-api-836d.onrender.com/countries/
// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////


const renderError = (msg) => {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
}



const renderCountry = function (data, neighbour = '') {
    const html = `
                <article class="country ${neighbour}">
                  <img class="country__img" src="${data.flag}" />
                  <div class="country__data">
                    <h3 class="country__name">${data.name}</h3>
                    <h4 class="country__region">${data.region}</h4>
                    <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
                    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                    <p class="country__row"><span>💰</span>${data.currencies[0]?.name}</p>
                  </div>
                </article>
                `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

const getJSON = (url, errorMsg = 'Something went wrong')=>{
return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`${errorMsg} ${response.status}`)
        }
        return response.json()
    });
}

// my code for render neigbour countries

const getNeighbourCountryData = neighbour => {
    // country 1
    getJSON(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`, 'Cant get neigbour country')
    .then(data => {
        renderCountry(data, 'neighbour')
    })
};


const whereAmI = function(){
    navigator.geolocation.getCurrentPosition(location => {
       const  {latitude, longitude} = location.coords;
       getJSON(`https://geocode.xyz/${latitude},${longitude}?geoit=json`, 'Cant know the country').then(
        data => {
            const country = data.country;
            getCountryDataAhmed(country);
        }
       ).catch(err => renderError(`Something went wrong ${err.message}`))


    })
}

const getCountryDataAhmed = async country => {
    // country 1
    await getJSON(`https://countries-api-836d.onrender.com/countries/name/${country}`,'cant get the country data')
    .then(data => {
        renderCountry(data[0])
        const neighbours = data[0].borders;
        if (!neighbours) throw new Error('no neigbours')
        // Country 2
        neighbours.forEach(neighbour => {
            getNeighbourCountryData(neighbour);
        });
    }).catch(err => renderError(`Something went wrong ${err.message}`));
}


btn.addEventListener('click', () => {
    whereAmI()
});


