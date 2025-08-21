import React from "react";
import { Filter } from "lucide-react";

export default function ListingFilters({ filters, onFilterChange }) {
  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex items-center gap-2">
        <Filter className="hidden sm:block w-4 h-4 text-cool-gray" />
        <select
          className="neumorph-input p-2 text-sm font-medium text-licorice"
          value={filters.marketplace}
          onChange={(e) => handleFilterChange('marketplace', e.target.value)}
        >
          <option value="all">All Marketplaces</option>
          <option value="ebay">eBay</option>
          <option value="amazon">Amazon</option>
          <option value="facebook">Facebook</option>
          <option value="mercari">Mercari</option>
          <option value="poshmark">Poshmark</option>
          <option value="depop">Depop</option>
          <option value="etsy">Etsy</option>
          <option value="shopify">Shopify</option>
        </select>
      </div>

      <select
        className="neumorph-input p-2 text-sm font-medium text-licorice"
        value={filters.status}
        onChange={(e) => handleFilterChange('status', e.target.value)}
      >
        <option value="all">All Status</option>
        <option value="draft">Draft</option>
        <option value="active">Active</option>
        <option value="sold">Sold</option>
        <option value="ended">Ended</option>
        <option value="suspended">Suspended</option>
      </select>
    </div>
  );
}
