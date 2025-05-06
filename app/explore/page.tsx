"use client";

import React, { useState } from "react";
import DisplayListings from "./displayListings";
import { MainSidebar } from "@/components/navigation/MainSidebar";
import { useDebounce } from "@/hooks/useDebounce";

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  return (
    <>
      <MainSidebar />
      <section className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Explore Listings</h1>
          <p className="text-muted-foreground mt-2">
            Discover the best items available in the marketplace
          </p>
        </div>

        {/* 🔍 Search + Price Filters */}
        <div className="mb-6 flex justify-center gap-2">
          {/* Text Search */}
          <input
            type="text"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 max-w-lg p-2 border border-gray-300 rounded"
          />

          {/* Min Price */}
          <input
            type="number"
            placeholder="Min $"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-24 p-2 border border-gray-300 rounded"
          />

          {/* Max Price */}
          <input
            type="number"
            placeholder="Max $"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-24 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="bg-card shadow-sm rounded-lg p-4 mx-auto">
          <DisplayListings
            searchQuery={debouncedSearchQuery}
            minPrice={minPrice === "" ? undefined : minPrice}
            maxPrice={maxPrice === "" ? undefined : maxPrice}
          />
        </div>
      </section>
    </>
  );
};

export default ExplorePage;
