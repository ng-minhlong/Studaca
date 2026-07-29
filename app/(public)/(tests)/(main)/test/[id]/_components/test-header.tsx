import React from "react";
import { TestDetailData } from "../_lib/types";

interface Props {
  data: TestDetailData;
}

export const TestHeader: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-800">{data.title}</h1>

      <div className="bg-slate-50 border rounded-md p-4 text-xs leading-relaxed text-slate-700 space-y-1">
        <p>
          <span className="font-semibold">Time do test:</span> {data.timeLimit} phút | {data.totalQuestions} câu hỏi
        </p>
        <p>
          <span className="font-semibold">Giá:</span> {data.priceToken} token
        </p>
        <p>
          <span className="font-semibold">Time allow:</span> {data.remainingTimes} times
        </p>
        <p>
          <span className="font-semibold">Resource:</span>
        </p>
        <p>
          <span className="font-semibold">Test :</span> <span className="text-blue-600 hover:underline cursor-pointer">{data.testCode}</span>
        </p>
        <p>
          <span className="font-semibold">Số lượt làm còn lại:</span> 3
        </p>
        <p>
          <span className="font-semibold">{data.completedUsers.toLocaleString()} users completed this test</span>
        </p>
        <p>
          <span className="font-semibold">Allow Preview:</span> {data.allowPreview ? "1" : "0"}
        </p>
      </div>

      <div className="bg-amber-100 border border-amber-200 text-amber-900 rounded-md p-3 text-xs leading-relaxed">
        {data.warningNotice}{" "}
        <a href="#" className="font-bold underline">
          Digital SAT Full Test Collection.
        </a>
      </div>
    </div>
  );
};