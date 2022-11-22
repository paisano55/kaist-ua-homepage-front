import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import * as bannersAPI from "../../lib/api/banner";

import { CarouselItem } from "../molecules";

const HomeCarousel = props => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    bannersAPI.list().then(res => {
      setBanners(res.data);
    });
  }, []);

  const CarouselItemList = banners.length
    ? banners.map(banner =>
      banner.isActive &&
        banner.image.startsWith(process.env.REACT_APP_BANNER_URL) ? (
        <CarouselItem key={banner.id} src={banner.image} href={banner.link} />
      ) : null // The CarouselItem differentiates b/w YT livestream and banner.
    )
    : null;

  return (
    <Carousel interval={4000} className={props.className} indicators={false}>
      {CarouselItemList}
    </Carousel>
  );
};

export default HomeCarousel;
