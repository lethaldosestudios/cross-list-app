export const createPageUrl = (pageName) => {
  const pageMap = {
    'Dashboard': '/dashboard',
    'Products': '/products',
    'Listings': '/listings',
    'Analytics': '/analytics'
  };
  
  return pageMap[pageName] || '/dashboard';
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatNumber = (number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  }
  return number.toString();
};

export const getStatusColor = (status) => {
  const statusColors = {
    'active': '#10b981', // green
    'sold': '#3b82f6',   // blue
    'draft': '#6b7280',  // gray
    'ended': '#f59e0b',  // yellow
    'suspended': '#ef4444' // red
  };
  return statusColors[status] || '#6b7280';
};

export const getMarketplaceColor = (marketplace) => {
  const marketplaceColors = {
    'ebay': '#86bc25',
    'amazon': '#ff9900',
    'facebook': '#1877f2',
    'mercari': '#ff6b35',
    'poshmark': '#e31b23',
    'depop': '#ff0066',
    'etsy': '#f56400',
    'shopify': '#95bf47'
  };
  return marketplaceColors[marketplace] || '#8c86aa';
};


