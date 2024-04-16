import { dataSeries } from './dataSeries.js';

const seriesTbody = document.getElementById('series');
const btnfilterByName = document.getElementById("button-filterByName");
const inputSearchBox = document.getElementById("search-box");
const totalSeasonElm = document.getElementById("total-seasons");
const seriesInfo = document.getElementById('seriesInfo');

btnfilterByName.onclick = () => applyFilterByName();
renderSeriesInTable(dataSeries);
totalSeasonElm.innerHTML = `${getSeasonsAverage(dataSeries)}`;

function renderSeriesInTable(series) {
    console.log('Desplegando series');
    const tbody = document.querySelector('#id-del-tbody');
    series.forEach((serie) => {
        const trElement = document.createElement("tr");
        const tdID = document.createElement("td");
        tdID.innerHTML = serie.id.toString();
        trElement.appendChild(tdID);
        const tdName = document.createElement("td");
        tdName.innerHTML = `<a href="#" class="serie-name">${serie.name}</a>`;
        trElement.appendChild(tdName);
        tdName.addEventListener('click', () => seriesInfo.innerHTML = `
            <div class="card" style="width: 30rem;">
                <img class="card-img-top" src="${serie.image}" height: auto;">
                <div class="card-body">
                    <h1 class="card-title" style="font-size:larger">${serie.name}</h1>   
                    <p>${serie.description}</p>
                    <p> <a href="${serie.link}" target="_blank">${serie.link}</a></p>
                </div>
            </div>
        `);
        const tdChannel = document.createElement("td");
        tdChannel.innerHTML = serie.channel;
        trElement.appendChild(tdChannel);
        const tdSeasons = document.createElement("td");
        tdSeasons.innerHTML = serie.seasons.toString();
        trElement.appendChild(tdSeasons);
        tbody.appendChild(trElement);
    });
}

function applyFilterByName() {
    const text = inputSearchBox.value;
    clearSeriesInTable();
    const seriesFiltered = searchSerieByName(text, dataSeries);
    renderSeriesInTable(seriesFiltered);
}

function searchSerieByName(nameKey, series) {
    return nameKey === '' ? dataSeries : series.filter(c => c.name.match(nameKey));
}

function getSeasonsAverage(series) {
    const seasonsAverage = series.reduce((total, serie) => total + serie.seasons, 0);
    return parseFloat(seasonsAverage / series.length).toFixed(2);
}

function clearSeriesInTable() {
    while (seriesTbody.hasChildNodes()) {
        if (seriesTbody.firstChild != null) {
            seriesTbody.removeChild(seriesTbody.firstChild);
        }
    }
}