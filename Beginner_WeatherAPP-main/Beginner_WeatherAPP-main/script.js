    // FUNKCIJA ZA UZIMANJE- fetch weather data-PODATAKA SA PORTALA https://api.openweathermap.org
    function fetchWeatherData(city) {
      const apiKey = '90cd13c6c777169fe48456c291385bd5'; 
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      fetch(apiUrl)
          .then((response) => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then((data) => {
              // Ažuriraj korisnički interfejs podacima o vremenskoj prognozi
              updateWeatherUI(data);
          })
          .catch((error) => {
              console.error('Error fetching weather data:', error);
              alert('GREŠKA MOLIM POKUŠAJTE PONOVO');
          });
  }

  // Funkcija za  ažuriranje korisničkog interfejsa podacima o vremenskoj prognozi
  function updateWeatherUI(data) {
      const locationElement = document.querySelector('.location h2');
      const temperatureElement = document.querySelector('.temperature p');
      const conditionElement = document.querySelector('.condition p');

      locationElement.textContent = `${data.name}, ${data.sys.country}`;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      conditionElement.textContent = data.weather[0].description;

    
  }

  // Funkcija za prosedjivanje obrasca
  function handleFormSubmit(event) {
      event.preventDefault();
      const cityInput = document.querySelector('.search input');
      const cityName = cityInput.value.trim();

      if (cityName) {
          fetchWeatherData(cityName);
          cityInput.value = ''; // Prazno polje unosa
      } else {
          alert('MOLIM UNESITE ISPRAVAN NAZIV LOKACIJE.');
      }
  }

  // Povezivanje forme potvrde sa dugmetom za pretragu
  const searchButton = document.querySelector('.search button');
  searchButton.addEventListener('click', handleFormSubmit);


 // Funkcija za datum i vreme

 
        function updateTime() {
            const currentDateTime = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
            const formattedDateTime = currentDateTime.toLocaleDateString('en-US', options);
            document.getElementById('currentDateTime').textContent = formattedDateTime;
        }

        setInterval(updateTime, 1000);
        updateTime();

