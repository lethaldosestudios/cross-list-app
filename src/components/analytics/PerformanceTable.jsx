import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function PerformanceTable({ listings, products, loading }) {
  if (loading) {
    return (
      <div className="neumorph-card p-6">
        <h3 className="text-lg font-bold mb-4 text-licorice">Performance Metrics</h3>
        <div className="space-y-3">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="h-12 bg-gray-300 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const getProductTitle = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.title : 'Unknown Product';
  };

  const calculateMetrics = () => {
    const totalListings = listings.length;
    const activeListings = listings.filter(l => l.status === 'active').length;
    const soldListings = listings.filter(l => l.status === 'sold').length;
    const totalViews = listings.reduce((sum, l) => sum + (l.views || 0), 0);
    const totalRevenue = soldListings.reduce((sum, l) => sum + (l.listing_price || 0), 0);
    
    const conversionRate = totalListings > 0 ? (soldListings / totalListings * 100).toFixed(1) : 0;
    const avgViewsPerListing = totalListings > 0 ? (totalViews / totalListings).toFixed(1) : 0;
    const avgRevenuePerSale = soldListings > 0 ? (totalRevenue / soldListings).toFixed(2) : 0;

    return {
      totalListings,
      activeListings,
      soldListings,
      totalViews,
      totalRevenue,
      conversionRate,
      avgViewsPerListing,
      avgRevenuePerSale
    };
  };

  const metrics = calculateMetrics();

  const topPerformers = listings
    .filter(l => l.views > 0)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5)
    .map(listing => ({
      ...listing,
      productTitle: getProductTitle(listing.product_id),
      performance: listing.views > 10 ? 'high' : listing.views > 5 ? 'medium' : 'low'
    }));

  const getPerformanceIcon = (performance) => {
    switch (performance) {
      case 'high':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'medium':
        return <Minus className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="neumorph-card p-6">
      <h3 className="text-lg font-bold mb-4 text-licorice">Performance Metrics</h3>
      
      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-licorice">{metrics.totalListings}</p>
          <p className="text-sm text-cool-gray">Total Listings</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-licorice">{metrics.conversionRate}%</p>
          <p className="text-sm text-cool-gray">Conversion Rate</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-licorice">{metrics.avgViewsPerListing}</p>
          <p className="text-sm text-cool-gray">Avg Views/Listing</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-licorice">${metrics.avgRevenuePerSale}</p>
          <p className="text-sm text-cool-gray">Avg Revenue/Sale</p>
        </div>
      </div>

      {/* Top Performers Table */}
      <div>
        <h4 className="text-md font-semibold mb-3 text-licorice">Top Performing Listings</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-cool-gray">Product</th>
                <th className="text-left py-2 text-sm font-medium text-cool-gray">Marketplace</th>
                <th className="text-left py-2 text-sm font-medium text-cool-gray">Views</th>
                <th className="text-left py-2 text-sm font-medium text-cool-gray">Status</th>
                <th className="text-left py-2 text-sm font-medium text-cool-gray">Performance</th>
              </tr>
            </thead>
            <tbody>
              {topPerformers.map((listing) => (
                <tr key={listing.id} className="border-b border-gray-100">
                  <td className="py-2 text-sm text-licorice">
                    <div className="max-w-xs truncate" title={listing.productTitle}>
                      {listing.productTitle}
                    </div>
                  </td>
                  <td className="py-2 text-sm text-cool-gray capitalize">
                    {listing.marketplace}
                  </td>
                  <td className="py-2 text-sm text-licorice font-medium">
                    {listing.views || 0}
                  </td>
                  <td className="py-2 text-sm">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        listing.status === 'active' ? 'bg-green-100 text-green-800' :
                        listing.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td className="py-2 text-sm">
                    {getPerformanceIcon(listing.performance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {topPerformers.length === 0 && (
          <div className="text-center py-8 text-cool-gray">
            <p>No performance data available yet.</p>
            <p className="text-sm">Create some listings to see performance metrics.</p>
          </div>
        )}
      </div>
    </div>
  );
}
