"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLoadingModal } from "@/hooks/use-loading";

export const LoadingModal = () => {
  const loadingModal = useLoadingModal();

  return (
    <Dialog open={loadingModal.isOpen}>
      <DialogContent
        className="max-w-md p-0 overflow-hidden border-none shadow-none  bg-transparent"
        hideClose={true}
      >
        <div className=" flex items-center justify-center gap-2">
          <div className="w-4 h-4 rounded-full animate-pulse bg-gray-500" />
          <div className="w-4 h-4 rounded-full animate-pulse bg-gray-500" />
          <div className="w-4 h-4 rounded-full animate-pulse bg-gray-500" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
