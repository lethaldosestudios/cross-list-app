
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
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
    <div className="min-h-screen" style={{ backgroundColor: '#e0e0e0' }}>
      <style>{`
        .neumorph-card {
          background: #e0e0e0;
          border-radius: 20px;
          box-shadow: 
            20px 20px 60px #bebebe,
            -20px -20px 60px #ffffff;
        }
        
        .neumorph-inset {
          background: #e0e0e0;
          border-radius: 15px;
          box-shadow: 
            inset 8px 8px 20px #bebebe,
            inset -8px -8px 20px #ffffff;
        }
        
        .neumorph-button {
          background: #e0e0e0;
          border-radius: 12px;
          box-shadow: 
            8px 8px 16px #bebebe,
            -8px -8px 16px #ffffff;
          transition: all 0.3s ease;
          border: none;
        }
        
        .neumorph-button:hover {
          box-shadow: 
            6px 6px 12px #bebebe,
            -6px -6px 12px #ffffff;
        }
        
        .neumorph-button:active,
        .neumorph-button.pressed {
          box-shadow: 
            inset 4px 4px 8px #bebebe,
            inset -4px -4px 8px #ffffff;
        }
        
        .neumorph-nav {
          background: #e0e0e0;
          border-radius: 25px;
          box-shadow: 
            15px 15px 40px #bebebe,
            -15px -15px 40px #ffffff;
        }
        
        .neumorph-nav-item {
          background: transparent;
          border-radius: 15px;
          transition: all 0.3s ease;
          border: none;
        }
        
        .neumorph-nav-item:hover {
          box-shadow: 
            inset 6px 6px 12px #bebebe,
            inset -6px -6px 12px #ffffff;
        }
        
        .neumorph-nav-item.active {
          box-shadow: 
            inset 8px 8px 16px #bebebe,
            inset -8px -8px 16px #ffffff;
        }
        
        .neumorph-input {
          background: #e0e0e0;
          border-radius: 12px;
          box-shadow: 
            inset 6px 6px 12px #bebebe,
 