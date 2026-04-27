"use client";

import Modal from "./Modal";


type ViewModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  data?: any;
  children?: React.ReactNode;
};

export default function ViewModal({
  open,
  onClose,
  title = "Details",
  data,
  children,
}: ViewModalProps) {
  if (!open) return null; // ✅ only check open

  return (
    <Modal open={open} onClose={onClose} title={title} width="max-w-xl">

      {/* ✅ If custom UI provided → use it */}
      {children ? children : (<div className="space-y-2">
           {Object.entries(data || {}).map(([key, value]) => (
             <div key={key} className="flex justify-between border-b pb-1">
               <span className="font-medium capitalize">{key}</span>
               <span>{String(value)}</span>
             </div>
           ))}
         </div>)    
      }

    </Modal>
  );
}