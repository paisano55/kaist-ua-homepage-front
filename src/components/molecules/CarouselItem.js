import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselItem = props => {
  const carouselItem = (props.alt == "Youtube Livestream (EMBED)") ?
    <Carousel.Item className={props.className} >
      <iframe className="d-block w-100" width="100%" height="100%" src="https://www.youtube.com/embed/live_stream?channel=UCOyNLfCKA5k0PotGj4xTPmg" frameborder="0" allowfullscreen></iframe>
    </Carousel.Item> :
    <Carousel.Item className={props.className} >
      <a href={props.href}>
        <img
          style={{ margin: "auto" }}
          className="d-block w-100"
          src={props.src}
          alt={props.alt}
        />
      </a>
    </Carousel.Item>;

  return carouselItem;
};

export default CarouselItem;
