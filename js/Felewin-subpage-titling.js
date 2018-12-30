$(document).ready(function()
{
	let fileNameSpaced = (location.pathname.substring(location.pathname.lastIndexOf("/") + 1)).replace(".html", "").replace(/-/g, ' ');
	document.title += (((fileNameSpaced === "index") || !fileNameSpaced.includes(".html")) ? "" : " | "+fileNameSpaced);
});