import React from "react";
import { MoreHorizontal, Edit, Trash2, Eye, Package, Plus } from "lucide-react";

export default function ProductCard({ product, onEdit, onDelete, onCreateListing }) {
  const handleCardClick = (e) => {
    // Prevent card click when clicking on buttons or dropdown
    if (e.target.closest('button') || e.target.closest('[data-radix-popper-content-wrapper]')) {
      return;
    }
    onEdit(product);
  };

  return (
    <div 
      className="neumorph-card p-6 group cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="neumorph-button p-2">
            <Package className="w-5 h-5 text-cool-gray" />
          </div>
          <div>
            <h3 className="font-bold text-licorice">
              {product.title}
            </h3>
            <p className="text-sm text-cool-gray">
              {product.category} • {product.condition}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCreateListing(product);
            }}
            className="neumorph-button p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Create Listing"
          >
            <Plus className="w-4 h-4 text-cool-gray" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(product);
            }}
            className="neumorph-button p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Edit Product"
          >
            <Edit className="w-4 h-4 text-cool-gray" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(product.id);
            }}
            className="neumorph-button p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-cool-gray line-clamp-2">
          {product.description || 'No description available'}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-right">
            <p className="text-2xl font-bold text-licorice">
              ${product.price}
            </p>
            <p className="text-sm text-cool-gray">
              Qty: {product.quantity}
            </p>
          </div>
          
          {product.photos && product.photos.length > 0 && (
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              <img 
                src={product.photos[0]} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-neumorph-inset rounded-full text-cool-gray"
              >
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-neumorph-inset rounded-full text-cool-gray">
                +{product.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
