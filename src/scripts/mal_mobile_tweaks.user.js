// ==UserScript==
// @name         MAL mobile tweaks
// @description  Various tweaks to improve MAL's mobile site based on my preferences.
// @version      1.2.3
// @author       zkayia
// @namespace    https://github.com/zkayia/usermods
// @downloadURL  https://raw.githubusercontent.com/zkayia/usermods/master/src/scripts/mal_mobile_tweaks.js
// @homepageURL  https://github.com/zkayia/usermods
// @supportURL   https://github.com/zkayia/usermods
// @match        https://myanimelist.net/anime/*
// @match        https://myanimelist.net/manga/*
// @run-at       document-body
// @grant        none
// ==/UserScript==

"use strict";


window.addEventListener("load", () => {
	const getMatches = url => url.toString().match(/\.net\/(\w+)\/(\d+)\//i);
	const extractId = url => getMatches(url)[2]
	const thisId = extractId(window.location);
	const thisType = getMatches(window.location)[1];

	// fix anime recommendation links (thumbnail click = go to recommendation, title click = go to anime/manga)
	for (const element of document.querySelectorAll("div.slider.anime-detail-userrecs > a.thumb")) {
		element.setAttribute("href", `https://myanimelist.net/recommendations/${thisType}/${extractId(element.getAttribute("href"))}-${thisId}`);
	};

	// close/open slides
	for (const element of ["news", "related-manga", "staff", "pictures", "link"]) {
		const header = document.querySelector(`h2.header3.btn-toggle-detail.js-btn-toggle-detail[data-id="${element}"]`);
		if (header !== null) {
			header.classList.toggle("open");
		}
		$(`#${element}`).slideToggle(0); // this works because ran in the context of the website (which has jquery)
	};
}, false);