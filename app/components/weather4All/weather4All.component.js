'use strict';

var UNKNOWN_WEATHER = 'unknown';
var CITY = 'Barcelona, Spain';

function getIcon(mapeado, id, type) {
  var weatherId = parseInt(id);
  var maps = mapeado.filter(function(map) {
    return (map.ids.indexOf(weatherId) >= 0);
  });

  // I'm not seeing all the possibilities. In case of an anormal behaviour I
  // will return an error message defined by the constant value UNKNOWN_WEATHER.
  if (maps.length !== 1) return UNKNOWN_WEATHER;

  // In case that the type has not a good value the call returns the neutral way.
  if (!maps[0].hasOwnProperty(type)) {
    return maps[0].neutral;
  }
  // Otherwise returns the value that was called.
  return maps[0][type];

}

var app = angular.module("myApp")

    .component('weather4all', {
        templateUrl: "/components/weather4All/weather4All.template.html",

        controller:  function($http, $scope) {
            $scope.CITY = CITY;
            // API's configuration
            // The apiKey. If we don't use it is not possible make requests to the server.
            var apiKey = 'a55dc2f6aecf76c8e052977f2761d853';
            var unit = "metric";    // default value is in metric unit.
            var language = "en";    // default value is English.

            var mappings = [
              {
                ids: [200,201,230,231],
                neutral: 'storm-showers',
                day: 'day-storm-showers',
                night: 'night-storm-showers'
              },
              {
                ids: [202,232],
                neutral: 'thunderstorm',
                day: 'day-thunderstorm',
                night: 'night-thunderstorm'
              },
              {
                ids: [210,211,212,221],
                neutral: 'lightning',
                day: 'day-lightning',
                night: 'night-lightning'
              },
              {
                ids: [300,301,302],
                neutral: 'sprinkle',
                day: 'day-sprinkle',
                night: 'night-sprinkle'
              },
              {
                ids: [310,311,312,500,],
                neutral: 'rain-mix',
                day: 'day-rain-mix',
                night: 'night-rain-mix'
              },
              {
                ids: [313,314,321,520,521,522,531],
                neutral: 'showers',
                day: 'day-showers',
                night: 'night-showers'
              },
              {
                ids: [500,501,502,503,504],
                neutral: 'rain',
                day: 'day-rain',
                night: 'night-rain'
              },
              {
                ids: [511,611,612,615,616,620,621,622],
                neutral: 'sleet',
                day: 'day-sleet',
                night: 'night-sleet'
              },
              {
                ids: [600,601,602],
                neutral: 'snow',
                day: 'day-snow',
                night: 'night-snow'
              },
              {
                ids: [701,741],
                neutral: 'fog',
                day: 'day-fog',
                night: 'night-fog'
              },
              {
                ids: [711],
                neutral: 'smoke'
              },
              {
                ids: [721],
                neutral: 'day-haze'
              },
              {
                ids: [781],
                neutral: 'tornado'
              },
              {
                ids: [771],
                neutral: 'strong-wind',
                day: 'day-windy'
              },
              {
                ids: [731,751,761,762],
                neutral: 'dust'
              },
              {
                ids: [800],
                neutral: 'day-sunny',
                night: 'night-clear'
              },
              {
                ids: [801,802,803,804],
                neutral: 'cloudy',
                day: 'day-cloudy',
                night: 'night-cloudy'
              },
              {
                ids: [900,901,902],
                neutral: 'tornado'
              },
              {
                ids: [903],
                neutral: 'snowflake-cold'
              },
              {
                ids: [904],
                neutral: 'hot'
              },
              {
                ids: [905],
                neutral: 'windy'
              },
              {
                ids: [906],
                neutral: 'hail',
                day: 'day-hail',
                night: 'night-hail'
              },
              {
                ids: [951],
                neutral: 'beafort-0'
              },
              {
                ids: [952],
                neutral: 'beafort-1'
              },
              {
                ids: [953],
                neutral: 'beafort-2'
              },
              {
                ids: [954],
                neutral: 'beafort-3'
              },
              {
                ids: [955],
                neutral: 'beafort-4'
              },
              {
                ids: [956],
                neutral: 'beafort-5'
              },
              {
                ids: [957],
                neutral: 'beafort-6'
              },
              {
                ids: [958],
                neutral: 'beafort-7'
              },
              {
                ids: [959],
                neutral: 'beafort-8'
              },
              {
                ids: [960],
                neutral: 'beafort-9'
              },
              {
                ids: [961],
                neutral: 'beafort-10'
              },
              {
                ids: [962],
                neutral: 'beafort-11'
              }
            ];

            if (!apiKey) {
                console.warn('No OpenWeatherMap API key set.');
            }

            var base = 'http://api.openweathermap.org/data/2.5/weather';
            var query = 'q=' + CITY + '&type=accurate';
            var urlPath = base + "?APPID=" + apiKey + "&lang=" + language + '&units=' + unit + '&' + query;

            // AngularJS core call
            $http({
                method: 'GET',
                url: urlPath
            })
            .then(
                function successCallBack(response) {
                    console.log("La API de openweathermap responde: ");
                    console.log(response.data);
                    $scope.currentTime = getIcon(mappings, response.data.weather[0].id, 'neutral');
                },

                function errorCallBack(response) {
                    console.error(response.statusText);
                }
            );


        }
    });
