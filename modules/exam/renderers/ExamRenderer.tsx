"use client";

import type { AnyTest } from "../types";
import { Layout0 } from "../layouts/test/Layout0";
import { Layout1 } from "../layouts/test/Layout1";
import { Layout2 } from "../layouts/test/Layout2";
import { Layout3 } from "../layouts/test/Layout3";
import { Layout4 } from "../layouts/test/Layout4";
import { Layout5 } from "../layouts/test/Layout5";

interface ExamRendererProps {
  test: AnyTest;
}

export function ExamRenderer({ test }: ExamRendererProps) {
  switch (test.layout) {
    case "layout_0":
      return <Layout0 test={test} />;
    case "layout_1":
      return <Layout1 test={test} />;
    case "layout_2":
      return <Layout2 test={test} />;
    case "layout_3":
      return <Layout3 test={test} />;
    case "layout_4":
      return <Layout4 test={test} />;
    case "layout_5":
      return <Layout5 test={test} />;
    default:
      return (
        <div className="flex h-screen items-center justify-center text-muted-foreground">
          Unknown layout
        </div>
      );
  }
}
