const API_KEY = '860d240af05f1e0def8cda208fc17771';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value;
  if (query) {
    fetchMovies(query);
  }
});

async function fetchMovies(query) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
  }
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById('moviesContainer');
  moviesContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.className = 'movie';

    movieElement.innerHTML = `
      <img src="${IMG_BASE_URL + movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>${movie.overview}</p>
      <p><strong>Ano:</strong> ${movie.release_date.split('-')[0]}</p>
    `;

    moviesContainer.appendChild(movieElement);
  });
}
