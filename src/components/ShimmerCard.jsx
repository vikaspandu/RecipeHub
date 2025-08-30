// src/components/ShimmerCard.jsx
function ShimmerCard() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-52 bg-gray-300"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-10 bg-gray-300 rounded w-full mt-4"></div>
      </div>
    </div>
  );
}

export default ShimmerCard;
