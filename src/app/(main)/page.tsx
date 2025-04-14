export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Custom Books Store</h1>
      <p className="text-lg text-gray-700">
        Discover your next favorite book from our curated collection.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Book cards would go here */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold">Featured Book</h2>
          <p className="text-gray-600">Book description would go here.</p>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold">Popular Book</h2>
          <p className="text-gray-600">Book description would go here.</p>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold">New Release</h2>
          <p className="text-gray-600">Book description would go here.</p>
        </div>
      </div>
    </div>
  );
}
