// ProductSearchResult.js

import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import ProductList from "./components/ProductList";
import { getPublishedPosts } from "@/api/marketApi";
import { useState } from "react";

const ProductSearchResultPage = () => {
  const { keyword } = useParams(); // 검색어
  const [productList, setProductList] = useState([]);

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

  return (
    <div>
      <SearchResultText>
        다음은 <span style={{ color: "black" }}>{keyword}</span>에 대한 검색
        결과입니다.
      </SearchResultText>

      <ProductList
        getProductList={getProductList}
        productList={productList}
        keyword={keyword}
        queryKey={["HomeProductList"]}
      />
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
