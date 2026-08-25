import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/zoom";

export default function ImageCarousel({ images }) {
  if (!images?.length) return null;
  const firstImage = images[0];
  const computedRatio =
    firstImage.width && firstImage.height
      ? `${firstImage.width}/${firstImage.height}`
      : "4/5";
  return (
    <div className="w-full  rounded-xl">
      <Swiper
        modules={[Pagination, Navigation, Zoom]}
        zoom={{ maxRatio: 3 }}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        className="w-full "
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div
              className="swiper-zoom-container w-full "
              style={{ aspectRatio: computedRatio }}
            >
              <img
                src={src.url}
                alt={src.publicId}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
