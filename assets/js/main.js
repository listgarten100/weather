const month = 'January,Feb,March,Apr,May,June,July,Aug,Sep,October,Nov,Dec'.split(',');
const article = document.createElement('div');
class City{
  constructor(city, humidity, pressure, wind, temp, feelLike, cloud, img, parent) {
    this.city = city;
    this.humidity = humidity;
    this.pressure = pressure;
    this.wind = wind;
    this.temp = temp;
    this.feelLike = feelLike;
    this.cloud = cloud;
    this.img = img;
    this.parent = document.querySelector(parent);
  }
  render() {
    article.classList.add('weather-city');
    article.innerHTML = `<section class="main-desc">
    <div class="main-desc__inner">
      <div class="main-desc__title">
        <img class="main-desc__title-img" src="http://openweathermap.org/img/w/${this.img}.png" alt="weather">
        <p class="main-desc__title-text">${this.city}</p>
        <p class="main-desc__title-degree">${Math.ceil(this.temp)}&#8451;</p>
      </div>
        <ul class="main-desc__list">
          <li class="main-desc__item"><p class="main-desc__item-text">${new Date().getDate()} ${month[new Date().getMonth()]}</p></li>
        </ul>
    </div>
  </section>
  <section class="desc">
  <div class="desc__inner">
    <div class="desc__list">
      <div class="desc__item">
        <p class="desc__item-text">Humidity: ${this.humidity}%</p>
        <p class="desc__item-text">Pressure: ${this.pressure} hPa</p>
        <p class="desc__item-text">Wind: ${this.wind} km/h SSE</p>
      </div>
      <div class="desc__item">
        <p class="desc__item-text desc__item-text--min">${new Date().getHours()}:${new Date().getMinutes()}</p>
      </div>
      <div class="desc__item">
        <p class="desc__item-text">Temp: ${Math.ceil(this.temp)} &#8451;</p>
        <p class="desc__item-text">Feel like: ${Math.ceil(this.feelLike)} &#8451;</p>
        <p class="desc__item-text">Cloudly: ${this.cloud}%</p>
      </div>
    </div>
  </div>
</section>`;

  this.parent.append(article);
  }
}

function getData(city = 'KHARKOV') {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`)
  .then(response => response.json())
  .then(data => {
    new City(
      data.name,
      data.main.humidity,
      data.main.pressure,
      data.wind.speed,
      data.main.temp,
      data.main.feels_like,
      data.clouds.all,
      data.weather[0].icon,
      '.article'
    ).render();
    });
}

getData();

const form = document.forms['form'];
const input = form.elements['text'];

form.addEventListener('submit', onSubmitFormHandler);


  
  

function onSubmitFormHandler(e){
  e.preventDefault();
  if(input.value === ''){
    alert('Please, enter the city');
    return;
  }
  article.remove();
  cityTitle = input.value.toUpperCase();
  form.reset();
  getData(cityTitle);
}





// <section class="main-desc">
//     <div class="main-desc__inner">
//       <div class="main-desc__img">
//         <img class="main-desc__img-item" src="http://openweathermap.org/img/w/${this.img}.png" alt="weather">
//         <p class="main-desc__item-text">${this.city}</p>
//       </div>
//         <ul class="main-desc__list">
//           <li class="main-desc__item"><p class="main-desc__item-text">${this.city}</p></li>
//           <li class="main-desc__item"><p class="main-desc__item-text">${new Date().getDate()} ${month[new Date().getMonth()]}</p></li>
//           <li class="main-desc__item"><p class="main-desc__item-text">${new Date().getHours()}:${new Date().getMinutes()}</p></li>
//         </ul>
//     </div>
//   </section>
//   <section class="desc">
//     <div class="desc__inner">
//       <ul class="desc__list">
//         <li class="desc__item"><p class="desc__item-text">Humidity: ${this.humidity}%</p></li>
//         <li class="desc__item"><p class="desc__item-text">Pressure: ${this.pressure} hPa</p></li>
//         <li class="desc__item"><p class="desc__item-text">Wind: ${this.wind} km/h SSE</p></li>
//         <li class="desc__item"><p class="desc__item-text">Temp: ${Math.ceil(this.temp)} &#8451;</p></li>
//         <li class="desc__item"><p class="desc__item-text">Feel like: ${Math.ceil(this.feelLike)} &#8451;</p></li>
//         <li class="desc__item"><p class="desc__item-text">Cloudly: ${this.cloud}%</p></li>
//       </ul>
//     </div>
//   </section>


/* <li class="desc__item"><p class="desc__item-text--min">${new Date().getHours()}:${new Date().getMinutes()}</p></li> */


/* <section class="desc">
    <div class="desc__inner">
      <ul class="desc__list">
        <li class="desc__item"><p class="desc__item-text">Humidity: ${this.humidity}%</p></li>
        <li class="desc__item"><p class="desc__item-text">Pressure: ${this.pressure} hPa</p></li>
        <li class="desc__item"><p class="desc__item-text">Wind: ${this.wind} km/h SSE</p></li>
      
        <li class="desc__item"><p class="desc__item-text">Temp: ${Math.ceil(this.temp)} &#8451;</p></li>
        <li class="desc__item"><p class="desc__item-text">Feel like: ${Math.ceil(this.feelLike)} &#8451;</p></li>
        <li class="desc__item"><p class="desc__item-text">Cloudly: ${this.cloud}%</p></li>
      </ul>
    </div>
  </section> */