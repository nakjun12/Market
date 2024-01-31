// ProductSearchResult.js

import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import ProductList from "./components/ProductList";

const ProductSearchResultPage = () => {
  const { keyword } = useParams(); // 검색어

  return (
    <div>
      <SearchResultText>
        다음은 <span style={{ color: "black" }}>{keyword}</span>에 대한 검색
        결과입니다.
      </SearchResultText>

      <ProductList keyword={keyword} />
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
