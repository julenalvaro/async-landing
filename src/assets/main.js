document.addEventListener('DOMContentLoaded', async () => {
  const content = document.getElementById('content');

  const APIurl = 'https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PL-5YtFfXdaFS5DjNzFmwwcF3ab2keYyd3&part=snippet&maxResults=10';

  console.log(content);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd56e0936b8mshbed77faccb67584p10ccf6jsn314fdd7e7833',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };

  async function fetchData(APIurl) {
    const response = await fetch(APIurl, options);
    const data = await response.json();
    return data;
  }

  // // función asíncrona sencilla para obtener los datos de la API

  // function printObject(obj) {
  //   Object.keys(obj).forEach(key => {
  //     const value = obj[key];
  //     if (typeof value === 'object') {
  //       console.log(`${key}:`);
  //       printObject(value);
  //     } else {
  //       console.log(`${key}: ${value}`);
  //     }
  //   });
  // }

  // async function getVideos() {
  //   try {
  //     const videos = await fetchData(APIurl);
  //     videos.items.forEach(item => {
  //       console.log('Objeto:');
  //       console.dir(item, { depth: null });
  //       console.log('\n');
  //     });
  //   } catch(error) {
  //     console.error(error); 
  //   }
  // }

  // getVideos();



  async function fetchData(APIurl) {
    const response = await fetch(APIurl, options);
    const data = await response.json();
    return data;
  }

  // función anónima autoejecutable para obtener los datos de la API. Se ejecuta al cargar la página, no hace falta llamarla

  (async () => {
    try{
      const videos = await fetchData(APIurl);
      //template html para mostrar los datos de la API en el DOM
      let view = ` 
      ${videos.items.map(data => `
            <div class="group relative">
            <div
              class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
              <img src="${data.snippet.thumbnails.high.url}" alt="${data.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
              <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${data.snippet.title} 
              </h3>
            </div>
          </div>
        `).slice(0,4).join('')}
      `;
      content.innerHTML = view;
      }catch(error){
          const errorMessage = document.createElement('p');
          errorMessage.textContent = 'Error fetching data. Please try again later.';
          content.appendChild(errorMessage);

          console.error(error);
    }
  })();
});