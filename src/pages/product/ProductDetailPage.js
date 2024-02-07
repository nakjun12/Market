import { getPublishedPosts } from "@/api/marketApi";
import ProductImageCarousel from "@/components/carousel/ProductImageCarousel";
import useModalStore from "@/utils/hooks/store/useModalStore";
import { useLoaderData, useParams } from "react-router-dom";
import ProductsListComponent from "./components/ProductListComponent";

export default function ProductDetailPage() {
  const { openModal } = useModalStore();
  const loaderData = useLoaderData();
  console.log(loaderData, "loaderData");
  const { productid } = useParams();
  const product = loaderData;

  console.log(productid, "id");

  const { title, price, content, imgUrls = [], location } = product;

  console.log(imgUrls, "imgUrls");

  const openCustomPopup = ({ process }) => {
    openModal({
      modalType: "anotherModalType",
      modalProps: {
        title: `장바구니에 저장했습니다.`,
        message: "",
        confirmText: "확인",
        onConfirm: closeModal
      }
    }); // 백드롭 클릭으로 팝업을 닫습니다.
  };
  return (
    <div className="max-w-md mx-auto relative">
      <ProductImageCarousel images={imgUrls} />
      <div className="px-4 py-2"></div>
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-lg">{title}</div>
            <div className="text-gray-500 text-sm">{location}</div>
          </div>
          <div className="text-lg">{price}₩</div>
        </div>
        <div className="mt-2">
          <p className="text-sm">{content}</p>
        </div>
        <button
          onClick={openCustomPopup}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full mt-4 bg-orange-400 text-white">
          장바구니에 넣기
        </button>
      </div>
      <ProductsListComponent
        title="이 상품을 본 사람들이 함께 본 상품"
        param={{
          page: 2, // 1 페이지가 아니면 nextPage(현재+1 된 값)을 호출
          limit: 20,
          query: "",
          orderBy: "createdAt",
          direction: "asc"
        }}
        apiCallback={getPublishedPosts}
        queryKey={[`ProductList_${productid}`]}
      />
    </div>
  );
}
