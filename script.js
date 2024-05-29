//API key required for authentication
const apiKey = "9d08c846d5a4ebd39cf881ce1846f3bf";

function weather() {
    //getting the city given by the user in the input field
    let city = document.getElementById("city").value;
    let cardRow = document.getElementById("cardRow");

    //fecthing weather data of the city from the URL
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {

            //creating a constant to b used to convert temperature from kelvin to degree celcius
            const KelvinToCelcius = 273.15;

            //getting the name/code of the country
            let country = data.sys.country;

            //getting the weather details of the city
            let main = data.weather[0].main;
            let icon = data.weather[0].icon;
            let url = `http://openweathermap.org/img/w/${icon}.png`;

            let feelsLike = data.main.feels_like;
            feelsLike = (feelsLike - KelvinToCelcius).toFixed(2);

            let temperature = data.main.temp;
            temperature = (temperature - KelvinToCelcius).toFixed(2);

            let pressure = data.main.pressure;
            let humidity = data.main.humidity;
            let windSpeed = data.wind.speed;

            // creatning the outline of the card using DOM and bootstrap
            let card = document.createElement("div");
            card.className = "card h-100 border-0  rounded-4 mt-1 mb-3";
            card.style.background = "linear-gradient(315deg, #ffffff 0%, #5899e2 74%)";

            //creating the header of the card
            let cardHeader = document.createElement("div");
            cardHeader.className =
                "card-header  rounded-top-4 text-dark text-center fs-2";
            cardHeader.innerHTML = `City: ${city}, Country: ${country}`;

            //creating the body of the card where the weather details will be displayed
            let cardBody = document.createElement("div");
            cardBody.className = "rounder-5 alert-light text-dark";

            //creating the list with the weather detail
            let list = document.createElement("ul");
            list.className = "fs-5 fw-bold text-dark text-center";
            list.innerHTML = `
                <li type="none">
                    <img src="${url}" class="card-img-top" alt="icon" style='width:5%'>
                    <span>${main}</span>
                </li>   
                <hr>
                <li type="none"><span style="color:#00008B;">Temperature :</span> ${temperature}&deg;C</li>
                <hr>
                <li type="none"><span style="color:#00008B;">Feels Like :</span> ${feelsLike}&deg;C</li>
                <hr>
                <li type="none"><span style="color:#00008B;">Pressure :</span> ${pressure}mb</li>
                <hr>
                <li type="none"><span style="color:#00008B;">Humidity :</span> ${humidity}%</li>
                <hr>
                <li type="none"><span style="color:#00008B;">Wind Speed :</span> ${windSpeed}km/h</li>`;

            //Appending the elements which needs to be added to the HTML
            cardRow.appendChild(card);
            card.append(cardHeader, cardBody);
            cardBody.appendChild(list);
        })
}