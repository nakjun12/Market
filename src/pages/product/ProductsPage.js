import { useEffect } from "react";
import ProductList from "./components/ProductList";
import styled from "@emotion/styled";
import { useState } from "react";
import { useRef } from "react";
import { getPublishedPosts } from "@/api/marketApi";

// 처음 진입하면 보이는 메인 페이지
// api를 호출하여 ProcudtList에 정보를 넘겨서 보여주도록 함
// 스크롤을 통해 더 많은 상품을 동적으로 로드
export default function ProductsPage() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  const fetchMoreData = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const resData = await getPublishedPosts({
        page: page !== 1 ? page + 1 : page,
        limit: 10,
        query: "",
        orderBy: "createdAt",
        direction: "asc"
      });

      if (resData.data.data.length > 0) {
        setProductList((prevList) => [...prevList, ...resData.data.data]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("데이터 추가 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (loaderRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = loaderRef.current;

        if (scrollHeight - scrollTop === clientHeight) {
          fetchMoreData();
        }
      }
    };

    if (loaderRef.current) {
      // 값이 없는 경우(null) 페이지 이동 시 에러 발생하기 때문에 null이 아닐때만 동작하도록 함
      loaderRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (loaderRef.current) {
        loaderRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [fetchMoreData]);

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <div>
      <ProductPageText>원하시는 상품을 찾아보세요.</ProductPageText>

      <ProductList
        productList={productList}
        fetchMoreData={fetchMoreData}
        loading={loading}
        hasMore={hasMore}
      />

      {loading && <div>로딩 중...</div>}
      {!loading && !hasMore && <div>더 이상 아이템이 없습니다.</div>}
      <div ref={loaderRef}></div>
    </div>
  );
}

const ProductPageText = styled.h1`
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  font-weight: 700;
`;
