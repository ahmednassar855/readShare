import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
 import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
// import required modules
import { EffectCoverflow, Pagination  , FreeMode, Navigation, Thumbs , Autoplay } from "swiper/modules";
 

export default function TopFive({topBooks}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  console.log(topBooks);
  return (
    <>
       <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          boxShadow:'3px 3px red, -1em 0 .4em olive',
          backgroundColor :'gray'
        }}
        loop={true}
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation , FreeMode ,Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
         className="mySwiper"
      >
        {topBooks?.topBooks?.length ? (
          topBooks?.topBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <img src={`http://localhost:5000/books/${book?.photo}`} width={'300px'} height={'300px'}  alt={book.name}/>
              <p>{book.name}</p>
            </SwiperSlide>
          ))
        ) : (
          <tr>
            <td className="fw-bold" colSpan={6}>
              No Non Returned Books Found
            </td>{" "}
          </tr>
        )}
      </Swiper>
      
    </>
  );
}
