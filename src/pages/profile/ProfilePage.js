import useAuthStore from "@/utils/hooks/store/useAuthStore";
import ProductList from "../product/components/ProductList";
import { useState } from "react";
import { getPostByUser } from "@/api/marketApi";

export const ProfilePage = () => {
  const { id, userName, email } = useAuthStore();
  const [productList, setProductList] = useState([]);
  const keyword = null;
  const getProductList = async ({ pageParam = 1 }) => {
    // pageParam : useInfiniteQuery의 getNextPageParam에서 반환해준 값 (=다음 불러올 페이지)
    const resData = await getPostByUser({
      page: pageParam !== 1 ? pageParam : 1, // 1 페이지가 아니면 nextPage(현재+1 된 값)을 호출
      limit: 20,
      query: keyword ? keyword : "",
      orderBy: "createdAt",
      direction: "asc",
      userId: id
    });

    const { page, lastPage, data: responseData } = resData.data;
    setProductList((prevList) => [...prevList, ...responseData]);

    // return은 아래 useInfiniteQuery에서 getNextPageParam으로 전달
    // page 뜻을 전달하기 위해 이름 curPage로 전달
    return { curPage: page, lastPage };
  };
  return (
    <>
      <div className="w-full flex justify-center mt-20">
        <div className="h-56 w-72 absolute flex justify-center items-center">
          <img
            className="object-cover h-20 w-20 rounded-full"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt=""
          />
        </div>

        <div
          className="
      h-56
      mx-4
      w-5/6
      bg-primary
      rounded-3xl
      shadow-md
      sm:w-80 sm:mx-0
    ">
          <div className="h-1/2 w-full flex justify-between items-baseline px-3 py-5">
            <h1 className="text-white">Profile</h1>
            <h1 className="text-white">{id}</h1>
          </div>

          <div
            className="
        bg-white
        h-1/2
        w-full
        rounded-3xl
        flex flex-col
        justify-around
        items-center
      ">
            <div className="w-full h-1/2 flex justify-between items-center px-3 pt-2">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-gray-500 text-xs">Sample</h1>
                <h1 className="text-gray-600 text-sm">340</h1>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-gray-500 text-xs">Sample</h1>
                <h1 className="text-gray-600 text-sm">$2,004</h1>
              </div>
            </div>
            <div className="w-full h-1/2 flex flex-col justify-center items-center">
              <h1 className="text-gray-700 font-bold">{userName}</h1>
              <h1 className="text-gray-500 text-sm">{email}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center p-4">내가 올린 상품 리스트</div>
      <ProductList
        getProductList={getProductList}
        productList={productList}
        keyword={keyword}
      />
    </>
  );
};
