import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Package, ExternalLink } from "lucide-react";

export default function RecentProducts({ products, loading }) {
  return (
    <div className="neumorph-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-licorice">
          Recent Products
        </h2>
        <Link 
          to={createPageUrl("Products")}
          className="text-sm font-medium flex items-center gap-1 hover:opacity-70 transition-opacity text-cool-gray"
        >
          View All
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 neumorph-inset animate-pulse">
              <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.slice(0, 5).map((product) => (
            <div key={product.id} className="flex items-center gap-4 p-4 neumorph-inset">
              <div className="neumorph-button p-3">
                <Package className="w-6 h-6 text-cool-gray" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-licorice">
                  {product.title}
                </p>
                <p className="text-sm text-cool-gray">
                  {product.category} • {product.condition}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-licorice">
                  ${product.price}
                </p>
                <p className="text-sm text-cool-gray">
                  Qty: {product.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-8">
          <Package className="w-12 h-12 mx-auto mb-4 text-cool-gray" />
          <p className="text-cool-gray">No products yet</p>
        </div>
      )}
    </div>
  );
}
