import React from "react";
import { MoreHorizontal, Edit, Trash2, Eye, Users } from "lucide-react";
import { getStatusColor, getMarketplaceColor } from "../../utils";

export default function ListingCard({ listing, productTitle, onEdit, onDelete }) {
  return (
    <div className="neumorph-card p-6 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: getMarketplaceColor(listing.marketplace) }}
          ></div>
          <div>
            <h3 className="font-bold text-licorice">
              {listing.marketplace.charAt(0).toUpperCase() + listing.marketplace.slice(1)}
            </h3>
            <p className="text-sm text-cool-gray">
              {productTitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: getStatusColor(listing.status) }}
          ></div>
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit(listing)}
              className="neumorph-button p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Edit Listing"
            >
              <Edit className="w-4 h-4 text-cool-gray" />
            </button>
            <button 
              onClick={() => onDelete(listing.id)}
              className="neumorph-button p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete Listing"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-licorice line-clamp-2">
          {listing.listing_title || 'No title'}
        </h4>
        
        <p className="text-sm text-cool-gray line-clamp-3">
          {listing.listing_description || 'No description'}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-right">
            <p className="text-xl font-bold text-licorice">
              ${listing.listing_price}
            </p>
            <p className="text-sm text-cool-gray capitalize">
              {listing.status}
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-cool-gray">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{listing.views || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{listing.watchers || 0}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-cool-gray">
          <span>
            Listed: {listing.listed_date ? new Date(listing.listed_date).toLocaleDateString() : 'N/A'}
          </span>
          {listing.end_date && (
            <span>
              Ends: {new Date(listing.end_date).toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onEdit(listing)}
            className="neumorph-button flex-1 py-2 text-sm font-medium text-licorice"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(listing.id)}
            className="neumorph-button py-2 px-3 text-sm font-medium text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
