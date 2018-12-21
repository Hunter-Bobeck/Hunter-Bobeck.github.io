// smooth identifier scrolling //
function scrollTo(identifier, duration)
{
	$('html, body').animate(
	{
		scrollTop: $(identifier).offset().top
	}, duration);
}