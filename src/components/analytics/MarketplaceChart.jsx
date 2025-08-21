import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

export default function MarketplaceChart({ listings, loading }) {
  if (loading) {
    return (
      <div className="neumorph-card p-6">
        <h3 className="text-lg font-bold mb-4 text-licorice">Marketplace Performance</h3>
        <div className="h-64 bg-gray-300 rounded animate-pulse"></div>
      </div>
    );
  }

  const marketplaceData = listings.reduce((acc, listing) => {
    if (!acc[listing.marketplace]) {
      acc[listing.marketplace] = { 
        name: listing.marketplace.charAt(0).toUpperCase() + listing.marketplace.slice(1),
        listings: 0,
        views: 0,
        sold: 0,
        revenue: 0
      };
    }
    acc[listing.marketplace].listings += 1;
    acc[listing.marketplace].views += listing.views || 0;
    if (listing.status === 'sold') {
      acc[listing.marketplace].sold += 1;
      acc[listing.marketplace].revenue += listing.listing_price || 0;
    }
    return acc;
  }, {});

  const chartData = Object.values(marketplaceData);

  return (
    <div className="neumorph-card p-6">
      <h3 className="text-lg font-bold mb-4 text-licorice">Marketplace Performance</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="name" 
            stroke="#8c86aa"
            fontSize={12}
          />
          <YAxis 
            stroke="#8c86aa"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#f8f9fa',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar 
            dataKey="listings" 
            fill="#81559b" 
            name="Listings"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="views" 
            fill="#8c86aa" 
            name="Views"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="sold" 
            fill="#daff7d" 
            name="Sold"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <p className="text-cool-gray">Total Listings</p>
          <p className="text-lg font-bold text-licorice">
            {listings.length}
          </p>
        </div>
        <div className="text-center">
          <p className="text-cool-gray">Total Views</p>
          <p className="text-lg font-bold text-licorice">
            {listings.reduce((sum, l) => sum + (l.views || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
