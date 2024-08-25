const app = {
  async init() {
    this.jq = jQuery;
    this.document = this.jq(document);
    this.window = this.jq(window);
    this.response = '';
    console.log("app ready");
    this.document.on('click','.trigger',(e) => {
      console.log(e.currentTarget);

      this.jq(e.currentTarget).find('.hidden').slideToggle();
    })

    this.geoSearch = this.jq('#geolocationSearch');

    this.geoSearch.on('keyup',(e) => { this.searchLocation(e); } );
    this.latitude = '';
    this.longitude = '';
    this.geolocationResult = this.jq('#geolocationResults');
    this.geolocationResult.on('change',(e) => { this.queryWeather(e); } );

    this.geolocationCall = "https://geocoding-api.open-meteo.com/v1/search?name=";
    this.forecastCall = `https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&hourly=temperature_2m`;

  },
  async searchLocation(e) {
    let query = this.jq(e.currentTarget).val();
    if(query.length > 3) {
      this.response = await this.callApi(this.geolocationCall+query);
      if(this.response.results.length > 0) await this.showSearchLocations(this.response.results);
    }
  },
  async showSearchLocations(locations) {
    let html = '';
    html += '<option>Select location</option>';
    locations.forEach(location => {
      html +=`<option value="${location.latitude},${location.longitude},${location.timezone}">${location.name} - ${location.country}</option>`;
    });
    this.jq('#geolocationResults')
      .removeClass('d-none')
      .html(html);
  },
  async queryWeather(e) {
    let coords = this.jq(e.currentTarget).find(':selected').val().split(',');
    let latitude = coords[0];
    let longitude = coords[1];
    let timezone = coords[2];

    if(latitude && longitude && timezone) {
      this.response = await this.callApi(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,surface_pressure,cloud_cover&timezone=${timezone}&forecast_days=16`);
      if(this.response) {
        await this.showWeather(this.response);
        this.jq('#geolocationResults').addClass('d-none');
      }

    }
  },
  async showWeather(data) {
    let html = '';
    html += `<div class="current ${data.current.is_day=1?'day':'night'} trigger">`;
      html += '<div class="row">';
        html += '<div class="col">';
          html += `<h1>${await this.readWeatherCode(data.current.weather_code)}</h1>`;
        html += '</div>';
      html += '</div>';

      html += '<div class="row">';
        html += '<div class="col">';
          html += `<h2>${data.current.temperature_2m+data.current_units.temperature_2m}</h2>`;
          html += `<p>Feels like ${data.current.apparent_temperature+data.current_units.temperature_2m}</p>`;
        html += '</div>';
        html += '<div class="col">';
          html += `<p></p>`;
          html += `<p></p>`;
          html += `<p class="wind-direction">`;
            html += `<span class="wind-rose">`;
              html += `<span class="arrow" style="transform:rotate(${data.current.wind_direction_10m}deg)">&#8595;</span>`;
            html += `</span>`;
          html += `</p>`;
          html += `<p>${data.current.wind_speed_10m} - ${data.current.wind_gusts_10m} ${data.current_units.wind_speed_10m}</p>`;
        html += '</div>';
      html += '</div>';
      html += '<div class="hidden">';
        html += '<hr>';
        html += '<p>some text...</p>';
      html += '</div>';
    html += '</div>';

    html += '<div class="forecast day trigger">';
    let d = new Date(data.current.time.slice(0,-6));
    let day = d.getDay();
    html += '<div class="row">';
      html += '<div class="col">';
        html += `<p>Today</p><p>${await this.getDayName(day)}</p>`;
      html += '</div>';
    html += '</div>';
    html += '<div class="hidden">';
    data.hourly.time.forEach((e,i)=>{
      let time = e.split('T');
      let hours = time[1].split(':');
      let date = new Date();
      let hoursNow = date.getHours().toString().padStart(2,'0');
      let monthNow = date.getMonth()+1;
      let dateNow = date.getFullYear()+'-'+monthNow.toString().padStart(2,'0')+'-'+date.getDate().toString().padStart(2,'0');

      if(time[0] <= dateNow && hours[0] <= hoursNow-1) return;

      if(data.hourly.time[i].slice(0,-6)!=data.hourly.time[i-1].slice(0,-6)) {
          html += '</div>';
        html += '</div>';
        html += '<div class="forecast day trigger">';
          html += `<div class="row">${data.hourly.time[i].slice(0,-6)}</div>`;
          html += '<div class="hidden">';
      }
            html += '<div class="row">';
              html += '<div class="col">';
                html += '<div class="forecast time">';
                  html += time[1];
                html += '</div>';
              html += '</div>';
              html += '<div class="col">';
              if(data.hourly.rain[i]>0 || data.hourly.showers[i]>0) {
                if(data.hourly.rain[i]>data.hourly.showers[i]) {
                  html += '<img src="img/rain.svg" width="30" />';
                }
                if(data.hourly.rain[i]<data.hourly.showers[i]) {
                  html += '<img src="img/showers.svg" width="30" />';
                }
              }
              html += '</div>';
              html += '<div class="col">';
                if(data.hourly.precipitation_probability[i]>0) {
                  html += data.hourly.precipitation_probability[i]+'%';
                }
              html += '</div>';
              html += '<div class="col">';
                if(data.hourly.precipitation[i]>0) {
                  html += data.hourly.precipitation[i]+data.current_units.precipitation;
                }
              html += '</div>';
              html += '<div class="col">';
                html += data.hourly.temperature_2m[i]+data.current_units.temperature_2m;
              html += '</div>';
            html += '</div>';
    })

    html += '</div>';
    this.jq('#forecast').html(html);
  },
  async getDayName(day) {
    let dayName = '';
    switch (day) {
      case 0:
        dayName = 'Sun';
        break;
      case 1:
        dayName = 'Mon';
        break;
      case 2:
        dayName = 'Tue';
        break;
      case 3:
        dayName = 'Wed';
        break;
      case 4:
        dayName = 'Thu';
        break;
      case 5:
        dayName = 'Fri';
        break;
      case 6:
        dayName = 'Sat';
        break;

      default:
        break;
    }
    return dayName;
  },
  async readWeatherCode(code) {
    let weather = '';
    switch (code) {
      case 0:
        weather = 'Clear sky';
        break;
      case 1:
        weather = 'Mainly clear, partly cloudy, and overcast';
        break;
      case 2:
        weather = 'Mainly clear, partly cloudy, and overcast';
        break;
      case 3:
        weather = 'Mainly clear, partly cloudy, and overcast';
        break;
      case 45:
        weather = 'Fog and depositing rime fog';
        break;
      case 48:
        weather = 'Fog and depositing rime fog';
        break;
      case 51:
        weather = 'Drizzle: Light, moderate, and dense intensity';
        break;
      case 53:
        weather = 'Drizzle: Light, moderate, and dense intensity';
        break;
      case 55:
        weather = 'Drizzle: Light, moderate, and dense intensity';
        break;
      case 56:
        weather = 'Freezing Drizzle: Light and dense intensity';
        break;
      case 57:
        weather = 'Freezing Drizzle: Light and dense intensity';
        break;
      case 61:
        weather = 'Rain: Slight, moderate and heavy intensity';
        break;
      case 63:
        weather = 'Rain: Slight, moderate and heavy intensity';
        break;
      case 65:
        weather = 'Rain: Slight, moderate and heavy intensity';
        break;
      case 66:
        weather = 'Freezing Rain: Light and heavy intensity';
        break;
      case 67:
        weather = 'Freezing Rain: Light and heavy intensity';
        break;
      case 71:
        weather = 'Snow fall: Slight, moderate, and heavy intensity';
        break;
      case 73:
        weather = 'Snow fall: Slight, moderate, and heavy intensity';
        break;
      case 75:
        weather = 'Snow fall: Slight, moderate, and heavy intensity';
        break;
      case 77:
        weather = 'Snow grains';
        break;
      case 80:
        weather = 'Rain showers: Slight, moderate, and violent';
        break;
      case 81:
        weather = 'Rain showers: Slight, moderate, and violent';
        break;
      case 82:
        weather = 'Rain showers: Slight, moderate, and violent';
        break;
      case 85:
        weather = 'Snow showers slight and heavy';
        break;
      case 86:
        weather = 'Snow showers slight and heavy';
        break;
      case 95:
        weather = 'Thunderstorm: Slight or moderate';
        break;
      case 96:
        weather = 'Thunderstorm with slight and heavy hail';
        break;
      case 99:
        weather = 'Thunderstorm with slight and heavy hail';
        break;

      default:
        break;
    }
    return weather;
  },
  async callApi(url) {
    const options = {
      method: 'GET'
  };
  try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log("RESULT: ",result);
      return result;
  } catch (error) {
      console.error(error);
  }
  }
}
app.init();