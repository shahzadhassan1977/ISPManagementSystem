"use client";

import PageWrapper from "@/components/ui/PageWrapper";
import RepCustomerReportTable from "@/modules/repCustomerReport/components/RepCustomerReportTable";

export default function CustomerReportPage() {
  return (
    <PageWrapper
      title="Customer Report"
      description="Generate customer reports with filters for date range, payment status, unpaid customers, and subscription status."
      pagePermission="reportcustomer"
    >
      <RepCustomerReportTable />
    </PageWrapper>
  );
}
