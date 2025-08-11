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

// const getCountryAndNeighbour = function (country) {

//     const request = new XMLHttpRequest();
//     request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
//     request.send();
//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);
//         renderCountry(data);
//         // get neighbour country
//         const neighbours = data.borders;
//         console.log(neighbours)
//         if (!neighbours) return;
//         neighbours.forEach(neighbour => {

//             const request2 = new XMLHttpRequest();
//             request2.open('GET', `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);
//             request2.send();
//             request2.addEventListener('load', function () {
//                 const data2 = JSON.parse(this.responseText);
//                 console.log(data2)
//                 renderCountry(data2);
//             })
//         });

//     })

// }

// getCountryAndNeighbour('egypt');


// my code for render neigbour countries

// const getNeighbourCountryData = neighbour => {
//     // country 1
//     fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`).then(response =>
//         response.json()
//     ).then(data => {
//         renderCountry(data, 'neighbour')
//     })
// };


// const getCountryDataAhmed = country => {
//     // country 1
//     fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`).then(response => {
//         if (!response.ok) {
//             throw new Error(`country not found`)
//         }
//         return response.json()
//     }
//     ).then(data => {
//         renderCountry(data[0])
//         const neighbours = data[0].borders;
//         if (!neighbours) return
//         // Country 2
//         neighbours.forEach(neighbour => {
//             getNeighbourCountryData(neighbour);
//         });
//     }).catch(err => renderError(`Something went wrong ${err.message}`));
// }




const getJSON = (url, errorMsg = 'Something went wrong') => {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`${errorMsg} ${response.status}`)
        }
        return response.json()
    });
}




// const getCountryData = country => {
//     // country 1
//     // fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`).then(response => {
//     //     if (!response.ok) {
//     //         throw new Error(`country not found ${response.status}`)
//     //     }
//     //     return response.json()
//     // })
//     .then(data => {
//         renderCountry(data[0])
//         const neighbour = data[0].borders[0];
//         if (!neighbour) return
//         // Country 2
//         return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`)
//     }).then(response =>
//         response.json()
//     ).then(data => renderCountry(data, 'neighbour')).catch(err => renderError(`Something went wrong ${err.message}`)
//     );
// }
const getCountryData = country => {
    getJSON(`https://countries-api-836d.onrender.com/countries/name/${country}`, 'Country not found')
        .then(data => {
            renderCountry(data[0])
            const neighbour = data[0].borders[0];
            if (!neighbour) throw new Error('no neighbour found!')
            // Country 2
            return getJSON(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);
        }
        ).then(data => renderCountry(data, 'neighbour')).catch(err => renderError(`Something went wrong ${err.message}`)
        );
}

// getCountryDataAhmed('egypt');
// getCountryDataAhmed('usa');
// getCountryDataAhmed('germany');
// navigator.geolocation





// btn.addEventListener('click', () => {
//     navigator.geolocation.getCurrentPosition(position => {
//         const { latitude, longitude } = position.coords;

//         fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
//             .then(res => {
//                 if (!res.ok) {
//                     throw new Error(`country not found`)
//                 }
//                 return res.json()
//             })
//             .then(data => {
//                 const country = data.country;
//                 getCountryDataAhmed(country);
//             })
//             .catch(err => renderError(`Something went wrong ${err.message}`));
//     });
// });


// btn.addEventListener('click', () => {
//     getCountryData('egypt');

// })






// const lotteryPromise = new Promise((resolve, reject)=>{
// if(Math.random()>= 0.5) {
//     resolve('you win');
// }
// else{
//     reject(new Error('you lost your money'))
// }

// });


// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err))







// const wait = seconds => {
//     return new Promise(resolve => {
//         setTimeout(() => resolve(''), seconds * 1000)
//     })
// }


// wait(2).then(()=> {console.log('i waited for 2 seconds')
//     return wait(1);
// }).then(() => console.log('waited for 1 second'))


const getPosition = () => {
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, ()=> {reject(new Error('geolocation not working'))});
    } )
}



const whereAmI = async  () =>  {
    try{
    const pos = await getPosition();
    const { latitude, longitude } = pos.coords;
    const locationData = await fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
    const country = await locationData.json()
    const res = await fetch(`https://countries-api-836d.onrender.com/countries/name/${country.country}`);
    const data = await res.json();
    renderCountry(data[0]);
    }
    catch (err){
        alert(err.message)
    }

}
whereAmI();
// btn.addEventListener('click', async ()=> {const _ = await whereAmI()});

// const getLocation = async () => {
//     await navigator.geolocation.getCurrentPosition(location => {
//         const { latitude, longitude } = location.coords;
//         const data =  getJSON(`https://geocode.xyz/${latitude},${longitude}?geoit=json`, 'Cant know the country')
//         const country = data.country;
//         getCountryDataAhmed(country);
//     })
    
// }






// whereAmI();
