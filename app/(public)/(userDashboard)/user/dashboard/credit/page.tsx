import { headers } from "next/headers";
import { requireUser } from "@/app/data/user/require-user";
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  PlusCircle, 
  Coins,
  History,
  Info
} from "lucide-react";

export default async function DashboardCreditPage() {
  await requireUser();

  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    (host ? `${protocol}://${host}` : "http://localhost:3000");

  const [creditResponse, usagesResponse] = await Promise.all([
    fetch(`${baseUrl}/api/user/credit`, {
      headers: requestHeaders,
      cache: "no-store",
    }),
    fetch(`${baseUrl}/api/user/credit/usage?take=20`, {
      headers: requestHeaders,
      cache: "no-store",
    }),
  ]);

  if (!creditResponse.ok || !usagesResponse.ok) {
    throw new Error("Không thể tải dữ liệu credit.");
  }

  const [{ credit }, { usages }] = await Promise.all([
    creditResponse.json(),
    usagesResponse.json(),
  ]);

  const balance = credit?.balance ?? 0;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header trang */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Quản lý Credit
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Xem số dư hiện tại và lịch sử biến động credit trong tài khoản của bạn.
        </p>
      </div>

      {/* Banner Thống kê Số dư */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-600">
              <Coins className="h-3.5 w-3.5" />
              <span>Ví Credit khả dụng</span>
            </div>
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                {balance.toLocaleString("vi-VN")}
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Credits
              </span>
            </div>
          </div>

          <button className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-md shadow-indigo-100 hover:shadow-indigo-200 cursor-pointer">
            <PlusCircle className="h-4 w-4" />
            <span>Nạp thêm Credit</span>
          </button>
        </div>

        {/* Trang trí background */}
        <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-indigo-50/50 pointer-events-none blur-2xl" />
      </div>

      {/* Bảng Lịch sử Giao dịch */}
      <div className="rounded-3xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
              <History className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Lịch sử giao dịch
              </h2>
              <p className="text-xs text-slate-500">
                Hiển thị tối đa 20 giao dịch mới nhất
              </p>
            </div>
          </div>
        </div>

        {usages.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
              <Info className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-slate-600">
              Chưa có giao dịch sử dụng credit nào.
            </p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Các hoạt động tiêu tốn hoặc nạp credit sẽ xuất hiện tại đây.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Thời gian</th>
                  <th className="px-6 py-3.5">Loại</th>
                  <th className="px-6 py-3.5 text-right">Số lượng</th>
                  <th className="px-6 py-3.5 text-right">Số dư sau</th>
                  <th className="px-6 py-3.5">Mô tả</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usages.map((usage: any) => {
                  const isPositive = usage.amount > 0;

                  return (
                    <tr
                      key={usage.id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600 text-xs">
                        {new Date(usage.createdAt).toLocaleString("vi-VN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            isPositive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-rose-50 text-rose-700 border border-rose-100"
                          }`}
                        >
                          {isPositive ? (
                            <ArrowDownLeft className="h-3 w-3" />
                          ) : (
                            <ArrowUpRight className="h-3 w-3" />
                          )}
                          {usage.type}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-right font-semibold text-sm ${
                          isPositive ? "text-emerald-600" : "text-slate-900"
                        }`}
                      >
                        {isPositive ? `+${usage.amount}` : usage.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-slate-600">
                        {usage.balanceAfter?.toLocaleString("vi-VN") ?? "-"}
                      </td>
                      <td className="px-6 py-4 text-slate-600 max-w-xs truncate text-xs">
                        {usage.description ?? "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}