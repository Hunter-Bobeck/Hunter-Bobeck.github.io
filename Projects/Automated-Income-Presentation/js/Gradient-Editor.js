function setInputColor(input) {
  input.style.backgroundImage = "linear-gradient(to right, transparent 80%, " + input.value + " 80%)";
  renderGradient();
}

var colorInputs = document.querySelectorAll("input[type=text]");
[].slice.apply(colorInputs).forEach(function(input) {
  input.addEventListener("keyup", function(e) {
		setInputColor(input);
  });
});

var svg = document.querySelector("svg");
document.querySelector("#show-line").addEventListener("click", function(e) {
  svg.classList.toggle("hidden");
});

var line = document.querySelector("#line");
var angleLabel = document.querySelector("#angle-label");
var message = document.querySelector(".help-message");

var startX = 100,
    startY = 100,
    currentX = window.innerWidth - 100,
    currentY = window.innerHeight - 100;

function renderGradient() {
  line.setAttribute("x1", startX);
  line.setAttribute("y1", startY);
  line.setAttribute("x2", currentX);
  line.setAttribute("y2", currentY);
  
  angleLabel.setAttribute("x", startX + 5);
  angleLabel.setAttribute("y", startY - 5);

  // Computing the angle with an hypothetical vertical line that starts from x1 y1.
  var deltaY = currentY - startY;
  var deltaX = currentX - startX;
  var angle = 90 + (Math.atan2(deltaY, deltaX) * 180 / Math.PI);

  angleLabel.textContent = angle.toPrecision(4) + "°";
  angleLabel.style.transformOrigin = startX + "px " + startY + "px";
  angleLabel.style.transform = "rotate(" + (angle-90) + "deg)";

  // Computing the edge point location and the distance from it in %.
  var slope = (startY - currentY) / (startX - currentX);
  var edgeY = slope * (-startX) + startY;
  if (angle >= 180 || edgeY < 0) {
    edgeY = 0;
  } else if (edgeY > window.innerHeight) {
    edgeY = window.innerHeight;
  }
  var edgeX = startX + (-startY)/slope;
  if (angle <= 90 || edgeX < 0) {
    edgeX = 0;
  } else if (edgeX > window.innerWidth) {
    edgeX = window.innerWidth;
  }
  
  var edge2Y = startY + slope * (window.innerWidth - startX);
  if (edge2Y < 0) {
    edge2Y = 0;
  } else if (angle >= 180 || edge2Y > window.innerHeight) {
    edge2Y = window.innerHeight;
  }
  var edge2X = startX + (window.innerHeight - startY)/slope;
  if (angle <= 90 || edge2X > window.innerWidth) {
    edge2X = window.innerWidth;
  } else if (edge2X < 0) {
    edge2X = 0;
  }
  
  var distanceFromEdge = Math.sqrt(Math.pow(startX - edgeX, 2) + Math.pow(startY - edgeY, 2));
  var distanceFromEdge2 = Math.sqrt(Math.pow(edge2X - startX, 2) + Math.pow(edge2Y - startY, 2));
  var distanceLine = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
  var startPos = 100 * distanceFromEdge / (distanceFromEdge + distanceFromEdge2);
  var endPos = 100 * (distanceFromEdge + distanceLine) / (distanceFromEdge + distanceFromEdge2);

  document.body.style.backgroundImage = "linear-gradient(" +
    angle + "deg," +
    colorInputs[0].value+ " " + startPos + "%," +
    colorInputs[1].value + " " + endPos + "%)";
}

addEventListener("mousedown", function(e) {
  if (e.target.tagName.toLowerCase() === "input") {
    return;
  }
 
  message.style.display = "none";

  startX = e.clientX;
  startY = e.clientY;

  function onMove(e) {
    currentX = e.clientX;
    currentY = e.clientY;
    
    renderGradient();
  }
  
  function onUp(e) {
    removeEventListener("mousemove", onMove);
    removeEventListener("mouseup", onUp);
  }
  
  addEventListener("mousemove", onMove);
  addEventListener("mouseup", onUp);
});

setInputColor(colorInputs[0]);
setInputColor(colorInputs[1]);
