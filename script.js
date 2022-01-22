// api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
const weatherApi = {
  key: "3a24635c179b0ce0fa74cb980a332206",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};
const searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event)=>{
 if(event.keyCode == 13)
 {
  console.log(searchInputBox.value);
  getWeatherReport(searchInputBox.value);
  document.querySelector(".weather-body").style.display = "block";
 }
});
function getWeatherReport(city)
{
 fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
 .then(weather => {
  return weather.json();
 }).then(showWeatherReport);
}
function showWeatherReport(weather){
 console.log(weather);
 let weatherImg = weather.weather[0].main;
 let city = document.getElementById('city');
 let temp = document.getElementById("temp");
 let date = document.getElementById('date');
 let minMax = document.getElementById('min-max');
 let weatherType = document.getElementById('weather');
 city.innerHTML = `${weather.name}, ${weather.sys.country}`;
 temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
 minMax.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.floor(weather.main.temp_max)}&deg;C (max)`
 weatherType.innerHTML = `${weather.weather[0].main}`
 let todayDate = new Date();
 date.innerHTML = dateManage(todayDate);
 if (weather.weather[0].main == "Clear") {
   document.body.style.backgroundImage = "url('clearWeather.jpg')";
 } else if (weather.weather[0].main == "Clouds") {
   document.body.style.backgroundImage = "url('cloudy.jpg')";
 } else if (weather.weather[0].main == "Haze") {
   document.body.style.backgroundImage = "url('haze.jpg')";
 } else if (weather.weather[0].main == "Mist") {
   document.body.style.backgroundImage = "url('mist.jpg')";
 } else if (weather.weather[0].main == "Snow") {
   document.body.style.backgroundImage = "url('snow.jpg')";
 } else if (weather.weather[0].main == "Rain") {
   document.body.style.backgroundImage = "url('rain.jpg')";
 } else if (weather.weather[0].main == "Thunderstorm") {
   document.body.style.backgroundImage = "url('lighting.jpg')";
 }
}
function dateManage(dateArg)
{
 let days =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
 let months = ["Jan","Feb","Mar","April","May","June","July","August","September","October","November","December"];
 let year = dateArg.getFullYear();
 let month = months[dateArg.getMonth()]
 let date = dateArg.getDate();
 let day = days[dateArg.getDay()];
 return `${date} ${month} (${day}), ${year}`;
}