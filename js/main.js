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
    this.inputClear = this.jq('.input-clear');
    this.inputClear.on('click',(e)=>{
      this.jq(e.currentTarget).prev('input').val('');
    })

    this.dayName = {
      '0':'Sun',
      '1':'Mon',
      '2':'Tue',
      '3':'Wed',
      '4':'Thu',
      '5':'Fri',
      '6':'Sat'
    }
    this.monthName = {
      '0':'Jan',
      '1':'Feb',
      '2':'Mar',
      '3':'Apr',
      '4':'May',
      '5':'Jun',
      '6':'Jul',
      '7':'Aug',
      '8':'Sep',
      '9':'Oct',
      '10':'Nov',
      '11':'Dec'
    }
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
  },
  async searchLocation(e) {
    let query = this.jq(e.currentTarget).val();
    if(query.length > 2) {
      this.response = await this.callApi(this.geolocationCall+query);
      if(this.response.results && this.response.results.length > 0) await this.showSearchLocations(this.response.results);
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
      this.response = await this.callApi(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&hourly=temperature_2m,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,surface_pressure,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day&timezone=${timezone}&forecast_days=16`);

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

        html += '<div class="col" style="padding-top:25px;">';
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
        html += '<p>current data...</p>';
      html += '</div>';
    html += '</div>';

    html += '<div class="forecast day trigger">';
    let d = new Date(data.current.time.slice(0,-6));
    let day = d.getDay();
      html += '<div class="row">';
        html += '<div class="col" style="min-width:100px;max-width:120px;">';
          html += '<h4>Today</h4>'
          html += `<p>${this.dayName[day]}</p>`;
        html += '</div>';
        html += '<div class="col" style="max-width:60px;">';
          html += `<img src="${data.current.is_day=1?this.weatherCode[data.daily.weather_code[0]]['day']['image']:this.weatherCode[data.daily.weather_code[0]]['night']['image']}" width="40" height="40" />`;
        html += '</div>';
        html += '<div class="col" style="min-width:115px;max-width:125px;padding-top:8px;">';
          html += `<h4><span class="red">${data.daily.temperature_2m_max[0]}&deg;</span> / <span class="blue">${data.daily.temperature_2m_min[0]}&deg</span></h4>`;
        html += '</div>';
        html += '<div class="col" style="max-width:75px;">';
          html += '<p class="wind-direction" style="margin-top:2px;">';
            html += '<span class="wind-rose">';
              html += `<span class="arrow" style="transform:rotate(${data.daily.wind_direction_10m_dominant[0]}deg)">&#8595;</span>`;
            html += `</span>`;
          html += `</p>`;
        html += '</div>';
        html += '<div class="col" style="padding-top:8px;">';
          html += `<p>${data.daily.wind_speed_10m_max[0]}<br>${data.daily.wind_gusts_10m_max[0]}<br>${data.daily_units.wind_speed_10m_max}</p>`;
        html += '</div>';
      html += '</div>';
      html += '<hr>';
      html += '<div class="hidden">';
        let currentD = data.current.time.split('T');
        let currentDate = currentD[0];
        let currentTime = currentD[1];
        data.hourly.time.forEach((e0,i) => {
          let hourlyD = e0.split('T');
          if(hourlyD[0] == currentDate && hourlyD[1] >= currentTime) {
            html += this.displayHourlyData(hourlyD[1],data,i);
          }
        })
      html += '</div>';
    html += '</div>';

    data.daily.time.forEach((e,i) => {
      let d = new Date();
      let monthNow = d.getMonth()+1;
      let dateNow = d.getFullYear()+'-'+monthNow.toString().padStart(2,'0')+'-'+d.getDate().toString().padStart(2,'0');

      if(e > dateNow) {
        let d = new Date(e);
        let weekDay = d.getDay();
        let day = d.getDate().toString().padStart(2,'0');
        let month = this.monthName[d.getMonth()];
        html += '<div class="forecast day trigger">';
        if(i==1) {
          html += '<div class="row">';
            html += '<div class="col" style="min-width:100px;max-width:120px;">';
              html += '<h4>Tomorrow</h>';
              html += `<p>${day} ${month}</p>`;
            html += '</div>';
            html += '<div class="col" style="max-width:60px;">';
              html += `<img src="${data.current.is_day=1?this.weatherCode[data.daily.weather_code[1]]['day']['image']:this.weatherCode[data.daily.weather_code[1]]['night']['image']}" width="40" height="40" />`;
            html += '</div>';
            html += '<div class="col" style="min-width:115px;max-width:125px;padding-top:8px;">';
              html += `<h4><span class="red">${data.daily.temperature_2m_max[1]}&deg;</span> / <span class="blue">${data.daily.temperature_2m_min[1]}&deg</span></h4>`;
            html += '</div>';
            html += '<div class="col" style="max-width:75px;">';
              html += '<p class="wind-direction" style="margin-top:2px;">';
                html += '<span class="wind-rose">';
                  html += `<span class="arrow" style="transform:rotate(${data.daily.wind_direction_10m_dominant[1]}deg)">&#8595;</span>`;
                html += `</span>`;
              html += `</p>`;
            html += '</div>';
            html += '<div class="col" style="padding-top:8px;">';
              html += `<p>${data.daily.wind_speed_10m_max[1]}<br>${data.daily.wind_gusts_10m_max[1]}<br>${data.daily_units.wind_speed_10m_max}</p>`;
            html += '</div>';
          html += '</div>';
          html += '<hr>';
          html += '<div class="hidden">';
            data.hourly.time.forEach((e1,i) => {
              let hourlyD = e1.split('T');
              if(hourlyD[0] == e) {
                html += this.displayHourlyData(hourlyD[1],data,i);
              }
            })
          html += '</div>';
        } else if(i>1) {
          html += '<div class="row">';
            html += '<div class="col" style="min-width:100px;max-width:120px;">';
              html += `<h4>${this.dayName[weekDay]}</h4>`;
              html += `<p>${day} ${month}</p>`;
            html += '</div>';
            html += '<div class="col" style="max-width:60px;">';
              html += `<img src="${data.current.is_day=1?this.weatherCode[data.daily.weather_code[i]]['day']['image']:this.weatherCode[data.daily.weather_code[i]]['night']['image']}" width="40" height="40" />`;
            html += '</div>';
            html += '<div class="col" style="min-width:115px;max-width:125px;padding-top:8px;">';
              html += `<h4><span class="red">${data.daily.temperature_2m_max[i]}&deg;</span> / <span class="blue">${data.daily.temperature_2m_min[i]}&deg</span></h4>`;
            html += '</div>';
            html += '<div class="col" style="max-width:75px;">';
              html += '<p class="wind-direction" style="margin-top:2px;">';
                html += '<span class="wind-rose">';
                  html += `<span class="arrow" style="transform:rotate(${data.daily.wind_direction_10m_dominant[i]}deg)">&#8595;</span>`;
                html += `</span>`;
              html += `</p>`;
            html += '</div>';
            html += '<div class="col" style="padding-top:8px;">';
              html += `<p>${data.daily.wind_speed_10m_max[i]}<br>${data.daily.wind_gusts_10m_max[i]}<br>${data.daily_units.wind_speed_10m_max}</p>`;
            html += '</div>';
          html += '</div>';
          html += '<hr>';
          html += '<div class="hidden">';
          data.hourly.time.forEach((e1,i) => {
            let hourlyD = e1.split('T');
            if(hourlyD[0] == e) {
              html += this.displayHourlyData(hourlyD[1],data,i);
            }
          })
          html += '</div>';
        }
        html += '</div>';
      }
    })
    html += '</div>';
    this.jq('#forecast').html(html);
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
  },

  displayHourlyData(time,data,i) {
    html = '';
    html += '<div class="forecast hourly">';
      html += '<div class="row">';
        html += '<div class="col" style="max-width:80px;">';
          html += `<p>${time}</p>`;
        html += '</div>';
        html += '<div class="col"  style="max-width:80px;margin-top:-12px;">';
          html += `<img src="${data.hourly.is_day[i]=1?this.weatherCode[data.hourly.weather_code[i]]['day']['image']:this.weatherCode[data.hourly.weather_code[i]]['night']['image']}" width="40" height="40" />`;
        html += '</div>';
        html += '<div class="col" style="max-width:50px;">';
          html += `<p>${data.hourly.temperature_2m[i]}&deg;</p>`;
        html += '</div>';
        html += '<div class="col">';
          html += '<p class="wind-direction">';
            html += '<span class="wind-rose">';
              html += `<span class="arrow" style="transform:rotate(${data.hourly.wind_direction_10m[i]}deg)">&#8595;</span>`;
            html += `</span>`;
          html += `</p>`;
        html += '</div>';
        html += '<div class="col">';
          html += `<p>${data.hourly.wind_speed_10m[i]} - ${data.hourly.wind_gusts_10m[i]} ${data.hourly_units.wind_speed_10m}</p>`;
        html += '</div>';
      html += '</div>';
    html += '</div>';
    return html;
  }
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    // app.init();
}

app.init();