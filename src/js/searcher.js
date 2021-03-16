import fetchCountries from './countries';
import countryCards from '../templates/countryCards.hbs';
import oneCountry from '../templates/oneCountry.hbs';

import debounce from 'lodash.debounce';

import { error } from '@pnotify/core/dist/PNotify.js';

// error({
//   text: 'Too many matches found! Please enter a more specific query',
// });
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const form = document.querySelector('.input');
const result = document.querySelector('.result');

form.addEventListener('input', debounce(getCountryByName, 500));

function getCountryByName(event) {
  clearValue();

  const countryName = event.target.value;
  if (!countryName) {
    return;
  }
  // console.log(countryName);
  fetchCountries(countryName).then(countries => {
    if (countries.length === 1) {
      renderCountry(countries, oneCountry);
    }
    if (countries.length > 1 && countries.length <= 10) {
      renderCountry(countries, countryCards);
    }
    if (countries.status === 404) {
      error({
        text: 'No country has been found. Please enter a more specific query!',
      });
    }
    if (countries.length > 10) {
      error({
        text: 'Too many matches found. Please enter a more specific query!',
      });
    }
  });
}

function renderCountry(countries, template) {
  const markup = template(countries);
  result.innerHTML = markup;
}

function clearValue() {
  result.innerHTML = '';
}
