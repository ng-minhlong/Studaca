"use client";

import type { AnyResult } from "../types";
import { ResultLayout0 } from "../layouts/result/ResultLayout0";
import { ResultLayout1 } from "../layouts/result/ResultLayout1";
import { ResultLayout2 } from "../layouts/result/ResultLayout2";
import { ResultLayout3 } from "../layouts/result/ResultLayout3";
import { ResultLayout4 } from "../layouts/result/ResultLayout4";
import { ResultLayout5 } from "../layouts/result/ResultLayout5";

interface ResultRendererProps {
  result: AnyResult;
}

export function ResultRenderer({ result }: ResultRendererProps) {
  switch (result.layout) {
    case "layout_0":
      return <ResultLayout0 result={result} />;
    case "layout_1":
      return <ResultLayout1 result={result} />;
    case "layout_2":
      return <ResultLayout2 result={result} />;
    case "layout_3":
      return <ResultLayout3 result={result} />;
    case "layout_4":
      return <ResultLayout4 result={result} />;
    case "layout_5":
      return <ResultLayout5 result={result} />;
    default:
      return (
        <div className="flex h-screen items-center justify-center text-muted-foreground">
          Unknown result layout
        </div>
      );
  }
}
