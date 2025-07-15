const slides = [
    {
      city: "Delhi",
      image: "images/delhi.jpg",
      desc: "The bustling capital city, known for its rich history and vibrant street life."
    },
    {
      city: "Mumbai",
      image: "images/mumbai.jpg",
      desc: "The city that never sleeps — India's financial hub and home of Bollywood."
    },
    {
      city: "Jaipur",
      image: "images/jaipur.jpg",
      desc: "The Pink City, famous for its royal palaces and colorful bazaars."
    },
    {
      city: "Bengaluru",
      image: "images/bengaluru.jpg",
      desc: "India's Silicon Valley, a perfect blend of gardens and tech hubs."
    },
    {
      city: "Kolkata",
      image: "images/kolkata.jpg",
      desc: "The cultural capital of India, known for its colonial architecture and arts."
    }
  ];
  
  let currentIndex = 0;
  
  const carouselImage = document.getElementById('carousel-image');
  const cityName = document.getElementById('city-name');
  const cityDesc = document.getElementById('city-desc');
  const weatherInfo = document.getElementById('weather-info');
  
  function showSlide(index) {
    const slide = slides[index];
    carouselImage.src = slide.image;
    cityName.textContent = slide.city;
    cityDesc.textContent = slide.desc;
    fetchWeather(slide.city);
  }
  
  function fetchWeather(city) {
    const apiKey = '85e6dc7db1f3fbea7b57cb913b879f22'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then(data => {
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        weatherInfo.innerHTML = `
          <h3>${city}</h3>
          <p>Temperature: ${temp}°C</p>
          <p>Condition: ${desc}</p>
        `;
      })
      .catch(err => {
        weatherInfo.innerHTML = `<p>Error: ${err.message}</p>`;
      });
  }
  
  document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });
  
  document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });
  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 5000);
  
  showSlide(currentIndex);
  