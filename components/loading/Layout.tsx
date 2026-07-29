import { BookOpen } from "lucide-react";

export default function LoadingScreen() {
  return (
    <main className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-neutral-950">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl animate-pulse" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
            <BookOpen className="h-9 w-9 text-primary animate-[float_2.5s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Loading animation */}
        <div className="flex items-center gap-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-primary animate-[bounceDot_1.2s_infinite]"
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        {/* Progress */}
        <div className="w-56 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
          <div className="h-1.5 w-1/3 rounded-full bg-primary animate-[loadingBar_1.4s_ease-in-out_infinite]" />
        </div>

        <p className="text-sm tracking-wide text-neutral-500">
          Preparing your learning experience
        </p>
      </div>

      <style jsx>{`
        @keyframes loadingBar {
          0% {
            transform: translateX(-110%);
          }
          50% {
            transform: translateX(160%);
          }
          100% {
            transform: translateX(350%);
          }
        }

        @keyframes bounceDot {
          0%,
          80%,
          100% {
            transform: translateY(0);
            opacity: 0.35;
          }

          40% {
            transform: translateY(-7px);
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </main>
  );
}