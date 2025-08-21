import apiService from '../services/api';

export class Listing {
  static async list(sortBy = '-created_date', limit = null) {
    try {
      const response = await apiService.getListings(sortBy, limit);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }
  }

  static async get(id) {
    try {
      const response = await apiService.getListing(id);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching listing:', error);
      throw error;
    }
  }

  static async create(listingData) {
    try {
      const response = await apiService.createListing(listingData);
      return response.data || response;
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  }

  static async update(id, listingData) {
    try {
      const response = await apiService.updateListing(id, listingData);
      return response.data || response;
    } catch (error) {
      console.error('Error updating listing:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const response = await apiService.deleteListing(id);
      return response.data || response;
    } catch (error) {
      console.error('Error deleting listing:', error);
      throw error;
    }
  }

  static async bulkCreate(listingsData) {
    try {
      const response = await apiService.bulkCreateListings(listingsData);
      return response.data || response;
    } catch (error) {
      console.error('Error bulk creating listings:', error);
      throw error;
    }
  }

  static async search(query, filters = {}) {
    try {
      const response = await apiService.searchListings(query, filters);
      return response.data || response;
    } catch (error) {
      console.error('Error searching listings:', error);
      throw error;
    }
  }
}
