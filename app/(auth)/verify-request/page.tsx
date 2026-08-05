import { Suspense } from "react";
import ClientVerify from "./ClientVerify";

export default function VerifyRequestPage() {
  return (
    <Suspense fallback={<div />}>
      <ClientVerify />
    </Suspense>
  );
}
