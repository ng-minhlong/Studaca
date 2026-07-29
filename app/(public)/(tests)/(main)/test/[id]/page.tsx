import React from "react";
import { mockTestDetail } from "./_lib/mock-data";
import { TestHeader } from "./_components/test-header";
import { UnfinishedAttempts } from "./_components/unfinished-attempts";
import { PerformanceChart } from "./_components/performance-chart";
import { TestHistoryTable } from "./_components/test-history-table";

export default function TestDetailPage() {
  // Có thể fetch data theo idTest ở đây nếu sau này kết nối API
  const testData = mockTestDetail;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 bg-white min-h-screen">
      {/* Thông tin chung + Thông báo */}
      <TestHeader data={testData} />

      <UnfinishedAttempts attempts={testData.unfinishedAttempts} />

      <PerformanceChart data={testData.chartData} />

      <div className="w-full py-2 bg-slate-100 text-center text-xs text-slate-400 rounded">
        Advertisement
      </div>

      <TestHistoryTable history={testData.history} />
    </div>
  );
}