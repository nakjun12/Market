import React, { useEffect, useRef, useCallback } from "react";
import styled from "@emotion/styled";
import { useState } from "react";

// 상품 리스트를 보여주는 공용 컴포넌트

const ProductList = ({ productList, fetchMoreData, loading, hasMore }) => {
  // Intersection Observer를 사용하여 마지막 상품이 보여질 때를 감지
  const observer = useRef();
  // "맨 위로 가기" 버튼의 표시 여부를 제어하는 상태
  const [showTopButton, setShowTopButton] = useState(false);

  // 마지막 상품에 대한 콜백, Intersection Observer와 함께 사용
  const lastProductRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreData();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, fetchMoreData]
  );

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 300) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ProductListWrap>
      {productList && productList.length > 0 ? (
        <>
          <CardWrap>
            {productList.map((product, index) => {
              if (productList.length === index + 1) {
                return (
                  <Card
                    key={index}
                    ref={lastProductRef}
                    className="productCard"
                    // onClick={() => handleProductPage(product.id)}
                  >
                    {/* 추후에 상품 디테일 페이지에 연결 ! */}
                    <CardImg src={product.imgUrl} alt={product.title} />
                    <ProductTitle>{product.title}</ProductTitle>
                  </Card>
                );
              } else {
                return (
                  <Card
                    key={index}
                    className="productCard"
                    // onClick={() => handleProductPage(product.id)}
                    /* 추후에 상품 디테일 페이지에 연결 ! */
                  >
                    <CardImg src={product.imgUrl} alt={product.title} />

                    <ProductBadge>{product.content}</ProductBadge>
                    <ProductTitle>{product.title}</ProductTitle>
                  </Card>
                );
              }
            })}
          </CardWrap>
          <TopButton
            className="btn btn-neutral"
            show={showTopButton}
            onClick={scrollToTop}>
            TOP
          </TopButton>
        </>
      ) : (
        <NoticeMsg>
          {productList ? "상품이 없습니다." : "상품을 불러오는 중입니다..."}
        </NoticeMsg>
      )}
    </ProductListWrap>
  );
};

export default ProductList;

const ProductListWrap = styled.div`
  padding: 20px;
`;

const CardWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 48%;
  margin: 1%;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const CardImg = styled.img`
  border-radius: 12px;
  margin-bottom: 5px;
`;

const ProductBadge = styled.div`
  width: 100px;
  height: 24px;
  background-color: #5cb8bc;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-bottom: 4px;
`;

const ProductTitle = styled.h1`
  font-size: 16px;
  font-weight: 700;
`;

const NoticeMsg = styled.p`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  padding: 20px;
`;

const TopButton = styled.button`
  position: fixed;
  z-index: 1;
  bottom: 30px;
  right: 10px;
  border-radius: 50px;
  opacity: 0.8;
  display: ${(props) => (props.show ? "block" : "none")};
`;
