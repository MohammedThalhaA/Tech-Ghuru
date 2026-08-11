//  const coords = { x: 0, y: 0 };
//       const circles = document.querySelectorAll(".circle1");
//       const colors = [
//         "#00FFFF",
//         "#00FFFF",
//         "#00AEFF",
//         "#00AEFF",
//         "#00DE94",
//         "#00DE94",
//         "#00FF52",
//         "#00FF52",
//         "#89F336",
//         "#89F336",
//         "#384711",
//         "#384711",
//         "#F23598",
//         "#F23598",
//         "#17edff",
//         "#17edff",
//         "#28f4ff",
//         "#28f4ff",
//         "#40fafa",
//         "#40fafa",
//         "#40fafa",
//         "#50fef3",
//         "#50fef3",
//         "#50fef3",
//         "#56fff1",
//         "#56fff1",
//       ];
//       //      blue theme
//       //     ["#384472",
//       //     "#3c507b",
//       //     "#415c84",
//       //     "#48688c",
//       //     "#517494",
//       //     "#5c809b",
//       //     "#688ca2",
//       //     "#7598aa",
//       //     "#83a4b1",
//       //     "#92afb8",
//       //     "#a2bbc0",
//       //     "#b2c6c9"
//       // ]
//       // Initialize circle positions
//       circles.forEach(function (circle, index) {
//         circle.x = 0;
//         circle.y = 0;

//         circle.style.backgroundColor = colors[index % colors.length];
//       });

//       window.addEventListener("mousemove", function (e) {
//         coords.x = e.clientX;
//         coords.y = e.clientY;
//       });

//       //click event
//       window.addEventListener("click", () => {
//         circles.forEach((circle) => {
//           circle.style.transform = "scale(1.5)";
//         });
//         setTimeout(() => {
//           circles.forEach((circle) => {
//             circle.style.transform = "scale(1)";
//           });
//         }, 200);
//       });

//       //Hover event
//       window.addEventListener("mouseover", () => {
//         circles.forEach((circle) => {
//           circle.style.transform = "scale(1.5)";
//         });
//         setTimeout(() => {
//           circles.forEach((circle) => {
//             circle.style.transform = "scale(1)";
//           });
//         }, 200);
//       });

//       function animateCircles() {
//         let x = coords.x;
//         let y = coords.y;

//         circles.forEach(function (circle, index) {
//           circle.style.left = circle.x - 16 + "px";
//           circle.style.top = circle.y - 16 + "px";

//           circle.style.scale = (circles.length - index) / circles.length;

//           circle.x = x;
//           circle.y = y;

//           const nextCircle = circles[index + 1] || circles[0];

//           x += (nextCircle.x - x) * 0.2;
//           y += (nextCircle.y - y) * 0.2;
//         });

//         requestAnimationFrame(animateCircles);
//       }
//       animateCircles();
