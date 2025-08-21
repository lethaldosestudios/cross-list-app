const API_BASE_URL = 'https://app.base44.com/api';
const APP_ID = '688afcf95a535475ff04a23e';
const API_KEY = '53ebd5ac5fed465da72f120dbce0517c';

class ApiService {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/apps/${APP_ID}`;
    this.headers = {
      'api_key': API_KEY,
      'Content-Type': 'application/json'
    };
  }

  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const config = {
        headers: this.headers,
        ...options
      };

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Product API methods
  async getProducts(sortBy = '-created_date', limit = null) {
    let endpoint = '/entities/Product';
    if (sortBy) endpoint += `?sort=${sortBy}`;
    if (limit) endpoint += `${sortBy ? '&' : '?'}limit=${limit}`;
    
    return this.request(endpoint);
  }

  async getProduct(id) {
    return this.request(`/entities/Product/${id}`);
  }

  async createProduct(productData) {
    return this.request('/entities/Product', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/entities/Product/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  }

  async deleteProduct(id) {
    return this.request(`/entities/Product/${id}`, {
      method: 'DELETE'
    });
  }

  // Listing API methods
  async getListings(sortBy = '-created_date', limit = null) {
    let endpoint = '/entities/Listing';
    if (sortBy) endpoint += `?sort=${sortBy}`;
    if (limit) endpoint += `${sortBy ? '&' : '?'}limit=${limit}`;
    
    return this.request(endpoint);
  }

  async getListing(id) {
    return this.request(`/entities/Listing/${id}`);
  }

  async createListing(listingData) {
    return this.request('/entities/Listing', {
      method: 'POST',
      body: JSON.stringify(listingData)
    });
  }

  async updateListing(id, listingData) {
    return this.request(`/entities/Listing/${id}`, {
      method: 'PUT',
      body: JSON.stringify(listingData)
    });
  }

  async deleteListing(id) {
    return this.request(`/entities/Listing/${id}`, {
      method: 'DELETE'
    });
  }

  async bulkCreateListings(listingsData) {
    const promises = listingsData.map(listing => this.createListing(listing));
    return Promise.all(promises);
  }

  // Search and filter methods
  async searchProducts(query, filters = {}) {
    let endpoint = '/entities/Product?';
    const params = new URLSearchParams();
    
    if (query) params.append('search', query);
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.condition && filters.condition !== 'all') params.append('condition', filters.condition);
    
    endpoint += params.toString();
    return this.request(endpoint);
  }

  async searchListings(query, filters = {}) {
    let endpoint = '/entities/Listing?';
    const params = new URLSearchParams();
    
    if (query) params.append('search', query);
    if (filters.marketplace && filters.marketplace !== 'all') params.append('marketplace', filters.marketplace);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    
    endpoint += params.toString();
    return this.request(endpoint);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
