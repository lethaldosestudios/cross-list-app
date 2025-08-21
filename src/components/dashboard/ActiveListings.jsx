import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { getMarketplaceColor } from "../../utils";

export default function ActiveListings({ listings, loading }) {
  const activeListings = listings.filter(l => l.status === 'active');

  return (
    <div className="neumorph-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-licorice">
          Active Listings
        </h2>
        <Link 
          to={createPageUrl("Listings")}
          className="text-sm font-medium flex items-center gap-1 hover:opacity-70 transition-opacity text-cool-gray"
        >
          View All
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="neumorph-inset p-4 animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {activeListings.slice(0, 5).map((listing) => (
            <div key={listing.id} className="neumorph-inset p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getMarketplaceColor(listing.marketplace) }}
                  ></div>
                  <div>
                    <p className="font-medium text-sm text-licorice">
                      {listing.marketplace.charAt(0).toUpperCase() + listing.marketplace.slice(1)}
                    </p>
                    <p className="text-xs text-cool-gray">
                      {listing.views || 0} views
                    </p>
                  </div>
                </div>
                <p className="font-bold text-sm text-licorice">
                  ${listing.listing_price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && activeListings.length === 0 && (
        <div className="text-center py-8">
          <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-cool-gray" />
          <p className="text-cool-gray">No active listings</p>
        </div>
      )}
    </div>
  );
}
