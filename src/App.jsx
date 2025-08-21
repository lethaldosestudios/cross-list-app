import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Listings from './pages/Listings';
import Analytics from './pages/Analytics';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={
          <Layout currentPageName="Dashboard">
            <Dashboard />
          </Layout>
        } />
        <Route path="/products" element={
          <Layout currentPageName="Products">
            <Products />
          </Layout>
        } />
        <Route path="/listings" element={
          <Layout currentPageName="Listings">
            <Listings />
          </Layout>
        } />
        <Route path="/analytics" element={
          <Layout currentPageName="Analytics">
            <Analytics />
          </Layout>
        } />
      </Routes>
    </div>
  );
}

export default App;
