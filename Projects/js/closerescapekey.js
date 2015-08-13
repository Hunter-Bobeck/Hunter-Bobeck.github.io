/* activate the closer when the escape key is released */
$(document).keyup(function(e) {

  if (e.keyCode == 27) {
  	window.location.href = 'index.html';
  }   // escape key maps to keycode `27`
});