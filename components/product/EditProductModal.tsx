'use client';

import { useState, useEffect } from 'react';
import { Plus, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/lib/admin-data';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/axios';

interface EditProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
  categories: string[];
  onAddCategory: () => void;
  isLoading?: boolean;
}

export default function EditProductModal({
  isOpen,
  product,
  onClose,
  onSave,
  categories,
  onAddCategory,
  isLoading = false
}: EditProductModalProps) {
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [priceInput, setPriceInput] = useState<string>('');
  const [flavorInput, setFlavorInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Update editing product when product prop changes
  useEffect(() => {
    if (product) {
      setEditingProduct({ ...product });
      setPriceInput(product.price === 0 ? '' : String(product.price));
      setImagePreview(product.image || '/images/product_1.webp');
      setSelectedImage(null);
    }
  }, [product]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid File',
          description: 'Please select an image file',
          variant: 'destructive',
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File Too Large',
          description: 'Image size should be less than 5MB',
          variant: 'destructive',
        });
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedImage) return null;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await api.upload('/products/upload-image', formData);

      if (response.success && response.data?.imageUrl) {
        toast({
          title: 'Success',
          description: 'Image uploaded successfully',
        });
        return response.data.imageUrl;
      } else {
        throw new Error(response.message || 'Failed to upload image');
      }
    } catch (error: unknown) {
      console.error('Image upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
      toast({
        title: 'Upload Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    if (!editingProduct) return;

    if (!editingProduct.name || !editingProduct.description || !editingProduct.category) {
      toast({
        title: 'Missing Required Fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const updatedProduct = { ...editingProduct };

    if (selectedImage) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) {
        updatedProduct.image = uploadedUrl;
      }
    }

    onSave(updatedProduct);
    onClose();
  };

  if (!isOpen || !product || !editingProduct) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Edit Product</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 active:bg-gray-200 p-1 rounded transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="edit-product-image"
                  />
                  <label htmlFor="edit-product-image" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload new image</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  </label>
                </div>
              </div>
              <div className="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Preview" width={128} height={128} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                )}
              </div>
            </div>
            {selectedImage && (
              <p className="text-sm text-green-600 mt-2">New image selected: {selectedImage.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="flex gap-2">
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <button
                  onClick={onAddCategory}
                  className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 active:bg-orange-800 transition-colors flex items-center"
                  title="Add new category"
                  type="button"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={editingProduct.description}
              onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
              <input
                type="text"
                inputMode="decimal"
                value={priceInput !== '' ? priceInput : (editingProduct.price === 0 ? '' : String(editingProduct.price || ''))}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow empty string, numbers, decimals, and values ending with decimal point
                  if (value === '' || /^\d*\.?\d*$/.test(value) || value.endsWith('.')) {
                    setPriceInput(value);
                    // Only update the numeric value if it's a valid number
                    if (value === '' || value === '.') {
                      setEditingProduct({...editingProduct, price: 0});
                    } else {
                      const numValue = parseFloat(value);
                      if (!isNaN(numValue)) {
                        setEditingProduct({...editingProduct, price: numValue});
                      }
                    }
                  }
                }}
                onBlur={(e) => {
                  const value = e.target.value;
                  if (value === '' || value === '.') {
                    setEditingProduct({...editingProduct, price: 0});
                    setPriceInput('');
                  } else {
                    const numValue = parseFloat(value);
                    if (isNaN(numValue) || numValue < 0) {
                      setEditingProduct({...editingProduct, price: 0});
                      setPriceInput('');
                    } else {
                      setPriceInput(String(numValue));
                      setEditingProduct({...editingProduct, price: numValue});
                    }
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
              <input
                type="text"
                inputMode="numeric"
                value={editingProduct.discount === 0 ? '' : editingProduct.discount || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*\.?\d*$/.test(value)) {
                    const numValue = value === '' ? 0 : parseFloat(value);
                    setEditingProduct({...editingProduct, discount: isNaN(numValue) ? 0 : numValue});
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
              <input
                type="text"
                inputMode="numeric"
                value={editingProduct.stock === 0 ? '' : editingProduct.stock || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d+$/.test(value)) {
                    const numValue = value === '' ? 0 : parseInt(value);
                    setEditingProduct({...editingProduct, stock: isNaN(numValue) ? 0 : numValue});
                  }
                }}
                onBlur={(e) => {
                  const value = parseInt(e.target.value);
                  if (isNaN(value) || value < 0) {
                    setEditingProduct({...editingProduct, stock: 0});
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Flavors</label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={flavorInput}
                  onChange={(e) => setFlavorInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (flavorInput.trim()) {
                        const currentTags = editingProduct.tags || [];
                        setEditingProduct({...editingProduct, tags: [...currentTags, flavorInput.trim()]});
                        setFlavorInput('');
                      }
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g., Strawberry (press Enter to add)"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (flavorInput.trim()) {
                      const currentTags = editingProduct.tags || [];
                      setEditingProduct({...editingProduct, tags: [...currentTags, flavorInput.trim()]});
                      setFlavorInput('');
                    }
                  }}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(editingProduct.tags || []).map((flavor, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                  >
                    {flavor}
                    <button
                      type="button"
                      onClick={() => {
                        const newTags = [...(editingProduct.tags || [])];
                        newTags.splice(index, 1);
                        setEditingProduct({...editingProduct, tags: newTags});
                      }}
                      className="hover:text-orange-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={editingProduct.status}
              onChange={(e) => setEditingProduct({...editingProduct, status: e.target.value as 'draft' | 'active' | 'inactive'})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={uploadingImage || isLoading}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={uploadingImage || isLoading}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 active:bg-orange-800 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadingImage || isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {uploadingImage ? 'Uploading...' : 'Updating...'}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Update Product
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
