const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const mainDesc = document.createElement('section');
const desc = document.createElement('section');
let actualMinute = '';
let actualMonth = '';

(function getActualMinute(){
  let minute = new Date().getMinutes();
  if(minute < 10) actualMinute = '0' + minute;
  else actualMinute = minute;
  return actualMinute;
}());

(function getActualMonth(){
  let monthNumber = new Date().getMonth();
  actualMonth = month[monthNumber];
  return actualMonth;
}());


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
    mainDesc.classList.add('main-desc');
    mainDesc.innerHTML = `<div class="main-desc__inner">
      <div class="main-desc__title">
        <img class="main-desc__title-img" src="https://openweathermap.org/img/w/${this.img}.png" alt="weather">
        <p class="main-desc__title-text">${this.city}</p>
        <p class="main-desc__title-degree">${Math.ceil(this.temp)}&#8451;</p>
      </div>
        <div class="main-desc__list">
          <p class="main-desc__item-text">${new Date().getDate()} ${actualMonth}</p>
        </div>
    </div>`;

    desc.classList.add('desc');
    desc.innerHTML = `<div class="desc__inner">
    <ul class="desc__list">
      <li class="desc__item">
        <p class="desc__item-text">Humidity: ${this.humidity}%</p>
        <p class="desc__item-text">Pressure: ${this.pressure} hPa</p>
        <p class="desc__item-text">Wind: ${this.wind} km/h SSE</p>
      </li>
      <li class="desc__item">
        <p class="desc__item-text desc__item-text--min">${new Date().getHours()}:${actualMinute}</p>
      </li>
      <li class="desc__item">
        <p class="desc__item-text">Temp: ${Math.ceil(this.temp)} &#8451;</p>
        <p class="desc__item-text">Feel like: ${Math.ceil(this.feelLike)} &#8451;</p>
        <p class="desc__item-text">Cloudly: ${this.cloud}%</p>
      </li>
    </ul>
  </div>`;

  this.parent.append(mainDesc);
  this.parent.append(desc);
  }
}

function getData(city = 'KHARKOV') {
fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`)
  .then(response => {
    if(response.ok) {
     return response.json();
    }
    else {
      alert('Please type exactly name of the city');
      getData();
    }
  })
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
      '.wrapper'
    ).render();
    })
    .catch(err => {
      console.warn(err);
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
  mainDesc.remove();
  desc.remove();
  cityTitle = input.value.toUpperCase();
  form.reset();
  getData(cityTitle);
}



