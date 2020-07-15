/**
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
 // build the navbar
        const nav = document.querySelector('#navbar__list');
        const sections = document.querySelectorAll('section');
        let firstLink = true;
        for (let section of sections) {
            const navLink = document.createElement('li');
            navLink.innerHTML =
                `<a href="#${section.id}" class="menu__link ${firstLink ? "link__active" : ""}" data-link="${section.dataset.nav}">
                    ${section.dataset.nav}
                </a>`
            nav.appendChild(navLink);
            firstLink = false;
        }



//scroll 
        const scroller = document.getElementById('TOP');
        scroller.addEventListener('click', (event) => {
            const animatedScrolling = () => {
                const c = window.scrollY;
                if (c > 0) {
                    window.requestAnimationFrame(animatedScrolling);
                    window.scrollTo(0, c - c / 8);
                }
            }
            window.requestAnimationFrame(animatedScrolling);
        });
    

        const nave = document.getElementsByClassName('page__header')[0];
        let prevYPosition = window.scrollY;
        let firstScroll = true;
        const activeEvent = new Event('active');
        window.onscroll = function () {
            const currentPosition = window.scrollY;

            const scroller = document.getElementById('TOP');
            if (currentPosition > 100 || currentPosition > 100) {
                scroller.classList.remove('display__none');
            }
            else {
                scroller.classList.add('display__none');
            }

            // Hide and show the navbar
            if (firstScroll) {
                if (currentPosition - prevYPosition > 50) {
                    nave.style.top = '-' + 50;
                    prevYPosition = currentPosition;
                    firstScroll = false;
                } else if (prevYPosition - currentPosition > 50) {
                    prevYPosition = currentPosition;
                }
            } else {
                if (prevYPosition < currentPosition) {
                    prevYPosition = currentPosition;
                } else {
                    if (prevYPosition - currentPosition > 50) {
                        nav.style.top = '0';
                        firstScroll = true;
                        prevYPosition = currentPosition;
                    }
                }
            }
            // show the active state
            setTimeout(function () {
                for (let section of sections) {
                    section.dispatchEvent(activeEvent);
                }
            });
        }
  
// Toggle state 
        for (let section of sections) {
            section.addEventListener('active', function () {
                const ISONSCREEN = isOnScreen(this, -300);
                const navLink = document.querySelectorAll(`[data-link="${this.dataset.nav}"]`)[0];
                if (ISONSCREEN) {
                    this.classList.add('active');
                    navLink.classList.add('link__active');
                } else {
                    this.classList.remove('active');
                    navLink.classList.remove('link__active');
                }
            })
        }
    


    // check is element in the viewport
   function isOnScreen (element, offset) {
        offset = typeof offset === 'undefined' ? 0 : offset;
        const bounding = element.getBoundingClientRect();

        if (bounding.top >= offset && bounding.left >= offset &&
            bounding.right <=

            ((window.innerWidth || document.documentElement.clientWidth) - offset) &&
            bounding.bottom <=
            ((window.innerHeight || document.documentElement.clientHeight) - offset)) {
            return true
        } else {
            return false;
        }
	}
    

   
