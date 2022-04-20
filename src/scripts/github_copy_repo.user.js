// ==UserScript==
// @name         Github copy repo name
// @description  Adds a button to quickly copy the username/reponame pair to the clipboard.
// @version      1.0.2
// @author       zkayia
// @namespace    https://github.com/zkayia/usermods
// @downloadURL  https://github.com/zkayia/usermods/raw/master/src/scripts/github_copy_repo.user.js
// @updateURL    https://github.com/zkayia/usermods/raw/master/src/scripts/github_copy_repo.user.js
// @homepageURL  https://github.com/zkayia/usermods
// @supportURL   https://github.com/zkayia/usermods
// @match        https://github.com/*
// @run-at       document-body
// @grant        none
// ==/UserScript==

"use strict";


const repoName = document.querySelector("meta[name=\"octolytics-dimension-repository_nwo\"]").getAttribute("content");

const buttonHtlm = `
	<clipboard-copy id="cstm-button-container" class="btn" value="${repoName}">
		<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" id="cstm-button-copyRepoName" class="cstm-button octicon color-fg-muted">
			<path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
		</svg>
	</clipboard-copy>
`;

const addButton = () => {
	if (document.getElementById("cstm-button-container") === null) {
		const nextNode = document.querySelector(".application-main #repository-container-header .Label");
		if (nextNode) {
			nextNode.classList.remove("mr-1");
			nextNode.classList.add("ml-2");
			nextNode.insertAdjacentHTML("beforebegin", buttonHtlm);
		};
	};
};

document.querySelector("head title").addEventListener("change", addButton, false);

addButton();
