// method: smoothly scroll to the given identifier, over the given duration //
function scrollTo(identifier, duration)
{
	$('html, body').animate(
	{
		scrollTop: $(identifier).offset().top
	}, duration);
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

// element: sets the title to that found in (the head of) the HTML at the given (local) path, then removes itself //
class MatchTitleAt extends HTMLElement
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
			document.title = frame.contentDocument.title;
			
			frame.remove();
		});
	}
}
if ('customElements' in window)
{
	customElements.define('match-title-at', MatchTitleAt);
}