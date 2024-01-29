// ProductSearchResult.js

import styled from "@emotion/styled";
import { getPublishedPosts } from "@/api/marketApi";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ProductList from "./components/ProductList";

const ProductSearchResultPage = () => {
  const { keyword } = useParams(); // 검색어
  const [productList, setProductList] = useState(); // 넘겨줄 상품 리스트 배열
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
        limit: 16,
        query: keyword ? keyword : "",
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
    searchApi(keyword);
  }, [keyword]);

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

  const searchApi = async (keyword) => {
    try {
      const resData = await getPublishedPosts({
        page: 1,
        limit: 10,
        query: keyword ? keyword : "",
        orderBy: "createdAt",
        direction: "asc"
      });

      setProductList(resData.data.data);
    } catch (error) {
      console.error("검색 API 호출 실패:", error);
    }
  };

  return (
    <div>
      <SearchResultText>
        다음은 <span style={{ color: "black" }}>{keyword}</span>에 대한 검색
        결과입니다.
      </SearchResultText>

      <ProductList
        productList={productList}
        fetchMoreData={fetchMoreData}
        loading={loading}
        hasMore={hasMore}
      />

      <div ref={loaderRef}></div>
    </div>
  );
};

export default ProductSearchResultPage;

const SearchResultText = styled.h1`
  text-align: center;
  margin-top: 10px;
  padding: 20px;
  font-size: 18px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
`;
