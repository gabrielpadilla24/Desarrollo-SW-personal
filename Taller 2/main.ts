import { Serie } from './serie.js';
import { dataSeries } from './dataSeries.js';

const seriesTableBody: HTMLElement = document.getElementById('series')!;
const filterButton: HTMLElement = document.getElementById("button-filterByName")!;
const searchInput: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const averageSeasonsElement: HTMLElement = document.getElementById("total-seasons")!;
const seriesInfoElement: HTMLElement = document.getElementById('seriesInfo')!;

filterButton.onclick = () => applyFilterByName();
renderSeriesTable(dataSeries);
averageSeasonsElement.innerHTML = `${calculateAverageSeasons(dataSeries)}`;

function renderSeriesTable(seriesList: Serie[]): void {
  console.log('Displaying series');
  const tableBody = document.querySelector('#id-del-tbody')!;

  seriesList.forEach((serie) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.innerHTML = serie.id.toString();
    row.appendChild(idCell);

    const nameCell = document.createElement("td");
    nameCell.innerHTML = `<a href="#" class="serie-name">${serie.name}</a>`;
    row.appendChild(nameCell);

    nameCell.addEventListener('click', () => seriesInfoElement.innerHTML = `
      <div class="card" style="width: 30rem;">
        <img class="card-img-top" src="${serie.image}" height="auto">
        <div class="card-body">
          <h1 class="card-title" style="font-size: larger">${serie.name}</h1>
          <p>${serie.description}</p>
          <p><a href="${serie.link}" target="_blank">${serie.link}</a></p>
        </div>
      </div>
    `);

    const channelCell = document.createElement("td");
    channelCell.innerHTML = serie.channel;
    row.appendChild(channelCell);

    const seasonsCell = document.createElement("td");
    seasonsCell.innerHTML = serie.seasons.toString();
    row.appendChild(seasonsCell);

    tableBody.appendChild(row);
  });
}

function applyFilterByName() {
  let searchText = searchInput.value || '';
  clearSeriesTable();
  let filteredSeries = filterSeriesByName(searchText, dataSeries);
  renderSeriesTable(filteredSeries);
}

function filterSeriesByName(name: string, seriesList: Serie[]) {
  return name === '' ? dataSeries : seriesList.filter(serie =>
    serie.name.match(name)
  );
}

function calculateAverageSeasons(seriesList: Serie[]): string {
  const totalSeasons = seriesList.reduce((total, serie) => total + serie.seasons, 0);
  const averageSeasons = totalSeasons / seriesList.length;
  return averageSeasons.toFixed(2);
}

function clearSeriesTable() {
  while (seriesTableBody.hasChildNodes()) {
    if (seriesTableBody.firstChild != null) {
      seriesTableBody.removeChild(seriesTableBody.firstChild);
    }
  }
}
