import styled from "@emotion/styled";
import ProductList from "./components/ProductList";

// 처음 진입하면 보이는 메인 페이지
// api를 호출하여 ProcudtList에 정보를 넘겨서 보여주도록 함
// 스크롤을 통해 더 많은 상품을 동적으로 로드

export default function ProductsPage() {
  return (
    <div>
      <ProductPageText>원하시는 상품을 찾아보세요.</ProductPageText>
      <ProductList
        param={{
          page: 1, // 1 페이지가 아니면 nextPage(현재+1 된 값)을 호출
          limit: 20,
          query: "",
          orderBy: "createdAt",
          direction: "asc"
        }}
        queryKey={["HomeProductList"]}
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
