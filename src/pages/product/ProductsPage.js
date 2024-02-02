import { getPublishedPosts } from "@/api/marketApi";
import ProductList from "./components/ProductList";
import styled from "@emotion/styled";
import { useState } from "react";

// 처음 진입하면 보이는 메인 페이지
// api를 호출하여 ProcudtList에 정보를 넘겨서 보여주도록 함
// 스크롤을 통해 더 많은 상품을 동적으로 로드

export default function ProductsPage() {
  const [productList, setProductList] = useState([]);
  const keyword = null;
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
      <ProductPageText>원하시는 상품을 찾아보세요.</ProductPageText>

      <ProductList
        getProductList={getProductList}
        productList={productList}
        keyword={keyword}
      />
    </div>
  );
}

const ProductPageText = styled.h1`
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.8);
`;
