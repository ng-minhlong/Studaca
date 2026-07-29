import React from "react";
import { HistoryRecord } from "../_lib/types";
import { Button } from "@/components/ui/button";

interface Props {
  history: HistoryRecord[];
}

export const TestHistoryTable: React.FC<Props> = ({ history }) => {
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-500 font-medium">Your result:</p>
      <div className="border rounded-md overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 border-b text-slate-600 font-semibold">
            <tr>
              <th className="p-3">Bắt đầu lúc</th>
              <th className="p-3">Kết thúc tại</th>
              <th className="p-3">Tên đề thi</th>
              <th className="p-3">Kết quả cuối cùng</th>
              <th className="p-3">Thời gian sử dụng</th>
              <th className="p-3">Đã hoàn thành chưa?</th>
              <th className="p-3">Có thuộc Test Collection?</th>
              <th className="p-3 text-right">Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {history.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-4 text-slate-400">
                  Chưa có lịch sử làm bài
                </td>
              </tr>
            ) : (
              history.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="p-3 whitespace-nowrap">{item.startTime}</td>
                  <td className="p-3 whitespace-nowrap">{item.endTime}</td>
                  <td className="p-3 font-medium text-slate-900">{item.testName}</td>
                  <td className="p-3 font-semibold text-blue-600">{item.finalResult}</td>
                  <td className="p-3 whitespace-nowrap">{item.duration}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${
                        item.isCompleted ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.isCompleted ? "Đã xong" : "Chưa xong"}
                    </span>
                  </td>
                  <td className="p-3">{item.isInCollection ? "Có" : "Không"}</td>
                  <td className="p-3 text-right">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Xem chi tiết
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};