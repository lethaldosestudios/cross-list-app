import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export default function PerformanceChart({ listings }) {
  const marketplaceData = listings.reduce((acc, listing) => {
    if (!acc[listing.marketplace]) {
      acc[listing.marketplace] = { 
        name: listing.marketplace.charAt(0).toUpperCase() + listing.marketplace.slice(1),
        listings: 0,
        views: 0,
        sold: 0
      };
    }
    acc[listing.marketplace].listings += 1;
    acc[listing.marketplace].views += listing.views || 0;
    if (listing.status === 'sold') {
      acc[listing.marketplace].sold += 1;
    }
    return acc;
  }, {});

  const chartData = Object.values(marketplaceData);

  return (
    <div className="neumorph-card p-6">
      <h2 className="text-xl font-bold mb-6 text-licorice">
        Performance by Marketplace
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6b6b6b', fontSize: 12 }}
              axisLine={{ stroke: '#bebebe' }}
            />
            <YAxis 
              tick={{ fill: '#6b6b6b', fontSize: 12 }}
              axisLine={{ stroke: '#bebebe' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#e0e0e0', 
                border: 'none',
                borderRadius: '12px',
                boxShadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff'
              }}
            />
            <Bar dataKey="views" fill="#8b8b8b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
