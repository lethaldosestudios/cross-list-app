import React, { useState } from "react";
import { X, Upload, Plus, Trash2 } from "lucide-react";

export default function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price || '',
    cost: product?.cost || '',
    category: product?.category || 'other',
    condition: product?.condition || 'new',
    quantity: product?.quantity || 1,
    weight: product?.weight || '',
    dimensions: product?.dimensions || { length: '', width: '', height: '' },
    photos: product?.photos || [],
    tags: product?.tags || [],
    sku: product?.sku || ''
  });

  const [uploading, setUploading] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    
    try {
      // For now, we'll simulate file upload
      // In a real app, you'd use the UploadFile integration
      const urls = files.map(file => URL.createObjectURL(file));
      
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...urls]
      }));
    } catch (error) {
      console.error('Error uploading photos:', error);
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="neumorph-card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-licorice">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onCancel}
            className="neumorph-button p-2"
          >
            <X className="w-5 h-5 text-cool-gray" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-licorice mb-2">
                Product Title *
              </label>
              <input
                type="text"
                required
                className="neumorph-input w-full"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter product title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-licorice mb-2">
                Category *
              </label>
              <select
                required
                className="neumorph-input w-full"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Garden</option>
                <option value="books">Books</option>
                <option value="collectibles">Collectibles</option>
                <option value="jewelry">Jewelry</option>
                <option value="automotive">Automotive</option>
                <option value="sports">Sports</option>
                <option value="toys">Toys</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-licorice mb-2">
                Price *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                className="neumorph-input w-full"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-licorice mb-2">
                Cost
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="neumorph-input w-full"
                value={formData.cost}
                onChange={(e) => setFormData(prev => ({ ...prev, cost: parseFloat(e.target.value) }))}
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-licorice mb-2">
                Condition *
              </label>
              <select
                required
                className="neumorph-input w-full"
                value={formData.condition}
                onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
              >
                <option value="new">New</option>
                <option value="like_new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-licorice mb-2">
                Quantity *
              </label>
              <input
                type="number"
                required
                min="1"
                className="neumorph-input w-full"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                placeholder="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-licorice mb-2">
              Description
            </label>
            <textarea
              rows="4"
              className="neumorph-input w-full"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-licorice mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="neumorph-input flex-1"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                className="neumorph-button px-4 py-2"
              >
                <Plus className="w-4 h-4 text-cool-gray" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 bg-neumorph-inset rounded-full text-sm text-licorice"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-cool-gray hover:text-licorice"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="neumorph-button px-6 py-3 font-medium text-licorice"
            >
              {product ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="neumorph-button px-6 py-3 font-medium text-cool-gray"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
