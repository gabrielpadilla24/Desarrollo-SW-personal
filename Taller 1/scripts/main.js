import { dataSeries } from './dataSeries.js';

var tbodySeries = document.getElementById('series');
var btnFilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var elmTotalSeasons = document.getElementById("seasons-average");

btnFilterByName.onclick = function () { applyFilterByName(); };

renderSeriesTable(dataSeries);
elmTotalSeasons.innerHTML = calculateAverageSeasons(dataSeries);

function renderSeriesTable(seriesList) {
    console.log('Displaying series');
    seriesList.forEach(function (serie) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>".concat(serie.id, "</td>\n")
                           + "<td>".concat(serie.name, "</td>\n")
                           + "<td>".concat(serie.channel, "</td>\n")
                           + "<td>".concat(serie.seasons, "</td>");
        tbodySeries.appendChild(trElement);
    });
}

function applyFilterByName() {
    var searchText = inputSearchBox.value || '';
    clearSeriesTable();
    var filteredSeries = filterSeriesByName(searchText, dataSeries);
    renderSeriesTable(filteredSeries);
}

function filterSeriesByName(name, seriesList) {
    return name === '' ? dataSeries : seriesList.filter(function (serie) {
        return serie.name.match(name);
    });
}

function calculateAverageSeasons(seriesList) {
    var totalSeasons = seriesList.reduce(function (total, serie) {
        return total + serie.seasons;
    }, 0);
    return totalSeasons / seriesList.length;
}

function clearSeriesTable() {
    while (tbodySeries.hasChildNodes()) {
        if (tbodySeries.firstChild != null) {
            tbodySeries.removeChild(tbodySeries.firstChild);
        }
    }
}
