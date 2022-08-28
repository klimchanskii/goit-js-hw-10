import './css/styles.css';
import fetchContries from './fetchCountries'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.querySelector("#search-box")
const oneCountry = document.querySelector('.country-info')
const moreCountries = document.querySelector('.country-list')

const DEBOUNCE_DELAY = 300;
let contries = '';

input.addEventListener("input", debounce(onInputContries, DEBOUNCE_DELAY))

function onInputContries(e){

contries = e.target.value.trim();

fetchContries(contries).then(data => {console.log(data.length)
    if(data.length === 1){
    createMarkupMainCountry(data)
    moreCountries.innerHTML = '';
    }

    else if(data.length > 11)
    { Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");}

    else{
    createMarkupMoreContries(data)
    oneCountry.innerHTML = '';
    }
    return data
}).catch(err => {Notiflix.Notify.failure("Oops, there is no country with that name")
return err

})  
}

function createMarkupMainCountry(data){
    const markup = data.map(({name, population,flags, capital, languages:{0:{name:lengName}}})=> {
        return`<h1>
        <img src="${flags.svg}" width ="30px" alt="${name}"> ${name}</h1>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${lengName}</p>`}).join('')
        oneCountry.innerHTML = markup

}

function createMarkupMoreContries(data){
    const markup = data.map(({name,flags})=> `<li><img src="${flags.svg}" width ="30px" alt="${name}"> ${name}</h1></li>`).join('')
    moreCountries.innerHTML = markup
}


