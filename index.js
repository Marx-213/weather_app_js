const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const input = document.querySelector('.search-box input');
const btn = document.querySelector('.ball-button');


function searchWeather() {
    const WEATHER_TOKEN = '02e499debaa1cbf8f441f81ea59f5316';
    const city = input.value;
    if (city === '')
        return;
        
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_TOKEN}`).then
    (response => response.json()).then
    (json => {
        if (json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }
        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        var description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        temp_smile = ''
        switch (json.weather[0].main){
            case 'Clear':
                image.src = 'images/clear.png';
                description.innerHTML = 'Ясно'
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                description.innerHTML = 'Дождь'
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                description.innerHTML = 'Снег'
                break;
            case 'Clouds':
                image.src = 'images/cloud.png';
                description.innerHTML = 'Облачно'
                break;
            case 'Haze':
                image.src = 'images/mist.png';
                description.innerHTML = 'Дымка'
                break;

            default:
                image.src = '';

        }
        temp = json.main.temp
        int_temp = parseInt(temp)
        if (int_temp < 10) {
        temperature.classList.add('cold');
        } else {
        temperature.classList.add('hot');
        }

        temperature.innerHTML = `${int_temp} <span>°C</span>`;
        // description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '800px';
    });
}

function set_dark_mode () {
    // Переключаем (добавляем/удаляем) класс .dark-theme для body
    document.body.classList.toggle('dark'); 
    container.classList.toggle('container-dark'); 
} 

input.addEventListener('keydown', (event) => {
    // Проверяем, является ли код нажатой клавиши равным 13 (код клавиши Enter)
    if (event.keyCode === 13 || event.key === 'Enter') {
      // Предотвращаем стандартное поведение отправки формы
      event.preventDefault();
  
      // Вызываем функцию поиска
      searchWeather();
    }
  });

search.addEventListener('click', () =>{
    searchWeather();
});

// Отслеживаем щелчок по кнопке
btn.addEventListener('click', () =>{
    set_dark_mode()
})

const themeButton = document.getElementById('themeButton');

themeButton.addEventListener('click', function() {
  themeButton.classList.toggle('fa-moon');
  themeButton.classList.toggle('fa-sun');
});
