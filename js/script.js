let city = '';
let cityImage = null;
let weatherData = null;

axios.get('https://api.teleport.org/api/urban_areas/').then(function(response){
    let cityList = response.data._links["ua:item"];
    let citiesHtml = ''
    cityList.forEach(city => {
        citiesHtml += `<option value="${city.name}">${city.name}</option>`;
    });
    $('#cities').html(citiesHtml);
}).catch(function(error) {
    console.log(error);
})

$('#get-weather').on('submit', function(event){
    event.preventDefault();
    city = $('#city').val();
    axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
            'key': 'c503c597bd9b48b0964191101232604',    
            'q': city
        }
    }).then(function(response){
        weatherData = response.data;
        console.log(weatherData);
        $('#city-name').text(weatherData.location.name + ',' + weatherData.location.country);
        //temperature
        $('#temp').text(weatherData.current.temp_f + '°F');
        $('#temp-C').text(weatherData.current.temp_c + '°C');
        //condition
        $('#condition-img').attr('src', weatherData.current.condition.icon).attr('alt', weatherData.current.condition.text);
        $('#condition').text(weatherData.current.condition.text);
        $('#weather').show();

    }).catch(function(error) {
        console.log(error);
    })

    axios.get(`https://api.teleport.org/api/urban_areas/slug:${city.toLowerCase().replace(' ', '-')}/images`).then(function(response) {
        console.log(response);
        cityImage = response.data.photos[0].image.web;
        $('#city-img').attr('src', cityImage).attr('alt', city);
    }).catch(function(error) {
        console.log(error);
        cityImage = "https://static.vecteezy.com/system/resources/previews/000/227/812/original/cityscape-sunset-vector-illustration.jpg"
        $('#city-img').attr('src', cityImage).attr('alt', city);
    })
})