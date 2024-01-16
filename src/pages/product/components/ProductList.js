import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 검색 결과 리스트를 만드는 컴포넌트
const ProductList = ({ productList }) => {
  const navigate = useNavigate();
  const [listData, setListData] = useState();

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
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  `;

  const CardImg = styled.img`
    border-radius: 4px;
    margin-bottom: 10%;
  `;

  const NoticeMsg = styled.p`
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    padding: 20px;
  `;

  const handleProductPage = (id) => {
    console.log("id:", id); // /product/:productid
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    setListData(productList);
  }, [productList]);

  return (
    <ProductListWrap>
      {listData && listData.length > 0 ? (
        <CardWrap>
          {listData.map((product) => (
            <Card
              key={product.id}
              className="productCard"
              onClick={() => handleProductPage(product.id)}>
              <CardImg src={product.imgUrl} alt={product.title} />
              <h2>{product.title}</h2>
            </Card>
          ))}
        </CardWrap>
      ) : (
        <NoticeMsg>
          {listData
            ? "검색 결과가 없습니다."
            : "검색 결과를 불러오는 중입니다..."}
        </NoticeMsg>
      )}
    </ProductListWrap>
  );
};

export default ProductList;
