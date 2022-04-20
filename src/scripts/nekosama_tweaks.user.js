// ==UserScript==
// @name         Neko Sama Tweaks
// @description  Replaces the search on type bar with a search on confirm and adds a search button
// @version      1.0.2
// @author       zkayia
// @namespace    https://github.com/zkayia/usermods
// @downloadURL  https://github.com/zkayia/usermods/raw/master/src/scripts/nekosama_tweaks.user.js
// @homepageURL  https://github.com/zkayia/usermods
// @supportURL   https://github.com/zkayia/usermods
// @match        https://neko-sama.fr/anime/
// @run-at       document-body
// @grant        none
// ==/UserScript==

"use strict";


const customHTML = `
	<style type="text/css">
		#cstm-button-search {
			display: flex !important;
			justify-content: center !important;
			align-items: center !important;
			width: min(100px, 14%) !important;
			height: 40px !important;
			background-color: #2d2e2f !important;
			border: 1px solid #6d6d6d !important;
			cursor: pointer !important;
		}
		#cstm-button-search svg {
			width: 50% !important;
			height: 50% !important;
		}
		#cstm-button-search path {
			fill: #f9f9f9 !important;
		}
	</style>
	<button id="cstm-button-search">
		<svg viewBox="0 0 512 512">
			<path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z">
			</path>
		</svg>
	</button>
`;

const searchInputEvent = new Event("input", {bubbles: true, cancelable: true});

const defaultSearchBar = document.querySelector("#search > input");
defaultSearchBar.setAttribute("name", "test");
defaultSearchBar.insertAdjacentHTML("afterend", "<input type=\"text\" id=\"custom-search-bar\" autocomplete=\"off\" name=\"search\" style=\"display: none;\">");
const searchBar = document.getElementById("custom-search-bar");

const searchAction = () => {
	searchBar.value = defaultSearchBar.value;
	searchBar.dispatchEvent(searchInputEvent);
};

defaultSearchBar.parentElement.setAttribute("style", "display: flex;");
defaultSearchBar.insertAdjacentHTML("afterend", customHTML);

document.getElementById("cstm-button-search").addEventListener("click", e => {searchAction();}, false);
defaultSearchBar.addEventListener("keyup", e => {if (e.which === 13) {searchAction();};});
