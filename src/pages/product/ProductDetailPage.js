import Dialog from "@/components/popup/Dialog";
import useModalStore from "@/utils/hooks/store/useModalStore";
import { useState } from "react";

export default function ProductDetailPage() {
  const { openModal, closeModal } = useModalStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  const openCustomPopup = () => {
    const customContent = (
      <>
        {/* 팝업 내용 */}
        <h2>Popup Title</h2>
        <p>Popup Contentddddddddddddddddddddddddd</p>
        <button onClick={closeModal}>Close Popup</button>
      </>
    );
    openModal(customContent, false);
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex items-center justify-between px-4 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <div className="flex-grow">
          <input
            type="search"
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
            placeholder="Search"
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
        </svg>
      </div>
      <Dialog isOpen={isDialogOpen} onBackdropClick={closeDialog}>
        <div className="flex flex-col items-center justify-center w-full h-full">
          하이
        </div>
        <button onClick={closeDialog}>하하</button>
      </Dialog>
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
        <button onClick={openDialog}>키키</button>
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
