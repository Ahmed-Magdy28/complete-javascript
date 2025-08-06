'use strict';

// prettier-ignore


const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');





class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);
    clicks = 0;

    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }
    click() {
        this.clicks++;
    }
}

class Running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this._calcPace();
        this._setDescription();
    }

    _calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace
    }

}
class Cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, ElevationGain) {
        super(coords, distance, duration);
        this.elevationGain = ElevationGain;
        this._calcSpeed();
        this._setDescription();
    }


    _calcSpeed() {
        this.speed = this.distance / (this.duration / 60)
        return this.speed
    }
}




// ///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//         Application Architecture
///////////////////////////////////////////////////
class App {
    #map;
    #mapEvent;
    #mapZoom = 13;
    #workouts = [];
    constructor() {
        // get user position 
        this._getposition();
        // get data from local storage
        this._getlocalStorage();
        // event handlers
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationfield);
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this))
    };
    _getposition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
                setTimeout(() => {
                    alert('could not get your location');
                }, 50000)

            });
        }
    };
    _loadMap(postion) {
        const latitude = postion.coords.latitude;
        const longitude = postion.coords.longitude;
        const coords = [latitude, longitude];
        this.#map = L.map('map').setView(coords, this.#mapZoom);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);



        // handling clicks on map
        this.#map.on('click', this._showForm.bind(this));

        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work);
        });
    };
    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    };

    _hideForm() {
        // clearInput fields

        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

        // hide form
        form.style.diplay = 'none';
        form.classList.add('hidden');
        setTimeout(() => {
            form.style.diplay = 'grid';
        }, 1000)

    }

    _toggleElevationfield() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    };

    _newWorkout(e) {
        // prevent the page from reloading(default of forms)
        e.preventDefault();
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const allPostive = (...inputs) => inputs.every(inp => inp >= 0);
        //get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;
        const coords = [lat, lng];
        let workout;
        // check if data is valid


        // if activity rununing create runing object;
        if (type === 'running') {
            const cadence = +inputCadence.value;
            // check if data is valid
            // if(!Number.isFinite(distance) || distance <= 0) return alert('Distance inputs have to be postive numbers')
            // if(!Number.isFinite(duration) || duration <= 0) return alert('Duration inputs have to be postive numbers')
            // if(!Number.isFinite(cadence) || cadence <= 0) return alert('Cadence inputs have to be postive numbers')
            if (!validInputs(distance, duration, cadence) || !allPostive(distance, duration, cadence)) return alert('Inputs have to be postive numbers');
            workout = new Running(coords, distance, duration, cadence);
        }

        // if activity cycling create cycling object;
        if (type === 'cycling') {
            const elevation = +inputElevation.value;
            if (!validInputs(distance, duration, elevation) || !allPostive(distance, duration)) return alert('Inputs have to be postive numbers');

            workout = new Cycling(coords, distance, duration, elevation);


        }

        // add new object to workout array
        this.#workouts.push(workout);

        // render workout on map as marker
        this._renderWorkoutMarker(workout);

        // render workout on the list
        this._renderWorkout(workout)


        // hide form
        this._hideForm();

        // save to local storage
        this._setlocalStorage();
    }


    _renderWorkoutMarker(workout) {
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup({ maxWidth: 250, minWidth: 100, autoClose: false, closeOnClick: false, className: `${workout.type}-popup` }))
            .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
            .openPopup();

    }

    _renderWorkout(workout) {
        let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`
        if (workout.type === 'running') {
            html += `
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
            </div>
            </li>
        `
        }
        if (workout.type === 'cycling') {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed}</span>
                <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
            </div>
            </li>
            `;
        }
        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');
        if (!workoutEl) return;
        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
        this.#map.setView(workout.coords, this.#mapZoom, {
            animate: true,
            pan: {
                duration: 1,
            },
        });
    }

    _setlocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }
    _getlocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts', JSON.stringify(this.#workouts)));
        if (!data) return;
        this.#workouts = data;
        this.#workouts.forEach(work => {
            this._renderWorkout(work);
        });
    }

    reset(){
        localStorage.removeItem('workouts');
        location.reload();
    }

}


const app = new App();


