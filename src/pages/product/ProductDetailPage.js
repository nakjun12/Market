import { getPostById, getPublishedPosts } from "@/api/marketApi";
import ProductImageCarousel from "@/components/carousel/ProductImageCarousel";
import useModalStore from "@/utils/hooks/store/useModalStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductsListComponent from "./components/ProductListComponent";

export default function ProductDetailPage() {
  const { openModal } = useModalStore();
  const { productid } = useParams();
  const [product, setProduct] = useState({});

  console.log(productid, "id");
  useEffect(() => {
    getPostById(productid).then((e) => {
      console.log(e.data);
      setProduct(e.data);
    });
  }, []);
  const { title, price, content, imgUrls = [], location } = product;

  console.log(imgUrls, "imgUrls");

  const openCustomPopup = ({ process }) => {
    const customContent = (
      <div>
        <div className="modal-box w-64">
          <h3 className="font-bold text-lg">장바구니에 저장하였습니다.</h3>
          <div className="modal-action">
            <button className="btn">확인</button>
          </div>
        </div>
      </div>
    );
    openModal(customContent); // 백드롭 클릭으로 팝업을 닫습니다.
  };
  return (
    <div className="max-w-sm mx-auto relative">
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
      <div className="px-4 py-2">
        <div className="font-bold text-lg mb-2">Similar items</div>
        <div className="grid grid-cols-2 gap-4">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm w-full"
            data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Wooden Chair
              </h3>
              <p className="text-sm text-muted-foreground">25,000₩ - Used</p>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm w-full"
            data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Fur Slippers
              </h3>
              <p className="text-sm text-muted-foreground">7,000₩ - New</p>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm w-full"
            data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Red Backpack
              </h3>
              <p className="text-sm text-muted-foreground">10,000₩ - Used</p>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm w-full"
            data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Glass Bowl
              </h3>
              <p className="text-sm text-muted-foreground">10,000₩ - Used</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-4 py-2 text-xs text-gray-500"></div>
    </div>
  );
}
