import React from "react";

export default function StatsCard({ title, value, icon: Icon, loading }) {
  return (
    <div className="neumorph-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium mb-2 text-cool-gray">
            {title}
          </p>
          {loading ? (
            <div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
          ) : (
            <p className="text-2xl font-bold text-licorice">
              {value}
            </p>
          )}
        </div>
        <div className="neumorph-button p-3">
          <Icon className="w-6 h-6 text-cool-gray" />
        </div>
      </div>
    </div>
  );
}
