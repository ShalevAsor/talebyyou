import React from "react";
import { FiBook } from "react-icons/fi";

interface LibraryHeaderProps {
  totalBooks: number;
  filteredBooks: number;
}

const LibraryHeader: React.FC<LibraryHeaderProps> = ({
  totalBooks,
  filteredBooks,
}) => {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FiBook className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Library</h1>
              <p className="text-sm text-gray-500 mt-1">
                {filteredBooks === totalBooks
                  ? `${totalBooks} templates available`
                  : `Showing ${filteredBooks} of ${totalBooks} templates`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryHeader;
