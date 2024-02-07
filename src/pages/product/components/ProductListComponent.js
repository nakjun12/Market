import styled from "@emotion/styled";
import { useState } from "react";
import ProductList from "./ProductList";

// 처음 진입하면 보이는 메인 페이지
// api를 호출하여 ProcudtList에 정보를 넘겨서 보여주도록 함
// 스크롤을 통해 더 많은 상품을 동적으로 로드

export default function ProductsListComponent({
  title,
  param,
  apiCallback,
  queryKey
}) {
  const [productList, setProductList] = useState([]);
  const keyword = null;
  const getProductList = async () => {
    // pageParam : useInfiniteQuery의 getNextPageParam에서 반환해준 값 (=다음 불러올 페이지)
    const resData = await apiCallback(param);

    const { page, lastPage, data: responseData } = resData.data;
    setProductList((prevList) => [...prevList, ...responseData]);

    // return은 아래 useInfiniteQuery에서 getNextPageParam으로 전달
    // page 뜻을 전달하기 위해 이름 curPage로 전달
    return { curPage: page, lastPage };
  };

  return (
    <div>
      <ProductPageText>{title}</ProductPageText>

      <ProductList
        getProductList={getProductList}
        productList={productList}
        keyword={keyword}
        queryKey={queryKey}
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
