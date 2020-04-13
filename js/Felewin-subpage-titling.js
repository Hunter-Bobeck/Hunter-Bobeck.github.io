$(document).ready(function()
{
	let filePath = location.pathname;
	let fileNameStartIndex = filePath.lastIndexOf("/") + 1;
	let fileTitle = filePath.substring(fileNameStartIndex);
	let fileName = fileTitle.replace(".html", "");
	let fileNameSpaced = fileName.replace(/-/g, ' ');
	
	document.title += (((fileNameSpaced === "index") || !fileTitle.includes(".html")) ? "" : " | "+fileNameSpaced);
});