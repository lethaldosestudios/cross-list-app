import React from "react";
import { Filter } from "lucide-react";

export default function ProductFilters({ filters, onFilterChange }) {
  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex items-center gap-2">
        <Filter className="hidden sm:block w-4 h-4 text-cool-gray" />
        <select
          className="neumorph-input p-2 text-sm font-medium text-licorice"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home & Garden</option>
          <option value="books">Books</option>
          <option value="collectibles">Collectibles</option>
          <option value="jewelry">Jewelry</option>
          <option value="automotive">Automotive</option>
          <option value="sports">Sports</option>
          <option value="toys">Toys</option>
          <option value="other">Other</option>
        </select>
      </div>

      <select
        className="neumorph-input p-2 text-sm font-medium text-licorice"
        value={filters.condition}
        onChange={(e) => handleFilterChange('condition', e.target.value)}
      >
        <option value="all">All Conditions</option>
        <option value="new">New</option>
        <option value="like_new">Like New</option>
        <option value="good">Good</option>
        <option value="fair">Fair</option>
        <option value="poor">Poor</option>
      </select>

      <select
        className="neumorph-input p-2 text-sm font-medium text-licorice"
        value={filters.priceRange}
        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
      >
        <option value="all">All Prices</option>
        <option value="under-25">Under $25</option>
        <option value="25-100">$25 - $100</option>
        <option value="100-500">$100 - $500</option>
        <option value="over-500">Over $500</option>
      </select>
    </div>
  );
}
