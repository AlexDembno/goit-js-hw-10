import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 1000;

const refs = {
  inpetEl: document.querySelector('#search-box'),
  ulEl: document.querySelector('.country-list'),
  divEl: document.querySelector('.country-info'),
};

refs.inpetEl.addEventListener('input', debounce(showInput, DEBOUNCE_DELAY));

function showInput(event) {
  event.preventDefault();

  console.log(refs.inpetEl.value.trim());
  const value = refs.inpetEl.value.trim();
  if (value === '') {
    clearInput();
    return;
  }
  fetchCountries(value)
    .then(users => renderUser(users))
    .catch(error => console.log(error));
}

function renderList(users) {
  const markup = users
    .map(user => {
      return ` <li class="country-item">
          <img class="country-flag" src="${user.flags.svg}" alt="flag">
          <h2 class="country-text">${user.name.official}</h2>
        </li>`;
    })
    .join('');
  refs.ulEl.innerHTML = markup;
}

function renderDiv(users) {
  renderList(users);
  const markupDiv = users
    .map(user => {
      return `<p class="country-info_text"><span class="country-info_span">Capital:&ensp;</span>${
        user.capital
      }</p>
      <p class="country-info_text"><span class="country-info_span">Population:&ensp;</span>${
        user.population
      }</p>
      <p class="country-info_text"><span class="country-info_span">Languages:&ensp;</span>${Object.values(
        user.languages
      )}</p>`;
    })
    .join('');
  refs.divEl.innerHTML = markupDiv;
}

function renderUser(users) {
  clearInput();
  if (users.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  } else if (users.length > 1) {
    clearInput();
    renderList(users);
  } else {
    clearInput();
    renderDiv(users);
  }
}

function clearInput() {
  refs.ulEl.innerHTML = '';
  refs.divEl.innerHTML = '';
}
