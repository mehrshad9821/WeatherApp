let appId= '6540d2d89686477913c2eee3881cd0d3';

let units = 'imperial';


let searchMethod;




function getSearhMethod(searchTerm){


	if (searchTerm.length ===5 && Number.parseInt(searchTerm)+""=== searchTerm)

		searchMethod = 'zip';

	else

		searchMethod = "q"





}


function searchWeather(searchTerm){


		getSearhMethod(searchTerm);
		fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result=>{ return result.json();} ).then(result=>{init(result);})

}



function init(resultfromserver){

		switch(resultfromserver.weather[0].main) {

			case 'Clear':
				document.body.style.backgroundImage = 'url("clear.jpg")';
				break;

			case 'Clouds':
				document.body.style.backgroundImage = 'url("cloudy.jpg")';

				break;

			case 'Rain':
			case 'Drizzle':
			case 'Mist':
				document.body.style.backgroundImage = 'url("rain.jpg")';

				break;



			case 'Thuderstorm':
				document.body.style.backgroundImage = 'url("storm.jpg")';
				break;

			case 'Snow':
				document.body.style.backgroundImage = 'url("snow.jpg")';
				break;

			default:
				break;


		}


		let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
		let temperatureElement = document.getElementById('temperature');
		let humidityElement = document.getElementById('humidity');

		let windSpeedElement = document.getElementById('windSpeed');
		let cityHeader = document.getElementById('cityHeader');
		let weatherIcon = document.getElementById('documentIconImg');

		
		weatherIcon.src = 'http://openweathermap.org/img/w/'+ resultfromserver.weather[0].icon + '.png';

		let resultDescription = resultfromserver.weather[0].description;
		weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);


		temperatureElement.innerHTML = Math.floor(resultfromserver.main.temp) + '&#176';
 
		windSpeedElement.innerHTML = 'Winds at '+ Math.floor(resultfromserver.wind.speed)+ ' m/s';
		cityHeader.innerHTML = resultfromserver.name;
		humidityElement.innerHTML = 'Humidity Levels at '+ resultfromserver.main.humidity+'%'



		setPosForWeatherInfo();
}



function setPosForWeatherInfo(){




	let weatherContainer = document.getElementById('weatherContainer');
	let weatherContainerHeight = weatherContainer.clientHeight;
	let weatherContainerWidth = weatherContainer.clientWidth;

	weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
	weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
	weatherContainer.style.visibility = 'visible';


}


document.getElementById('searchBtn').addEventListener('click', ()=> { let searchTerm = document.getElementById('searchInput').value;
if (searchTerm)
	searchWeather(searchTerm);


})