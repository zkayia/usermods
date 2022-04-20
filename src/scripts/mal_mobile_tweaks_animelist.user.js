// ==UserScript==
// @name         MAL mobile animelist tweaks
// @description  Replaces increment and edit details buttons.
// @version      1.3.5
// @author       zkayia
// @namespace    https://github.com/zkayia/usermods
// @downloadURL  https://github.com/zkayia/usermods/raw/master/src/scripts/mal_mobile_tweaks_animelist.user.js
// @updateURL    https://github.com/zkayia/usermods/raw/master/src/scripts/mal_mobile_tweaks_animelist.user.js
// @homepageURL  https://github.com/zkayia/usermods
// @supportURL   https://github.com/zkayia/usermods
// @match        https://myanimelist.net/animelist/*
// @run-at       document-body
// @grant        none
// ==/UserScript==

"use strict";


const COLOR = "#cccccc"


const addButtonHtml = `
	<button type="button" class="custom-add-button" style="float: right; width: 34px; height: 34px; color: ${COLOR}; background: transparent;">
		<svg style="height: 100%; width: 100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
			<path fill="${COLOR}" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
			</path>
		</svg>
	</button>
`;

const generateEditLink = data => `https://myanimelist.net/ownlist/anime/${data.split("/")[2]}/edit`;

window.addEventListener("load", () => {
	const url = window.location.toString();

	if (!url.includes("view=list")) {return;};
	if (!(new RegExp(/status=1/g).test(url))) {return;};

	for (const unit of document.querySelectorAll(".content-main #list-items .list-unit")) {

		const increment = unit.querySelector(".user-status .increment > span");
		if (increment === null) {
			break;
		}
		const info = unit.querySelector(".list-item .info");

		increment.setAttribute("style", "display: none !important;");
		increment.insertAdjacentHTML(
			"beforebegin",
			`<a class="custom-edit-link" href="${
				generateEditLink(info.querySelector("a.title").getAttribute("href"))
			}">edit details</a>`
		);

		info.insertAdjacentHTML("afterbegin", addButtonHtml);
		info.querySelector(".edit-icon").remove();

		unit.getElementsByClassName("custom-add-button")[0].addEventListener("click", e => {increment.click();});
	};
}, false);
