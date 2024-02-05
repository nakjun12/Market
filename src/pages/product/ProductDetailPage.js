import { getPostById } from "@/api/marketApi";
import ProductImageCarousel from "@/components/carousel/ProductImageCarousel";
import useModalStore from "@/utils/hooks/store/useModalStore";
import { useEffect } from "react";

const images = [
  "https://i.pinimg.com/550x/a9/f1/2a/a9f12ad9bfe0baa4f6e629d1e0fa439c.jpg",
  "https://species.nibr.go.kr/UPLOAD/digital/species/12000009/120000095823/BIMGMM0000386036_20221116112438319509.jpg",
  "https://mblogthumb-phinf.pstatic.net/MjAxODAyMDJfMTcx/MDAxNTE3NTUxOTIxNDcz.4p7O7MZoKYKwd9FSAVZBdJQEayDerw9nzUCPKNzfSL4g.Cx4zwz5E5GiYeUS1EGelbBU4Z2gPj9jn0ZjCQxD55gsg.JPEG.phjphk12/image_3575628891517551874701.jpg?type=w800"
];

export default function ProductDetailPage() {
  const { openModal } = useModalStore();
  useEffect(() => {
    console.log(getPostById(1).then((e) => console.log(e)));
  }, []);
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
      <ProductImageCarousel images={images} />
      <div className="px-4 py-2"></div>
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-lg">WINIA Air Washer</div>
            <div className="text-gray-500 text-sm">Used - Like new</div>
          </div>
          <div className="text-lg">30,000₩</div>
        </div>
        <div className="mt-2">
          <p className="text-sm">me.</p>
        </div>
        <button
          onClick={openCustomPopup}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full mt-4 bg-orange-400 text-white">
          Contact seller
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
