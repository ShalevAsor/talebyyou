import { Genre } from "@prisma/client";
import React from "react";

interface TemplateDetailsProps {
  pageCount: number;
  minAge: number;
  maxAge: number;
  genres: Genre[];
}

const TemplateDetails: React.FC<TemplateDetailsProps> = React.memo(
  ({ pageCount, minAge, maxAge, genres }) => {
    return (
      <section
        aria-labelledby="book-details-heading"
        className="bg-white rounded-lg shadow overflow-hidden"
      >
        <header className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h3
            id="book-details-heading"
            className="text-lg font-semibold text-gray-900"
          >
            Book Details
          </h3>
        </header>

        <dl className="divide-y divide-gray-100">
          {/* Pages */}
          <div className="px-6 py-4 flex items-center justify-between">
            <dt className="text-sm text-gray-600">Pages</dt>
            <dd className="text-sm font-medium text-gray-900">{pageCount}</dd>
          </div>

          {/* Age Range */}
          <div className="px-6 py-4 flex items-center justify-between">
            <dt className="text-sm text-gray-600">Recommended Age Range</dt>
            <dd className="text-sm font-medium text-gray-900">
              {minAge} - {maxAge} years
            </dd>
          </div>

          {/* Genres */}
          <div className="px-6 py-4">
            <div className="flex items-start justify-between">
              <dt className="text-sm text-gray-600">Genres</dt>
              <dd className="flex flex-wrap gap-2 justify-end max-w-xs">
                {genres.length > 0 ? (
                  genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      {genre.name}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">
                    No genres specified
                  </span>
                )}
              </dd>
            </div>
          </div>
        </dl>
      </section>
    );
  }
);

// Display name for debugging
TemplateDetails.displayName = "TemplateDetails";

export default TemplateDetails;
