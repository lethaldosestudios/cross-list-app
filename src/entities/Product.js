import apiService from '../services/api';

export class Product {
  static async list(sortBy = '-created_date', limit = null) {
    try {
      const response = await apiService.getProducts(sortBy, limit);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async get(id) {
    try {
      const response = await apiService.getProduct(id);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  static async create(productData) {
    try {
      const response = await apiService.createProduct(productData);
      return response.data || response;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  static async update(id, productData) {
    try {
      const response = await apiService.updateProduct(id, productData);
      return response.data || response;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const response = await apiService.deleteProduct(id);
      return response.data || response;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  static async search(query, filters = {}) {
    try {
      const response = await apiService.searchProducts(query, filters);
      return response.data || response;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
}
