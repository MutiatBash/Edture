import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import arrowright from "/icons/arrow-right.svg";
import arrowleft from "/icons/arrow-left.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
	<div
		className="bg-white shadow absolute -right-5 top-1/2 transform -translate-y-1/2 p-1 z-10 rounded-full cursor-pointer"
		onClick={onClick}
	>
		<img src={arrowright} />
	</div>
);

const PrevArrow = ({ onClick }) => (
	<div
		className="bg-white shadow absolute -left-5 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-full cursor-pointer"
		onClick={onClick}
	>
		<img src={arrowleft} />
	</div>
);

const CourseCarousel = ({ children }) => {
	const settings = {
		infinite: false,
		speed: 500,
		slidesToShow: 3.25,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3.25,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className="course-carousel">
			<Slider {...settings}>{children}</Slider>
		</div>
	);
};

export default CourseCarousel;
