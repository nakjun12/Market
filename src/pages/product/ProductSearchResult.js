import styled from "@emotion/styled";
import { getPublishedPosts } from "@/api/marketApi";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductList from "./components/ProductList";

const ProductSearchResult = () => {
  // useParams 훅을 사용하여 동적 파라미터를 추출
  const { keyword } = useParams();
  const [productData, setProductData] = useState();
  const [productList, setProductList] = useState();

  const SearchResultText = styled.h1`
    text-align: center;
    margin-top: 10px;
    padding: 20px;
    font-size: 18px;
    font-weight: 700;
  `;

  const searchApi = async (keyword) => {
    try {
      const resData = await getPublishedPosts({
        page: 1,
        limit: 10,
        query: keyword ? keyword : "",
        orderBy: "createdAt",
        direction: "asc"
      });

      console.log("kyj resData::", resData);
      setProductData(resData.data);
      setProductList(resData.data.data);
    } catch (error) {
      console.error("검색 API 호출 실패:", error);
      // 에러 처리 로직을 추가할 수 있습니다.
    }
  };

  useEffect(() => {
    console.log("리스트 Update !", productList);
  }, [productList]);

  useEffect(() => {
    searchApi(keyword);
  }, []);

  return (
    <div>
      <SearchResultText>
        {" "}
        다음은 <span style={{ color: " rgb(251 146 60)" }}>{keyword}</span>에
        대한 검색 결과입니다.
      </SearchResultText>
      {/* 검색 결과 표시 등의 내용 추가 */}

      <ProductList productList={productList} />
    </div>
  );
};
export default ProductSearchResult;
