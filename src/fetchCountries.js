export default function fetchContries(name){
  return  fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,name.official,flags,languages`)
.then(res => {
    return res.json()}).then(data => data)
  .catch(err => err)

}









