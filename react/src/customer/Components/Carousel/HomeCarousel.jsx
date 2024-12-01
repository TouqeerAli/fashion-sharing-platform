import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCaroselData";
import { useNavigate } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const HomeCarousel = () => {
  const navigate = useNavigate();

  // Prepare carousel items with responsive styling
  const items = homeCarouselData.map((item) => (
    <img
      key={item.id}
      className="carousel-item"
      onClick={() => navigate(item.path)}
      src={item.image}
      alt=""
      onDragStart={handleDragStart}
      role="presentation"
      style={{
        width: "100%",
        height: "auto",
        maxHeight: "570px", // Optional: Limit the maximum height
        objectFit: "cover",
        borderRadius: "10px",
      }}
    />
  ));

  // Set responsive configuration to always show one item
  const responsive = {
    0: { items: 1 },
    576: { items: 1 },
    768: { items: 1 },
    1024: { items: 1 },
  };

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      responsive={responsive}
      autoPlay
      infinite
      autoPlayInterval={2000}
      disableButtonsControls
    />
  );
};

export default HomeCarousel;
