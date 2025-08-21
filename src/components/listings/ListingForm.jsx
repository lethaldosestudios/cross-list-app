import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";

export default function ListingForm({ listing, products, onSubmit, onCancel, isOptimizingAI, preselectedProductId }) {
  const [formData, setFormData] = useState({
    product_id: listing?.product_id || preselectedProductId || '',
    marketplaces: listing?.marketplace ? [listing.marketplace] : ['ebay'],
    listing_title: listing?.listing_title || '',
    listing_description: listing?.listing_description || '',
    listing_price: listing?.listing_price || '',
    optimizeWithAI: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleMarketplaceChange = (marketplace, checked) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        marketplaces: [...prev.marketplaces, marketplace]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        marketplaces: prev.marketplaces.filter(m => m !== marketplace)
      }));
    }
  };

  const selectedProduct = products.find(p => p.id === formData.product_id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="neumorph-card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-licorice">
            {listing ? 'Edit Listing' : 'Create New Listing'}
          </h2>
          <button
            onClick={onCancel}
            className="neumorph-button p-2"
          >
            <X className="w-5 h-5 text-cool-gray" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-licorice mb-2">
              Select Product *
            </label>
            <select
              required
              className="neumorph-input w-full"
              value={formData.product_id}
              onChange={(e) => setFormData(prev => ({ ...prev, product_id: e.target.value }))}
            >
              <option value="">Choose a product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.title} - ${product.price}
                </option>
              ))}
            </select>
          </div>

          {selectedProduct && (
            <div className="neumorph-inset p-4">
              <h4 className="font-medium text-licorice mb-2">Product Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-cool-gray">Title:</span>
                  <p className="text-licorice">{selectedProduct.title}</p>
                </div>
                <div>
                  <span className="text-cool-gray">Price:</span>
                  <p className="text-licorice">${selectedProduct.price}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-cool-gray">Description:</span>
                  <p className="text-licorice">{selectedProduct.description || 'No description'}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-licorice mb-2">
              Marketplaces *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['ebay', 'amazon', 'facebook', 'mercari', 'poshmark', 'depop', 'etsy', 'shopify'].map(marketplace => (
                <label key={marketplace} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.marketplaces.includes(marketplace)}
                    onChange={(e) => handleMarketplaceChange(marketplace, e.target.checked)}
                    className="w-4 h-4 text-royal-purple"
                  />
                  <span className="text-sm text-licorice capitalize">
                    {marketplace}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-licorice mb-2">
              Listing Title
            </label>
            <input
              type="text"
              className="neumorph-input w-full"
              value={formData.listing_title}
              onChange={(e) => setFormData(prev => ({ ...prev, listing_title: e.target.value }))}
              placeholder={selectedProduct?.title || 'Enter listing title'}
            />
            <p className="text-xs text-cool-gray mt-1">
              Leave blank to use product title
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-licorice mb-2">
              Listing Description
            </label>
            <textarea
              rows="4"
              className="neumorph-input w-full"
              value={formData.listing_description}
              onChange={(e) => setFormData(prev => ({ ...prev, listing_description: e.target.value }))}
              placeholder={selectedProduct?.description || 'Enter listing description'}
            />
            <p className="text-xs text-cool-gray mt-1">
              Leave blank to use product description
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-licorice mb-2">
              Listing Price
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="neumorph-input w-full"
              value={formData.listing_price}
              onChange={(e) => setFormData(prev => ({ ...prev, listing_price: parseFloat(e.target.value) }))}
              placeholder={selectedProduct?.price || '0.00'}
            />
            <p className="text-xs text-cool-gray mt-1">
              Leave blank to use product price
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="optimizeWithAI"
              checked={formData.optimizeWithAI}
              onChange={(e) => setFormData(prev => ({ ...prev, optimizeWithAI: e.target.checked }))}
              className="w-4 h-4 text-royal-purple"
            />
            <label htmlFor="optimizeWithAI" className="flex items-center gap-2 text-sm font-medium text-licorice">
              <Sparkles className="w-4 h-4 text-mindaro" />
              Optimize with AI
            </label>
          </div>

          {formData.optimizeWithAI && (
            <div className="neumorph-inset p-4">
              <p className="text-sm text-cool-gray">
                AI will optimize your listing title, description, and pricing for better marketplace performance.
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              className="neumorph-button px-6 py-3 font-medium text-licorice"
              disabled={isOptimizingAI}
            >
              {isOptimizingAI ? 'Optimizing...' : (listing ? 'Update Listing' : 'Create Listing')}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="neumorph-button px-6 py-3 font-medium text-cool-gray"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
