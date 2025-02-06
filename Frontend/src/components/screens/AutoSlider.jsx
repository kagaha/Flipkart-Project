// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const AutoSlider = () => {
//   const settings = {
//     dots: true, // Show navigation dots
//     infinite: true, // Loop infinitely
//     speed: 1000, // Transition speed (1 second)
//     slidesToShow: 1, // Show one slide at a time
//     slidesToScroll: 1, // Scroll one slide at a time
//     autoplay: true, // Enable automatic sliding
//     autoplaySpeed: 3000, // Slide change every 3 seconds
//     arrows: true, // Show next/prev arrows
//   };

//   return (
//     <div className="w-screen max-w-3xl mx-auto mt-10 relative">
//       <Slider {...settings}>
//         <div>
//           <img
//             src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/c928b14a5cddaf18.jpg?q=20"
//             alt="Slide 1"
//             className="w-full h-auto rounded-lg"
//           />
//         </div>
//         <div>
//           <img
//             src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/21c72584989b09a9.jpg?q=20"
//             alt="Slide 2"
//             className="w-full h-auto rounded-lg"
//           />
//         </div>
//         <div>
//           <img
//             src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/8e7184a61e310df4.jpg?q=20"
//             alt="Slide 3"
//             className="w-full h-auto rounded-lg"
//           />
//         </div>
//         <div>
//           <img
//             src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/8e7184a61e310df4.jpg?q=20"
//             alt="Slide 3"
//             className="w-full h-auto rounded-lg"
//           />
//         </div>
//       </Slider>
//     </div>
//   );
// };

// export default AutoSlider;






import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AutoSlider = () => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop infinitely
    speed: 1000, // Transition speed (1 second)
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 3000, // Slide change every 3 seconds
    arrows: false, // Hide arrows for cleaner UI
  };

  const images = [
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/21c72584989b09a9.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/c928b14a5cddaf18.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/8e7184a61e310df4.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/8e7184a61e310df4.jpg?q=20",

  ];

  return (
    <div className="w-screen max-w-screen-xl mx-auto mt-5">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img src={src} alt={`Slide ${index + 1}`} className="w-full h-auto rounded-lg" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AutoSlider;

