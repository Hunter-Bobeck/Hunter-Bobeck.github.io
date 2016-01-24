document.getElementById("closer-toggler").onclick = function()
{
	var closer_toggleds = document.getElementsByClassName("closer-toggled");
	for (var i = 0; i < closer_toggleds.length; i++)
	{
		var closer_toggled = closer_toggleds[i];
		closer_toggled.setAttribute("data-toggle", "collapse");
		closer_toggled.setAttribute("data-target", "#custom-collapse");
	}
};

window.onresize = function()
{
	if (window.innerWidth >= 768)
	{
		var closer_toggleds = document.getElementsByClassName("closer-toggled");
		for (var i = 0; i < closer_toggleds.length; i++)
		{
			var closer_toggled = closer_toggleds[i];
			closer_toggled.setAttribute("data-toggle", "");
			closer_toggled.setAttribute("data-target", "");
		}
	}
}