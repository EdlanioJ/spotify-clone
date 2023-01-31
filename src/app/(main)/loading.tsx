'use client';

export default function Loading() {
  return (
    <div className="absolute top-0 flex w-full h-full items-center justify-center text-gray-100">
      <div className="flex gap-3">
        <div className="w-2 h-2 bg-gray-100 rounded-full animate-left-bobble" />
        <div className="w-2 h-2 bg-gray-100 rounded-full animate-center-bobble animation-delay-200" />
        <div className="w-2 h-2 bg-gray-100 rounded-full animate-right-bobble animation-delay-400" />
      </div>
    </div>
  );
}
