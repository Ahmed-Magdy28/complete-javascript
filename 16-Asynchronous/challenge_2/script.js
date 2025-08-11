'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const imgContainer = document.querySelector('.images');

// 


let currentImg;

const createImage = function (imgPath) {
    const imglocation = `./img/img-${imgPath}.jpg`

    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        currentImg = img;
        img.src = imglocation;
        img.addEventListener('load', () => {
            imgContainer.append(img);
            resolve(img)
        });

        img.addEventListener('error', () => {
            reject(new Error('something wrong happened'))
        })
    })
}


const wait = seconds => {
    return new Promise(resolve => {
        setTimeout(() => resolve(''), seconds * 1000)
    })
}

createImage(1)
    .then(() => wait(2)).then(() => {
        currentImg.style.display = 'none';
        return createImage(2)
    }).then(() => wait(2)).then( () => {
        currentImg.style.display = 'none';
        return createImage(3)
    });


