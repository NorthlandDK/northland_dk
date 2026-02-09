// ----------------------------------------
//  Nav: scroll background transition
// ----------------------------------------
const nav = document.querySelector('.nav');
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');

function onScroll() {
	nav.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ----------------------------------------
//  Mobile menu
// ----------------------------------------
function isMenuOpen() {
	return toggle.getAttribute('aria-expanded') === 'true';
}

function openMenu() {
	toggle.setAttribute('aria-expanded', 'true');
	toggle.setAttribute('aria-label', 'Luk menu');
	links.classList.add('open');
	nav.classList.add('menu-open');
	document.body.classList.add('menu-locked');

	// Focus the first link when menu opens
	const firstLink = links.querySelector('a');
	if (firstLink) firstLink.focus();
}

function closeMenu() {
	toggle.setAttribute('aria-expanded', 'false');
	toggle.setAttribute('aria-label', 'Åbn menu');
	links.classList.remove('open');
	nav.classList.remove('menu-open');
	document.body.classList.remove('menu-locked');
	toggle.focus();
}

// Toggle on button click
toggle.addEventListener('click', () => {
	isMenuOpen() ? closeMenu() : openMenu();
});

// Close on anchor click
links.querySelectorAll('a').forEach((a) => {
	a.addEventListener('click', () => {
		if (isMenuOpen()) closeMenu();
	});
});

// Close on Escape
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && isMenuOpen()) {
		closeMenu();
	}
});

// Close on outside click
document.addEventListener('click', (e) => {
	if (isMenuOpen() && !nav.contains(e.target)) {
		closeMenu();
	}
});

// Focus trap within mobile menu
nav.addEventListener('keydown', (e) => {
	if (e.key !== 'Tab' || !isMenuOpen()) return;

	const focusable = [toggle, ...links.querySelectorAll('a')];
	const first = focusable[0];
	const last = focusable[focusable.length - 1];

	if (e.shiftKey && document.activeElement === first) {
		e.preventDefault();
		last.focus();
	} else if (!e.shiftKey && document.activeElement === last) {
		e.preventDefault();
		first.focus();
	}
});

// ----------------------------------------
//  Scroll reveal (IntersectionObserver)
// ----------------------------------------
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.15 },
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
