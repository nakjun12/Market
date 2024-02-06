/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

/**
 * 이미지를 16:9 비율로 표시하는 슬라이더 슬라이드 컴포넌트입니다.
 * @emotion/react의 css 함수를 사용하여 Emotion 스타일을 적용합니다.
 *
 * @component
 * @param {Object} props - 컴포넌트 프로퍼티.
 *  @param {string} props.image - 슬라이드에 표시할 이미지의 URL.
 * @returns {ReactElement} - 스타일이 적용된 이미지를 포함하는 div 요소.
 *
 * @example
 * <ImageSwiperSlide image="image-url.jpg" />
 */
const ImageSwiperSlide = ({ image }) => {
  return (
    <div css={containerStyle}>
      <img src={image} alt="설명" css={imageStyle} />
    </div>
  );
};

export default ImageSwiperSlide;

// 컨테이너에 대한 Emotion 스타일 정의
const containerStyle = css`
  width: 100%; // 컨테이너 너비를 100%로 설정
  padding-top: 56.25%; // 16:9 비율의 높이를 설정
  position: relative; // 자식 요소를 절대 위치로 배치하기 위한 상대 위치 설정
`;

// 이미지에 대한 Emotion 스타일 정의
const imageStyle = css`
  position: absolute; // 부모 요소(container) 내에서 절대 위치 설정
  top: 0; // 상단에서 0px 위치
  left: 0; // 좌측에서 0px 위치
  width: 100%; // 이미지 너비를 100%로 설정
  height: 100%; // 이미지 높이를 100%로 설정
  object-fit: cover; // 컨테이너를 가득 채우면서 이미지 비율을 유지하도록 설정
`;
