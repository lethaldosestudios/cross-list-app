import React, { useState, useEffect } from "react";
import { Listing } from "../entities/Listing";
import { Product } from "../entities/Product";
import { Plus, Search, Filter, ShoppingCart } from "lucide-react";

import ListingCard from "../components/listings/ListingCard";
import ListingForm from "../components/listings/ListingForm";
import ListingFilters from "../components/listings/ListingFilters";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    marketplace: "all",
    status: "all"
  });
  const [isOptimizingAI, setIsOptimizingAI] = useState(false);
  const [preselectedProductId, setPreselectedProductId] = useState(null);

  useEffect(() => {
    loadData();
    
    // Check for URL parameters to pre-select product
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product_id');
    const action = urlParams.get('action');
    
    if (productId && action === 'create') {
      setPreselectedProductId(productId);
      setShowForm(true);
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const loadData = async () => {
    try {
      const [listingsData, productsData] = await Promise.all([
        Listing.list('-created_date'),
        Product.list()
      ]);
      setListings(listingsData);
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (listingData) => {
    try {
      if (editingListing) {
        await Listing.update(editingListing.id, listingData);
      } else {
        const selectedProduct = products.find(p => p.id === listingData.product_id);
        if (!selectedProduct) {
          console.error("No product selected");
          return;
        }

        let listingsToCreate = listingData.marketplaces.map(marketplace => {
          const { marketplaces, optimizeWithAI, ...commonData } = listingData;
          
          return {
            ...commonData,
            marketplace: marketplace,
            listing_title: commonData.listing_title || selectedProduct.title,
            listing_description: commonData.listing_description || selectedProduct.description,
            listing_price: commonData.listing_price || selectedProduct.price,
          };
        });

        if (listingData.optimizeWithAI) {
          setIsOptimizingAI(true);
          
          try {
            // For now, we'll skip AI optimization since the integration isn't set up
            // In a real app, you'd call the AI service here
            console.log('AI optimization would run here');
          } catch (error) {
            console.error('Error during AI optimization:', error);
          } finally {
            setIsOptimizingAI(false);
          }
        }

        if (listingsToCreate.length > 0) {
          await Listing.bulkCreate(listingsToCreate);
        }
      }
      setShowForm(false);
      setEditingListing(null);
      setPreselectedProductId(null);
      loadData();
    } catch (error) {
      console.error('Error saving listing(s):', error);
      setIsOptimizingAI(false);
    }
  };

  const handleEdit = (listing) => {
    setEditingListing(listing);
    setShowForm(true);
  };

  const handleDelete = async (listingId) => {
    try {
      await Listing.delete(listingId);
      loadData();
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  const getProductTitle = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.title : 'Unknown Product';
  };

  const filteredListings = listings.filter(listing => {
    const productTitle = getProductTitle(listing.product_id);
    const matchesSearch = productTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.listing_title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMarketplace = filters.marketplace === "all" || listing.marketplace === filters.marketplace;
    const matchesStatus = filters.status === "all" || listing.status === filters.status;

    return matchesSearch && matchesMarketplace && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-licorice">
            Listings
          </h1>
          <p className="text-cool-gray">
            Manage your marketplace listings
          </p>
        </div>
        <button 
          className="neumorph-button px-6 py-3 flex items-center gap-2 font-medium text-licorice"
          onClick={() => setShowForm(true)}
        >
          <Plus className="w-4 h-4" />
          Create Listing
        </button>
      </div>

      {/* Search and Filters */}
      <div className="neumorph-card p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cool-gray" />
            <input
              type="text"
              placeholder="Search listings..."
              className="neumorph-input w-full pl-10 pr-4 py-3 font-medium text-licorice"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ListingFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-cool-gray">
            {filteredListings.length} listings found
          </p>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="neumorph-card p-6 animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                productTitle={getProductTitle(listing.product_id)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {!loading && filteredListings.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-cool-gray" />
            <h3 className="text-lg font-medium mb-2 text-licorice">
              No listings found
            </h3>
            <p className="text-cool-gray">
              {searchTerm || filters.marketplace !== "all" || filters.status !== "all"
                ? "Try adjusting your search or filters"
                : "Start by creating your first listing"}
            </p>
          </div>
        )}
      </div>

      {/* Listing Form Modal */}
      {showForm && (
        <ListingForm
          listing={editingListing}
          products={products}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingListing(null);
            setPreselectedProductId(null);
          }}
          isOptimizingAI={isOptimizingAI}
          preselectedProductId={preselectedProductId}
        />
      )}
    </div>
  );
}
