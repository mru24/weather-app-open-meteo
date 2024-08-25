const app = {
  async init() {
    this.jq = jQuery;
    this.document = this.jq(document);
    this.window = this.jq(window);
    this.response = '';
    console.log("app ready");
    this.document.on('click','.trigger',(e) => {
      this.jq(e.currentTarget).find('.hidden').slideToggle();
    })

    this.weatherCode = {
      "0":{
        "day":{
          "description":"Sunny",
          "image":"http://openweathermap.org/img/wn/01d@2x.png"
        },
        "night":{
          "description":"Clear",
          "image":"http://openweathermap.org/img/wn/01n@2x.png"
        }
      },
      "1":{
        "day":{
          "description":"Mainly Sunny",
          "image":"http://openweathermap.org/img/wn/01d@2x.png"
        },
        "night":{
          "description":"Mainly Clear",
          "image":"http://openweathermap.org/img/wn/01n@2x.png"
        }
      },
      "2":{
        "day":{
          "description":"Partly Cloudy",
          "image":"http://openweathermap.org/img/wn/02d@2x.png"
        },
        "night":{
          "description":"Partly Cloudy",
          "image":"http://openweathermap.org/img/wn/02n@2x.png"
        }
      },
      "3":{
        "day":{
          "description":"Cloudy",
          "image":"http://openweathermap.org/img/wn/03d@2x.png"
        },
        "night":{
          "description":"Cloudy",
          "image":"http://openweathermap.org/img/wn/03n@2x.png"
        }
      },
      "45":{
        "day":{
          "description":"Foggy",
          "image":"http://openweathermap.org/img/wn/50d@2x.png"
        },
        "night":{
          "description":"Foggy",
          "image":"http://openweathermap.org/img/wn/50n@2x.png"
        }
      },
      "48":{
        "day":{
          "description":"Rime Fog",
          "image":"http://openweathermap.org/img/wn/50d@2x.png"
        },
        "night":{
          "description":"Rime Fog",
          "image":"http://openweathermap.org/img/wn/50n@2x.png"
        }
      },
      "51":{
        "day":{
          "description":"Light Drizzle",
          "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
          "description":"Light Drizzle",
          "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
      },
      "53":{
        "day":{
          "description":"Drizzle",
          "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
          "description":"Drizzle",
          "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
      },
      "55":{
        "day":{
          "description":"Heavy Drizzle",
          "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
          "description":"Heavy Drizzle",
          "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
      },
      "56":{
        "day":{
          "description":"Light Freezing Drizzle",
          "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
          "description":"Light Freezing Drizzle",
          "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
      },
      "57":{
        "day":{
          "description":"Freezing Drizzle",
          "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
          "description":"Freezing Drizzle",
          "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
      },
      "61":{
        "day":{
          "description":"Light Rain",
          "image":"http://openweathermap.org/img/wn/10d@2x.png"
        },
        "night":{
          "description":"Light Rain",
          "image":"http://openweathermap.org/img/wn/10n@2x.png"
        }
      },
      "63":{
        "day":{
          "description":"Rain",
          "image":"http://openweathermap.org/img/wn/10d@2x.png"
        },
        "night":{
          "description":"Rain",
          "image":"http://openweathermap.org/img/wn/10n@2x.png"
        }
      },
      "65":{
        "day":{
          "description":"Heavy Rain",
          "image":"http://openweathermap.org/img/wn/10d@2x.png"
        },
        "night":{
          "description":"Heavy Rain",
          "image":"http://openweathermap.org/img/wn/10n@2x.png"
        }
      },
      "66":{
        "day":{
          "description":"Light Freezing Rain",
          "image":"http://openweathermap.org/img/wn/10d@2x.png"
        },
        "night":{
          "description":"Light Freezing Rain",
          "image":"http://openweathermap.org/img/wn/10n@2x.png"
        }
      },
      "67":{
        "day":{
          "description":"Freezing Rain",
          "image":"http://openweathermap.org/img/wn/10d@2x.png"
        },
        "night":{
          "description":"Freezing Rain",
          "image":"http://openweathermap.org/img/wn/10n@2x.png"
        }
      },
      "71":{
        "day":{
          "description":"Light Snow",
          "image":"http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night":{
          "description":"Light Snow",
          "image":"http://openweathermap.org/img/wn/13n@2x.png"
        }
      },
      "73":{
        "day":{
          "description":"Snow",
          "image":"http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night":{
          "description":"Snow",
          "image":"http://openweathermap.org/img/wn/13n@2x.png"
        }
      },
      "75":{
        "day":{
          "description":"Heavy Snow",
          "image":"http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night":{
          "description":"Heavy Snow",
          "image":"http://openweathermap.org/img/wn/13n@2x.png"
        }
      },
      "77":{
        "day":{
          "description":"Snow Grains",
          "image":"http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night":{
          "description":"Snow Grains",
          "image":"http://openweathermap.org/img/wn/13n@2x.png"
        }
      },
      "80":{
        "day":{
          "description":"Light Showers",
          "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
          "description":"Light Showers",
          "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
      },
      "81":{
        "day":{
          "description":"Showers",
          "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
          "description":"Showers",
          "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
      },
      "82":{
        "day":{
          "description":"Heavy Showers",
          "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
          "description":"Heavy Showers",
          "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
      },
      "85":{
        "day":{
          "description":"Light Snow Showers",
          "image":"http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night":{
          "description":"Light Snow Showers",
          "image":"http://openweathermap.org/img/wn/13n@2x.png"
        }
      },
      "86":{
        "day":{
          "description":"Snow Showers",
          "image":"http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night":{
          "description":"Snow Showers",
          "image":"http://openweathermap.org/img/wn/13n@2x.png"
        }
      },
      "95":{
        "day":{
          "description":"Thunderstorm",
          "image":"http://openweathermap.org/img/wn/11d@2x.png"
        },
        "night":{
          "description":"Thunderstorm",
          "image":"http://openweathermap.org/img/wn/11n@2x.png"
        }
      },
      "96":{
        "day":{
          "description":"Light Thunderstorms With Hail",
          "image":"http://openweathermap.org/img/wn/11d@2x.png"
        },
        "night":{
          "description":"Light Thunderstorms With Hail",
          "image":"http://openweathermap.org/img/wn/11n@2x.png"
        }
      },
      "99":{
        "day":{
          "description":"Thunderstorm With Hail",
          "image":"http://openweathermap.org/img/wn/11d@2x.png"
        },
        "night":{
          "description":"Thunderstorm With Hail",
          "image":"http://openweathermap.org/img/wn/11n@2x.png"
        }
      }
    }

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
      this.response = await this.callApi(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&hourly=temperature_2m,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,surface_pressure,cloud_cover,is_day&timezone=${timezone}&forecast_days=16`);

      // '&hourly=temperature_2m,precipitation,rain,showers,snowfall,snow_depth,weather_code,surface_pressure,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m';
      // '&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant';

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
          html += `<h1>${data.current.is_day=1?this.weatherCode[data.current.weather_code]['day']['description']:this.weatherCode[data.current.weather_code]['night']['description']}</h1>`;
        html += '</div>';
      html += '</div>';

      html += '<div class="row">';
        html += '<div class="col" style="max-width:100px;">';
          html += `<img src="${data.current.is_day=1?this.weatherCode[data.current.weather_code]['day']['image']:this.weatherCode[data.current.weather_code]['night']['image']}" />`;
        html += '</div>';

        html += '<div class="col" style="padding-top:18px;">';
          html += `<h2>${data.current.temperature_2m+data.current_units.temperature_2m}</h2>`;
        html += '</div>';

        html += '<div class="col">';
          html += '<p class="wind-direction">';
            html += '<span class="wind-rose">';
              html += `<span class="arrow" style="transform:rotate(${data.current.wind_direction_10m}deg)">&#8595;</span>`;
            html += `</span>`;
          html += `</p>`;
          html += `<p>${data.current.wind_speed_10m} - ${data.current.wind_gusts_10m} ${data.current_units.wind_speed_10m}</p>`;
        html += '</div>';
      html += '</div>';

      html += '<div class="row">';
        html += '<div class="col">'
          html += `<p>Feels like ${data.current.apparent_temperature+data.current_units.temperature_2m}</p>`;
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
          html += '<div class="row">';
            html += '<div class="col">';
              html += data.hourly.time[i].slice(0,-6);
            html += '</div>';
          html += '</div>';
          html += '<div class="hidden">';
      }
            html += '<div class="row">';
              html += '<div class="col">';
                html += '<div class="forecast time">';
                  html += time[1];
                html += '</div>';
              html += '</div>';

              html += '<div class="col">';
                html += `<img src="${data.hourly.is_day[i]=1?this.weatherCode[data.hourly.weather_code[i]]['day']['image']:this.weatherCode[data.hourly.weather_code[i]]['night']['image']}" width="40" height="40" style="margin-top:-10px;" />`;
              html += '</div>';

              html += `<div class="col rain-${data.hourly.rain[i]} showers-${data.hourly.showers[i]}">`;
              if(data.hourly.rain[i]>0 || data.hourly.showers[i]>0) {
                if(data.hourly.rain[i]>data.hourly.showers[i]) {
                  html += '<img src="img/rain.svg" width="30" />';
                } else if(data.hourly.rain[i]<data.hourly.showers[i]) {
                  html += '<img src="img/showers.svg" width="30" />';
                } else {
                  html += '<img src="img/rain.svg" width="30" />';
                }
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