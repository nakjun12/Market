import { getPublishedPosts } from "@/api/marketApi";
import Loading from "@/components/Loading";
import useModalStore from "@/utils/hooks/store/useModalStore";
import styled from "@emotion/styled";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// 상품 리스트를 보여주는 공용 컴포넌트
const ProductList = (props) => {
  const { keyword } = props;
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [showTopButton, setShowTopButton] = useState(false); // "맨 위로 가기" 버튼의 표시 여부를 제어하는 상태
  const { openModal, closeModal } = useModalStore();
  const observer = useRef();

  const getProductList = async ({ pageParam = 1 }) => {
    // pageParam : useInfiniteQuery의 getNextPageParam에서 반환해준 값 (=다음 불러올 페이지)
    const resData = await getPublishedPosts({
      page: pageParam !== 1 ? pageParam : 1, // 1 페이지가 아니면 nextPage(현재+1 된 값)을 호출
      limit: 20,
      query: keyword ? keyword : "",
      orderBy: "createdAt",
      direction: "asc"
    });

    const { page, lastPage, data: responseData } = resData.data;
    setProductList((prevList) => [...prevList, ...responseData]);

    // return은 아래 useInfiniteQuery에서 getNextPageParam으로 전달
    // page 뜻을 전달하기 위해 이름 curPage로 전달
    return { curPage: page, lastPage };
  };

  const { error, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["productList"],
    queryFn: getProductList,
    // 위의 getPublishedPosts 결과값으로 얻은 page (현재 받아온 페이지) , lastpage (총 페이지)
    getNextPageParam: ({ curPage, lastPage }) => {
      // 마지막 페이지인 경우에는 더 이상 호출 불필요 , 마지막 페이지보다 전이면 +1 해준다
      // 여기서 return 하는 값은 pageParam으로 전달 됨
      return curPage < lastPage ? curPage + 1 : null;
    }
  });

  const observerOption = {
    root: null,
    threshold: 0.5,
    rootMargin: "0px"
  };

  const lastProductRef = useCallback(
    // Intersection Observer를 사용하여 마지막 상품이 보여질 때를 감지
    (node) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          // 현재 ref가 활성화 상태 && 다음 페이지가 있는 경우
          setShowTopButton(true);
          fetchNextPage();
        }
      }, observerOption);

      if (node) {
        observer.current.observe(node);
      }
    },
    [fetchNextPage, hasNextPage]
  );

  const scrollToTop = () => {
    // top 버튼 누르면 최상단으로 이동
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    // 초기 데이터 로딩

    const handleTop = () => {
      // 스크롤이 제일 상단에 가면 top 버튼 안 보이게 처리
      const isTop = window.scrollY === 0;
      setShowTopButton(!isTop);
    };

    window.addEventListener("scroll", handleTop);

    return () => {
      window.removeEventListener("scroll", handleTop);
    };
  }, [keyword]);

  useEffect(() => {
    // 추후에 조건 풀 지 확인해보기
    if (error && !error.response?.status === 401) {
      console.error("상품 불러오기 실패:", error);
      const customContent = (
        <div className="modal-box">
          <h3 className="font-bold text-lg">상품을 가져올 수 없습니다.</h3>
          <p className="py-4"> 다시 시도해 주시기 바랍니다.</p>
          <div className="modal-action">
            <button className="btn" onClick={closeModal}>
              확인
            </button>
          </div>
        </div>
      );
      openModal(customContent);
    }
  }, [error]);

  return (
    <div>
      <ProductListWrap>
        {isFetching && <Loading />}
        {productList && productList.length > 0 ? (
          <>
            <CardWrap>
              {productList.map((product, index) => (
                <Card
                  key={index}
                  ref={index === productList.length - 1 ? lastProductRef : null}
                  onClick={() => navigate(`/web/product/${product.id}`)}>
                  <CardImg src={product.imgUrls[0]} alt={product.title} />
                  <ProductBadge>{product.location}</ProductBadge>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductPrice>{product.price}원</ProductPrice>
                </Card>
              ))}
            </CardWrap>
            <TopButton
              className="btn btn-neutral"
              show={showTopButton}
              onClick={isFetching ? () => {} : scrollToTop}>
              TOP
            </TopButton>
          </>
        ) : (
          <div>
            {!productList?.length && !isFetching && (
              <NoticeMsg>
                {`${keyword ? "검색 결과가" : "상품이"} 없습니다.`}
              </NoticeMsg>
            )}
          </div>
        )}
      </ProductListWrap>
    </div>
  );
};

export default ProductList;

const ProductListWrap = styled.div`
  padding: 20px;
`;

const CardWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 30px;
`;

const Card = styled.div`
  width: 180px;
  margin: 7px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const CardImg = styled.img`
  width: 160px;
  height: 120px;
  background-size: cover;
  border-radius: 12px;
  margin-bottom: 5px;
`;

const ProductBadge = styled.div`
  width: 50px;
  height: 20px;
  background-color: #5cb8bc;
  color: white;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 10px 0 0 0;
`;

const ProductPrice = styled.div`
  font-size: 14px;
`;

const ProductTitle = styled.h1`
  font-size: 16px;
  font-weight: 700;
  margin: 5px 0;
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
