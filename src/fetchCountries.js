import Notiflix from 'notiflix';
export function fetchCountries(value) {
  return fetch(
    `https://restcountries.com/v3.1/name/${value}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw (
        (new Error(response.status),
        Notiflix.Notify.failure('Oops, there is no country with that name'))
      );
    }
    return response.json();
  });
}
