function weather(){
  let city = document.getElementById("city").value;
  
  if(!city){
    city = "Moscow"
  }
  const apiKey = '41ae682bbd125c8b2f67fcb3764fdc30';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=ru`;

  // Отправляем запрос
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Обрабатываем ответ от сервера
      console.log(data);
      const temp = data.main.temp - 273.15;
      const gorod = data.name;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      const feel = data.main.feels_like - 273.15;
      const wind = data.wind.speed;

      document.getElementById("gorod").textContent = gorod;
      document.getElementById("icon").src = `http://openweathermap.org/img/w/${icon}.png`;
      document.getElementById("temp").textContent = temp.toFixed(1) + " C°";
      document.getElementById("desc").textContent = desc;
      document.getElementById("feels").textContent = "Ощущается как: " + feel.toFixed(1) + " C°";
      document.getElementById("wind").textContent = "Ветер: " +  wind + " м/c";
    })
    .catch(error => {
      // Обрабатываем ошибку
      console.log('Error fetching weather data:', error);
    });
}
