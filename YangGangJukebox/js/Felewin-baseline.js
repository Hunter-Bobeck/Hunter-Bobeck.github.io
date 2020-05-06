// Felewin baseline JS //




// METHODS //


// method: smoothly scroll to the given target identifier, over the given duration //
function smoothlyScrollTo(targetIdentifier, duration)
{
	$('html, body').animate
	(
		{
			scrollTop: $("#"+targetIdentifier).offset().top
		},
		duration
	);
}

// method: execute the given function as many times as the given count //
function executeAsManyTimesAs(count, function_)
{
	for (var index = 0; index < count; index++)
	{
		function_();
	}
}

// method: return a string of only the given count of linebreaks //
function asManyLinebreaksAs(count)
{
	let string = ``;
	executeAsManyTimesAs
	(
		count,
		function()
		{
			string += `<br>`;
		}
	);
	return string;
}




// ELEMENTS //


// element: replaces itself with the attributed count of linebreaks //
class MultipleLinebreaks extends HTMLElement
{
	connectedCallback()
	{
		this.innerHTML =
			asManyLinebreaksAs
			(
				parseInt(this.getAttribute('count')) || 2
			);
	}
}
if ('customElements' in window)
{
	customElements.define('multiple-linebreaks', MultipleLinebreaks);
}


// element: a kind of button that smoothly scrolls to the attributed target (identifier) over the attributed duration //
class ScrollerButton extends HTMLButtonElement
{
	connectedCallback()
	{
		this.addEventListener
		(
			"click",
			function()
			{
				smoothlyScrollTo
				(
					this.getAttribute('targetIdentifier'),
					parseInt(this.getAttribute('duration')) || 500
				);
			}
		);
	}
}
if ('customElements' in window)
{
	customElements.define('scroller-button', ScrollerButton, {extends: 'button'});
}

// element: replaces itself with the children of the body of the HTML found at the given (local) path
// reference: https://codepen.io/andybelldesign/project/editor/DyVyPG
class ContentAt extends HTMLElement
{
	get path()
	{
		return this.getAttribute('path') || '';
	}
	
	connectedCallback()
	{
		this.innerHTML =
		`
			<iframe src="${this.path}" style="display: none"></iframe>
		`;
		
		const frame = this.querySelector('iframe');
		
		frame.addEventListener('load', event =>
		{
			const frameContentBodyChildren = [...frame.contentDocument.body.children];
			
			frameContentBodyChildren.forEach(bodyChild => frame.before(bodyChild)); 
			
			frame.remove();
		});
	}
}
if ('customElements' in window)
{
	customElements.define('content-at', ContentAt);
}