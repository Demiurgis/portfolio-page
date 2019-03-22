(function iife(){

	const sideNav = document.getElementById("sideNav");
	const sideBtn = document.getElementById("sideBtn");
	const splash = document.getElementById("splash");
	const about = document.getElementById("about");
	const skills = document.getElementById("skills");
	const projects = document.getElementById("projects");
	const contact = document.getElementById("contact");
	const body = document.getElementById("body");
	const emailOptions = document.getElementById("emailOptions");
	const catFriends = document.getElementById("catFriends");
	const copy = document.getElementById("copy");
	const email = document.getElementById("email");
	const creditsLinks = document.getElementById("creditsLinks");
	const credits = document.getElementById("credits");
	const controls = document.querySelector(".controls");

	const openNav = () => {
		sideNav.classList.add('openNav');
		sideBtn.classList.add('openBtn');
	}

	const closeNav = () => {
		sideNav.classList.remove('openNav');
		sideBtn.classList.remove('openBtn');
	}

	const toggleNav = () => {
		const navs = Array.from( document.querySelectorAll(".nav") );
		if ( sideNav.classList.contains('openNav') ) {
			closeNav();
			navs.forEach( (nav) => {
				nav.classList.remove('visible');
				nav.classList.add('hidden');
			});
		} else {
			navs.forEach( (nav) => {
				nav.classList.remove('hidden');
				nav.classList.add('visible');
			});
			openNav();
		}
	}

	const navSelect = ( newClass ) => {
		const oldClass = body.classList.item(0);
		body.classList.replace( oldClass, newClass );
		toggleNav()
	}

	function animateCSS(element, animationName, callback) {
		const node = document.querySelector(element)
		node.classList.add('animated', animationName)

		function handleAnimationEnd() {
			node.classList.remove('animated', animationName)
			node.removeEventListener('animationend', handleAnimationEnd)

			if (typeof callback === 'function') callback()
		}
		node.addEventListener('animationend', handleAnimationEnd)
	}

	const emailOpsToggle = () => {
		if ( emailOptions.classList.contains('hidden') ) {
			animateCSS('#emailOptions', 'fadeIn')
			emailOptions.classList.remove('hidden');
			emailOptions.classList.add('visible');
		} else {
			animateCSS('#emailOptions', 'fadeOut', function(){
				emailOptions.classList.remove('visible');
				emailOptions.classList.add('hidden');
			})
		}
	}
	//this needs to be refactored with emailOpsToggle
	const creditsToggle = () => {
		if ( creditsLinks.classList.contains('hidden') ) {
			animateCSS('#creditsLinks', 'fadeIn')
			creditsLinks.classList.remove('hidden');
			creditsLinks.classList.add('visible');
		} else {
			animateCSS('#creditsLinks', 'fadeOut', function(){
				creditsLinks.classList.remove('visible');
				creditsLinks.classList.add('hidden');
			})
		}
	}

	const copyToClipboard = str => {
		const el = document.createElement('textarea');  // Create a <textarea> element
		el.value = str;                                 // Set its value to the string that you want copied
		el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
		el.style.position = 'absolute';                 
		el.style.left = '-9999px';                      // Move outside the screen to make it invisible
		document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
		const selected =            
			document.getSelection().rangeCount > 0        // Check if there is any content selected previously
	  		? document.getSelection().getRangeAt(0)     // Store selection if found
	 		: false;                                    // Mark as false to know no selection existed before
	  	el.select();                                    // Select the <textarea> content
			document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
			document.body.removeChild(el);                  // Remove the <textarea> element
		if (selected) {                                 // If a selection existed before copying
			document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
			document.getSelection().addRange(selected);   // Restore the original selection
		}
		emailOpsToggle()
	};

	const debounce = (func, wait, immediate) => {
		var timeout;

		return function executedFunction() {
			const context = this;
			const args = arguments;

			const later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	const scrollDebounce = debounce(function() {
		toggleNav()
	}, 400, true);

	window.addEventListener("wheel", scrollDebounce, false);
	copy.addEventListener("click", () => {copyToClipboard('bshipos@gmail.com')}, false);
	email.addEventListener("click", emailOpsToggle, false);
	credits.addEventListener("click", creditsToggle, false);
	sideBtn.addEventListener("click", toggleNav, false);
	
	sideNav.addEventListener("click", (e) => {
		if ( e.target.dataset.navId ){
			navSelect( e.target.dataset.navId );
		}
	}, false);

	controls.addEventListener('click', ( e ) => {
		const navPages = Array.from( document.querySelector('.pages').children )
		const currentPage = navPages.indexOf(document.querySelector(`#${document.body.classList.item(0)}`))
		let goto;
		if ( e.target.classList.contains('fwdCtrl') || e.target.classList.contains('right') ){
			goto = currentPage + 1;
		} else if ( e.target.classList.contains('backCtrl') || e.target.classList.contains('left') ){
			goto = currentPage - 1;
		} else if ( e.target.classList.contains('splashCtrl') ){
			goto = 0;
		}
		openNav();
		setTimeout(()=>{
			navSelect(navPages[goto].id)
		}, 575);
	}, false)

})();