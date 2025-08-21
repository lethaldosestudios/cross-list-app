import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
import { 
  Grid3X3, 
  Package, 
  TrendingUp, 
  Settings, 
  BarChart3,
  ShoppingCart,
  Menu,
  X
} from "lucide-react";

const navigationItems = [
  { title: "Dashboard", url: createPageUrl("Dashboard"), icon: Grid3X3 },
  { title: "Products", url: createPageUrl("Products"), icon: Package },
  { title: "Listings", url: createPageUrl("Listings"), icon: ShoppingCart },
  { title: "Analytics", url: createPageUrl("Analytics"), icon: BarChart3 },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neumorph-bg">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="neumorph-button p-3"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-licorice" />
          ) : (
            <Menu className="w-6 h-6 text-licorice" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full neumorph-nav p-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-licorice">CrossList</h1>
            <p className="text-sm text-cool-gray">Marketplace Manager</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.url;
              
              return (
                <Link key={item.title} to={item.url}>
                  <button
                    className={`neumorph-nav-item w-full p-4 text-left transition-all ${
                      isActive ? 'active' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" style={{ color: isActive ? '#81559b' : '#8b8b8b' }} />
                      <span 
                        className="font-medium"
                        style={{ color: isActive ? '#81559b' : '#6b6b6b' }}
                      >
                        {item.title}
                      </span>
                    </div>
                  </button>
                </Link>
              );
            })}
          </nav>

          {/* Settings Link */}
          <div className="absolute bottom-6 left-6 right-6">
            <Link to="/settings">
              <button className="neumorph-nav-item w-full p-4 text-left transition-all">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5" style={{ color: '#8b8b8b' }} />
                  <span className="font-medium" style={{ color: '#6b6b6b' }}>
                    Settings
                  </span>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <div className="neumorph-nav p-4 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-licorice">{currentPageName}</h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Add any top bar actions here */}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="px-6 pb-8">
          {children}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
