// import Swiper core and required modules
import {
  A11y,
  Autoplay,
  Keyboard,
  Mousewheel,
  Pagination
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageSwiperSlide from "./ImageSwiperSlide";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "swiper/css/scrollbar";

/**
 * 캐러셀을 통해 한 번에 하나의 이미지를 보여주고, 다양한 이미지를 순차적으로 확인할 수 있습니다
 *
 * 키보드와 마우스 휠로 제어 가능하며, 클릭 가능한 페이지네이션을 포함합니다.
 * 캐러셀은 무한으로 반복되며, 접근성 기능이 활성화되어 있습니다.
 *
 * @component
 * @param {Object} props - 컴포넌트 프로퍼티.
 * @param {Array} props.images - 캐러셀에서 표시할 이미지 URL 배열.
 * @returns {ReactElement} - 각 이미지에 대한 슬라이드가 있는 Swiper 캐러셀.
 *
 * @example
 * const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
 * <ProductImageCarousel images={images} />
 */
const ProductImageCarousel = ({ images }) => {
  return (
    <Swiper
      // Swiper 모듈 추가
      modules={[Keyboard, Pagination, A11y, Mousewheel, Autoplay]}
      // 한 번에 하나의 슬라이드를 표시
      slidesPerView={1}
      // 마진 상단 추가 및 z-index 설정
      className="mt-4 z-0"
      // 클릭 가능한 페이지네이션 인디케이터 활성화
      pagination={{ clickable: true }}
      // 키보드 제어 설정 구성
      keyboard={{
        enabled: true, // 키보드 제어 활성화
        onlyInViewport: true, // 스와이퍼가 뷰포트에 있을 때만 작동
        pageUpDown: true // Page Up/Down 키 사용 허용
      }}
      loop={true} // 연속 루프 모드 활성화
      grabCursor={true} // 호버 시 그랩 커서 표시
      // 접근성 설정
      accessibility={{ enabled: true }}
      // 마우스휠 제어 민감도 구성
      mousewheel={{
        sensitivity: 1 // 마우스 휠 민감도
      }}
      lazy="true" // 이미지에 대한 레이지 로딩 활성화
      speed={400} // 전환 속도(밀리초)
      autoplay={{
        delay: 2500, // 2.5초 마다 자동 재생
        disableOnInteraction: true, // 사용자 상호작용 후 자동 재생 비활성화
        pauseOnMouseEnter: true // 마우스 포인터가 캐러셀 위에 있을 때 자동 재생 일시 정지
      }}
      // 스와이퍼 인스턴스 접근 및 이벤트 핸들링을 위해 아래 주석 해제
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log("슬라이드 변경")}
      // onLazyImageLoad={(swiper, slideEl, imageEl) => {
      //   console.log(swiper, slideEl, "이미지 로드됨", imageEl);
      // }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <ImageSwiperSlide image={image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductImageCarousel;
