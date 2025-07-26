export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-semibold text-blue-600">Loading...</p>
    </div>
  );
}
