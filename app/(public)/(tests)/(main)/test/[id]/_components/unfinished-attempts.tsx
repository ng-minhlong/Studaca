"use client";

import React from "react";
import { TestAttempt } from "../_lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

interface Props {
  attempts: TestAttempt[];
}

export const UnfinishedAttempts: React.FC<Props> = ({ attempts }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-bold text-slate-800">Kết quả của bài kiểm tra này</h2>
        <span className="text-xs text-slate-500">{attempts.length} unfinished attempts</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {attempts.map((attempt) => (
          <Card key={attempt.id} className="bg-slate-50 border-slate-200 shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-3 flex flex-col justify-between h-full space-y-3">
              <div>
                <p className="text-xs font-semibold line-clamp-2 text-slate-800 leading-tight mb-2">
                  {attempt.title}
                </p>
                <p className="text-[10px] text-slate-500">{attempt.date}</p>
              </div>
              <Button size="sm" className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs h-7 gap-1">
                <Play className="w-3 h-3 fill-current" />
                Continue test
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};