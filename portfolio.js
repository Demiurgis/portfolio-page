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
const navSplash = document.getElementById("navSplash");
const navAbout = document.getElementById("navAbout");
const navSkills = document.getElementById("navSkills");
const navProjects = document.getElementById("navProjects");
const navContact = document.getElementById("navContact");

const openNav = () => {
	sideNav.style.width = "90%";
	sideBtn.style.marginRight = "90%";
}

const closeNav = () => {
	sideNav.style.width = "0";
	sideBtn.style.marginRight = "0";
}

const toggleNav = () => {
	if ( sideNav.style.width === "90%" ) {
		sideNav.style.width = "0px";
		sideBtn.style.marginRight = "0px";
		sideBtn.style.borderRadius = "50% 50% 50% 50%";
		sideBtn.style.backgroundColor = null;

	} else {
		sideNav.style.width = "90%";
		sideBtn.style.marginRight = "90%";
		sideBtn.style.borderRadius = "50% 0% 0% 50%";
		sideBtn.style.backgroundColor = "rgba(15, 15, 15, 1)";
	}
}

const navSelect = ( newClass ) => {
	const oldClass = body.classList.item(0);
	body.classList.replace( oldClass, newClass );
	closeNav()
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
	if ( emailOptions.style.visibility === "collapse" ) {
		animateCSS('#emailOptions', 'fadeIn')
		emailOptions.style.visibility = "visible";
	} else {
		animateCSS('#emailOptions', 'fadeOut', function(){
			emailOptions.style.visibility = "collapse";
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

window.addEventListener("wheel", scrollDebounce);
navSplash.addEventListener("click", () => {navSelect('splash')}, false);
navAbout.addEventListener("click", () => {navSelect('about')}, false);
navSkills.addEventListener("click", () => {navSelect('skills')}, false);
navProjects.addEventListener("click", () => {navSelect('projects')}, false);
navContact.addEventListener("click", () => {navSelect('contact')}, false);
