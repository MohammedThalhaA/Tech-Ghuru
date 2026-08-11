(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    // number counter increase
    let counterSectionsAnimated = new Set();

    function animateCounter(counter) {
      const target = +counter.getAttribute('data-target');
      if (isNaN(target)) return;
      const increment = Math.max(1, target / 100);
      let count = 0;

      function updateCounter() {
        if (count < target) {
          count += increment;
          counter.innerText = `${Math.ceil(count)}`;
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = `${target}`;
        }
      }

      updateCounter();
    }

    function handleCounterScroll() {
      const sections = document.querySelectorAll('.counter-section, .stats-section, #stats');
      sections.forEach(section => {
        if (!counterSectionsAnimated.has(section)) {
          const rect = section.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (rect.top < windowHeight && rect.bottom > 0) {
            counterSectionsAnimated.add(section);
            const sectionCounters = section.querySelectorAll('.counter');
            sectionCounters.forEach(counter => animateCounter(counter));
          }
        }
      });
    }

    window.addEventListener('scroll', handleCounterScroll);
    document.addEventListener('DOMContentLoaded', handleCounterScroll);
    window.addEventListener('load', handleCounterScroll);
    
    let lastPathname = typeof window !== 'undefined' ? window.location.pathname : '';
    setInterval(() => {
      if (typeof window !== 'undefined' && window.location.pathname !== lastPathname) {
        lastPathname = window.location.pathname;
        counterSectionsAnimated.clear();
        handleCounterScroll();
      }
    }, 500);
    // End num counter increase//

    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:4
            },
            768:{
                items:6
            },
            992:{
                items:8
            }
        }
    });
    
})(jQuery);

 const messageIcon = document.getElementById("messageIcon");
const contactIcons = document.getElementById("contactIcons");

if (messageIcon && contactIcons) {
  messageIcon.addEventListener("click", () => {
    messageIcon.classList.toggle("rotate");
    contactIcons.classList.toggle("show");
  });
}
  

 // Cursor Design ///

     let coords = { x: 0, y: 0 };
      let circles = document.querySelectorAll(".circle");
      let colors = [
        // "#00FFFF",
        // "#00FFFF",
        // "#00AEFF",
        // "#00AEFF",
        // "#00DE94",
        // "#00DE94",
        // "#00FF52",
        // "#00FF52",
        // "#89F336",
        // "#89F336",
        // "#384711",
        // "#384711",
        // "#40fafa",
        // "#40fafa",
        // "#17edff",
        // "#17edff",
        // "#28f4ff",
        // "#28f4ff",
        // "#40fafa",
        // "#40fafa",
        // "#40fafa",
        // "#50fef3",
        // "#50fef3",
        // "#50fef3",
        // "#56fff1",
        // "#56fff1",
         "#0081C5", "#0081C5", // Deep sky blue
  "#0087CB", "#0087CB", // Cerulean
  "#0082C6", "#0082C6", // Bright azure
  "#66C2FF", "#66C2FF", // Soft accent blue
  "#A9DFFF", "#A9DFFF", // Light sky blue
  "#E0F7FF", "#E0F7FF", // Pale blue (not white)
  "#004A75", "#004A75", // Deep navy blue
  "#3399FF", "#3399FF", // Vivid blue
  "#007ACC", "#007ACC", // Medium-dark blue
  "#99CCFF", "#99CCFF", // Light azure
  "#66B2FF", "#66B2FF", // Gentle bright blue
  "#5FA8D3", "#5FA8D3", // Ocean blue
  "#4F9EDC", "#4F9EDC", // Cool tone blue
      ];
      //      blue theme
      //     ["#384472",
      //     "#3c507b",
      //     "#415c84",
      //     "#48688c",
      //     "#517494",
      //     "#5c809b",
      //     "#688ca2",
      //     "#7598aa",
      //     "#83a4b1",
      //     "#92afb8",
      //     "#a2bbc0",
      //     "#b2c6c9"
      // ]
      // Initialize circle positions
      circles.forEach(function (circle, index) {
        circle.x = 0;
        circle.y = 0;

        circle.style.backgroundColor = colors[index % colors.length];
      });

      window.addEventListener("mousemove", function (e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
      });

      //click event
      window.addEventListener("click", () => {
        circles.forEach((circle) => {
          circle.style.transform = "scale(1.5)";
        });
        setTimeout(() => {
          circles.forEach((circle) => {
            circle.style.transform = "scale(1)";
          });
        }, 200);
      });

      //Hover event
      window.addEventListener("mouseover", () => {
        circles.forEach((circle) => {
          circle.style.transform = "scale(1.5)";
        });
        setTimeout(() => {
          circles.forEach((circle) => {
            circle.style.transform = "scale(1)";
          });
        }, 200);
      });

      function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach(function (circle, index) {
          circle.style.left = circle.x - 16 + "px";
          circle.style.top = circle.y - 16 + "px";

          circle.style.scale = (circles.length - index) / circles.length;

          circle.x = x;
          circle.y = y;

          const nextCircle = circles[index + 1] || circles[0];

          x += (nextCircle.x - x) * 0.2;
          y += (nextCircle.y - y) * 0.2;
        });

        requestAnimationFrame(animateCircles);
      }
      animateCircles();


   const animateParagraph = (para) => {
      const text = para.textContent;
      para.textContent = "";
      para.style.visibility = "visible";

      text.split("").forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        para.appendChild(span);
        setTimeout(() => {
          span.classList.add("visible");
        }, i * 15);
      });
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const para = entry.target;
          animateParagraph(para);
          obs.unobserve(para);
        }
      });
    }, {
      threshold: 0.5,
    });

    document.querySelectorAll("[data-animate]").forEach(para => {
      observer.observe(para);
    });

//     $('.vendor-carousel').owlCarousel({
//     loop: true,
//     margin: 30,
//     autoplay: true,
//     autoplayTimeout: 0, // no delay between cycles
//     autoplaySpeed: 5000, // controls the scrolling speed (higher = slower)
//     smartSpeed: 5000, // same as above
//     autoplayHoverPause: false,
//     responsive: {
//         0: { items: 2 },
//         576: { items: 3 },
//         768: { items: 4 },
//         992: { items: 5 },
//         1200: { items: 6 }
//     }
// });

const button = document.querySelector(".readmorebtn");
const container = document.querySelector(".hidden-sections");

let isVisible = false;

if (button && container) {
  button.addEventListener("click", () => {
    if (!isVisible) {
      container.style.display = "flex";

      // Delay to trigger transition
      setTimeout(() => {
        container.classList.add("show");
      }, 50);

      button.textContent = "Show Less";
    } else {
      container.classList.remove("show");

      // Wait for animation to complete, then hide
      setTimeout(() => {
        container.style.display = "none";
      });

      button.textContent = "Read More";
    }

    isVisible = !isVisible;
  });
}


//   $('.vendor-carousel').owlCarousel({
//     loop: true,
//     margin: 30,
//     autoplay: true,
//     autoplayTimeout: 0, // set to 0 for continuous movement
//     autoplaySpeed: 0, // slow, continuous speed
//     autoplayHoverPause: false,
//     smartSpeed: 5000, // smooth transition speed
//     responsive: {
//         0: {
//             items: 2
//         },
//         600: {
//             items: 4
//         },
//         1000: {
//             items: 6
//         }
//     }
// });





class LogosMarquee {
	constructor(container, speed = 80) {
		this.container = container;
		this.track = container.querySelector(".marquee__track");
		this.speed = speed;

		if (!this.container || !this.track) {
			return;
		}

		// Mark container as initialized
		this.container.dataset.marqueeInitialized = "true";

		this.trackWidth = 0;
		this.pos = 0;
		this.start = null;
		this.rafId = null;

		// Poll for width in case images/styles are still loading
		const checkWidth = () => {
			if (!document.body.contains(this.container)) {
				return;
			}
			this.trackWidth = this.track.getBoundingClientRect().width;
			if (this.trackWidth > 50) { // Check for a reasonable minimum width
				this.setup();
				this.animate = this.animate.bind(this);
				this.rafId = requestAnimationFrame(this.animate);
			} else {
				setTimeout(checkWidth, 100);
			}
		};
		checkWidth();
	}

	setup() {
		// Clean up duplicate tracks if any
		const tracks = this.container.querySelectorAll(".marquee__track");
		for (let i = 1; i < tracks.length; i++) {
			tracks[i].remove();
		}

		// Clone the first track to create a visual loop
		this.clone = this.track.cloneNode(true);
		this.clone.setAttribute("aria-hidden", "true");
		this.container.appendChild(this.clone);

		// Apply styles to ensure horizontal alignment
		this.container.style.width = `${this.trackWidth * 2}px`;
		this.container.style.display = "flex";
		this.container.style.flexWrap = "nowrap";
		this.container.style.willChange = "transform";
	}

	animate(timestamp) {
		if (!this.container || !document.body.contains(this.container)) {
			this.destroy();
			return;
		}

		if (!this.start) this.start = timestamp;

		const elapsed = timestamp - this.start;
		this.pos = -(elapsed / 1000) * this.speed;

		if (Math.abs(this.pos) >= this.trackWidth) {
			this.start = timestamp;
			this.pos = 0;
		}

		this.container.style.transform = `translateX(${this.pos}px)`;
		this.rafId = requestAnimationFrame(this.animate);
	}

	destroy() {
		if (this.rafId) {
			cancelAnimationFrame(this.rafId);
		}
	}
}

function initMarquees() {
	const containers = document.querySelectorAll(".marquee__ctn:not([data-marquee-initialized])");
	containers.forEach(container => {
		new LogosMarquee(container, 60);
	});
}

// Run initializations
if (document.readyState === "complete" || document.readyState === "interactive") {
	initMarquees();
} else {
	window.addEventListener("DOMContentLoaded", initMarquees);
}
window.addEventListener("load", initMarquees);

// Observe DOM updates for SPA route transitions
if (typeof window !== "undefined") {
	const observer = new MutationObserver(() => {
		initMarquees();
	});
	observer.observe(document.body, {
		childList: true,
		subtree: true
	});
}
