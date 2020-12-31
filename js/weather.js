(function () {
    var city = "平顶山";
    /** 获取天气dom* */
    var weatherDiv = document.getElementById('weather');
    /** * 实时显示部分* **/
    var weatherContent = document.createElement('div');
    var leftDIV = document.createElement('div');
    var cityDIV = document.createElement('div');
    var img = document.createElement('img');
    var weatherDIV = document.createElement('div');
    var rightDIV = document.createElement('div');
    var temperatureDIV = document.createElement('div');
    var windDIV = document.createElement('div');
    var airDIV = document.createElement('div');
    cityDIV.innerHTML = city;
    cityDIV.style.cssText=''+
        'font-size:15px;'+
        'height:40px;';
    weatherContent.style.cssText = 'color:#fff;' +
        'line-height:30px;' +
        'font-size:13px;' +
        'cursor:pointer;'+
        'text-shadow: 0 1px 1px rgba(0,0,0,0.4);';
    leftDIV.style.cssText = 'text-align:center;' +
        'display:inline-block;' +
        'width:80px;' +
        'vertical-align: top;';
    rightDIV.style.cssText = 'display:inline-block;' +
        'vertical-align: top;';
    img.style.cssText = 'display:block;' +
        'margin:0 auto;' +
        'height:30px;' +
        'width:auto;';
    weatherDIV.style.fontSize = '12px';
    temperatureDIV.style.cssText = 'font-size:31px;' +
        'line-height:39px;';
    leftDIV.appendChild(cityDIV);
    leftDIV.appendChild(img);
    leftDIV.appendChild(weatherDIV);
    rightDIV.appendChild(temperatureDIV);
    rightDIV.appendChild(windDIV);
    rightDIV.appendChild(airDIV);
    weatherContent.appendChild(leftDIV);
    weatherContent.appendChild(rightDIV);

    //  天气回调函数
    function weatherCallback(response) {
        var result = response.results[0];
        var pm25 = result.pm25;				//pm2.5的值
        var airQuality;
        var bgColor;
        var weatherData = result.weather_data[0];//具体天气
        var temperature = weatherData.date.split('：')[1].split(')')[0].split('℃')[0]+'°';//实时温度
        var weather = weatherData.weather;   //天气
        var wind = weatherData.wind;
        var imgSrc = "http://www.pds.gov.cn/images/weather/"+weatherData.dayPictureUrl.split('/').pop();

        if (pm25 <= 35) {
            airQuality = '优';
            bgColor = '#00E400';
        } else if (pm25 > 35 && pm25 <= 75) {
            airQuality = '良';
            bgColor = '#FFBB17';
        } else if (pm25 > 75 && pm25 <= 115) {
            airQuality = '轻度污染';
            bgColor = '#FF7E00';
        } else if (pm25 > 115 && pm25 <= 150) {
            airQuality = '中度污染';
            bgColor = '#FF0000';
        } else if (pm25 > 150 && pm25 <= 250) {
            airQuality = '重度污染';
            bgColor = '#99004C';
        } else {
            airQuality = '严重污染';
            bgColor = '#7E0023';
        }
        img.setAttribute('src', imgSrc);
        weatherDIV.innerHTML = weather;
        temperatureDIV.innerHTML = temperature;
        windDIV.innerHTML = wind;
        airDIV.innerHTML = '<span style="border-radius:3px;padding: 2px 6px;background: '+bgColor+';">'+airQuality+'</span>';
    }

    function ajaxJsonp (opt) {
        var funName, script;
        funName = opt.callback || '_cb' + (Math.random() * 1000000);
        window[funName] = function (data) {
            if (typeof opt.success == 'function') {
                opt.success(data);
            }
            window[funName] = null;
            delete window[funName];
            document.body.removeChild(script);
            script = null;
        };
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = opt.url + (opt.url.indexOf('?') > -1 ? '&' : '?') + 'callback=' + funName;
        document.body.appendChild(script);
        script.addEventListener('error', function () {
            window[funName] = null;
            delete window[funName];
            if (typeof opt.error == 'function') {
                opt.error();
            }
            document.body.removeChild(script);
            script = null;
        });
    }
    ajaxJsonp({
        url: 'http://www.pds.gov.cn/WEBAPI/webdictionary.js',
        callback: 'jsoncallback',
        success: function (data) {
            weatherDiv.appendChild(weatherContent);
            weatherCallback(data);
        },
        error: function () {
            console.log('request error!');
        }
    });
}());