import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function CategoryChart({ products, listings, loading }) {
  if (loading) {
    return (
      <div className="neumorph-card p-6">
        <h3 className="text-lg font-bold mb-4 text-licorice">Category Performance</h3>
        <div className="h-64 bg-gray-300 rounded animate-pulse"></div>
      </div>
    );
  }

  const categoryData = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = {
        name: product.category.charAt(0).toUpperCase() + product.category.slice(1),
        products: 0,
        listings: 0,
        revenue: 0
      };
    }
    acc[product.category].products += 1;
    
    // Count listings for this product
    const productListings = listings.filter(l => l.product_id === product.id);
    acc[product.category].listings += productListings.length;
    
    // Calculate revenue from sold listings
    const soldListings = productListings.filter(l => l.status === 'sold');
    acc[product.category].revenue += soldListings.reduce((sum, l) => sum + (l.listing_price || 0), 0);
    
    return acc;
  }, {});

  const chartData = Object.values(categoryData).filter(cat => cat.products > 0);
  const COLORS = ['#81559b', '#8c86aa', '#daff7d', '#ebf2fa', '#14080e', '#ff6b6b', '#4ecdc4', '#45b7d1'];

  return (
    <div className="neumorph-card p-6">
      <h3 className="text-lg font-bold mb-4 text-licorice">Category Performance</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, products }) => `${name}: ${products}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="products"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: '#f8f9fa',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value, name) => [value, name === 'products' ? 'Products' : name]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2">
        {chartData.slice(0, 5).map((category, index) => (
          <div key={category.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-licorice">{category.name}</span>
            </div>
            <div className="text-right">
              <p className="text-licorice font-medium">{category.products} products</p>
              <p className="text-cool-gray text-xs">{category.listings} listings</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
