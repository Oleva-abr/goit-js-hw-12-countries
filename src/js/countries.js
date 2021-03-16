const API_URL = 'https://restcountries.eu/rest/v2/name';

function fetchCountries(name) {
  return fetch(`${API_URL}/${name}`)
    .then(res => res.json())
    .catch(error => {
      console.log(error);
    });
}
export default fetchCountries;
