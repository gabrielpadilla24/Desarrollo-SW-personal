
import { Serie } from './serie.js';

import { dataSeries } from './dataSeries.js';

let seriesTbody: HTMLElement = document.getElementById('series')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalSeasonElm: HTMLElement = document.getElementById("total-seasons")!;


btnfilterByName.onclick = () => applyFilterByName();

renderSeriesInTable(dataSeries);

totalSeasonElm.innerHTML = `${getSeasonsAverage(dataSeries)}`


function renderSeriesInTable(courses: Serie[]): void {
  console.log('Desplegando cursos');
  courses.forEach((serie) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${serie.id}</td>
                           <td>${serie.name}</td>
                           <td>${serie.channel}</td>
                           <td>${serie.seasons}</td>`;
    seriesTbody.appendChild(trElement);
  });
}
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearSeriesInTable();
  let coursesFiltered: Serie[] = searchSerieByName(text, dataSeries);
  renderSeriesInTable(coursesFiltered);
}

function searchSerieByName(nameKey: string, series: Serie[]) {
  return nameKey === '' ? dataSeries : series.filter( c => 
    c.name.match(nameKey));
}


function getSeasonsAverage(series: Serie[]): number {
  let seasonsAverage = series.reduce((total, serie) => total + serie.seasons, 0);
  return seasonsAverage / series.length;
}

function clearSeriesInTable() {
  while (seriesTbody.hasChildNodes()) {
    if (seriesTbody.firstChild != null) {
      seriesTbody.removeChild(seriesTbody.firstChild);
     
    }
  }
}