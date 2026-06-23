"use client";

import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";
import RepCustomerInvoiceTable from "@/modules/repCustomerInvoice/components/RepCustomerInvoiceTable";

export default function RepCustomerInvoicePage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  return (
    <PageWrapper
      title="Report Customer Invoice"
      description="Get Customer Invoice Report"
      pagePermission="repCustomerInvoice"
    >
      <RepCustomerInvoiceTable/>      
    </PageWrapper>
  );
}