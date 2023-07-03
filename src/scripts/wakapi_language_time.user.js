// ==UserScript==
// @name         Wakapi language time
// @description  Adds the total time on the legend of the language chart
// @version      1.0.0
// @author       zkayia
// @namespace    https://github.com/zkayia/usermods
// @downloadURL  https://github.com/zkayia/usermods/raw/master/src/scripts/wakapi_language_time.user.js
// @updateURL    https://github.com/zkayia/usermods/raw/master/src/scripts/wakapi_language_time.user.js
// @homepageURL  https://github.com/zkayia/usermods
// @supportURL   https://github.com/zkayia/usermods
// @match        https://wakapi.dev/summary
// @run-at       document-body
// @grant        none
// ==/UserScript==


"use strict";


// Number of times the script should check if the charts are loaded, each try is a millisecond
const MAX_RETRIES = 1000;


// Waits for the charts object to exists, resolves true if found, resolves false if MAX_RETRIES is exceeded
function chartsLoaded() {
  return new Promise((resolve, reject) => {
    function tryLoading(i) {
      if (charts != null) {
        resolve(true);
      } else {
        if (i < MAX_RETRIES) {
          setTimeout(() => tryLoading(i + 1), 1);
        } else {
          resolve(false);
        }
      }
    }
    setTimeout(() => tryLoading(1), 1);
  });
}


window.addEventListener("load", async () => {

  if (!(await chartsLoaded())) {
    return;
  }

  const languageChart = charts.find(e => e.canvas.id == "chart-language");

  if (languageChart == null) {
    return;
  }

  // Adds the total time to the legend labels
  languageChart.config._config.data.labels = wakapiData.languages
    .slice(0, Math.min(showTopN[3], wakapiData.languages.length))
    .map(p => `${p.key} (${p.total.toString().toHHMMSS()})`.padEnd(LEGEND_CHARACTERS));

  // Disables the ellipsis on the legend labels
  languageChart.config.options.plugins.legend.labels.filter = null

  // Redraws the chart with the updated data
  languageChart.update();

}, false);
