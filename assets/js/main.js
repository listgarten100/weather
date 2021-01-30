const month = 'Jan,Feb,March,Apr,May,June,July,Aug,Sep,October,Nov,Dec'.split(',');

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
    let article = document.createElement('div');
    article.classList.add('weather-city');
    article.innerHTML = `<section class="main-desc">
    <div class="main-desc__inner">
      <div class="main-desc__img">
        <img class="main-desc__img-item" src="http://openweathermap.org/img/w/${this.img}.png" alt="weather">
      </div>
        <ul class="main-desc__list">
          <li class="main-desc__item"><p class="main-desc__item-text">${this.city}</p></li>
          <li class="main-desc__item"><p class="main-desc__item-text">${new Date().getDate()} ${month[new Date().getMonth()]}</p></li>
          <li class="main-desc__item"><p class="main-desc__item-text">${new Date().getHours()}:${new Date().getMinutes()}</p></li>
        </ul>
    </div>
  </section>
  <section class="desc">
    <div class="desc__inner">
      <ul class="desc__list">
        <li class="desc__item"><p class="desc__item-text">Humidity: ${this.humidity}%</p></li>
        <li class="desc__item"><p class="desc__item-text">Pressure: ${this.pressure} hPa</p></li>
        <li class="desc__item"><p class="desc__item-text">Wind: ${this.wind} km/h SSE</p></li>
        <li class="desc__item"><p class="desc__item-text">Temp: ${this.temp} &#8451;</p></li>
        <li class="desc__item"><p class="desc__item-text">Feel like: ${this.feelLike} &#8451;</p></li>
        <li class="desc__item"><p class="desc__item-text">Cloudly: ${this.cloud}%</p></li>
      </ul>
    </div>
  </section>`;

  this.parent.append(article);
  }
}



fetch('http://api.openweathermap.org/data/2.5/weather?q=KAIR&units=metric&APPID=5d066958a60d315387d9492393935c19')
.then(response => response.json())
.then(data => {
  console.log(data);
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


// new City(
//       'Kharkov',
//       '70',
//       '80',
//       '90',
//       '-2',
//       '-10',
//       '45',
//       '.article'
//     ).render();