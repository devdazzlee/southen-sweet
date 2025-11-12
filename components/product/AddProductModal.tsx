'use client';

import { useState } from 'react';
import { Plus, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/lib/admin-data';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/axios';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
  categories: string[];
  onAddCategory: () => void;
  isLoading?: boolean;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onSave,
  categories,
  onAddCategory,
  isLoading = false
}: AddProductModalProps) {
  const { toast } = useToast();
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    discount: 0,
    category: '',
    stock: 0,
    status: 'draft',
    image: '',
    tags: [],
    sales: 0,
    favorites: 0,
  });
  const [priceInput, setPriceInput] = useState<string>('');
  const [shortDescription, setShortDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [sku, setSku] = useState('');
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [flavorInput, setFlavorInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

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
      setErrors({ ...errors, image: '' }); // Clear error when image is selected
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
    // Reset errors
    const newErrors: {[key: string]: string} = {};

    // Validate all fields
    if (!newProduct.name?.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!newProduct.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!newProduct.price || newProduct.price <= 0) {
      newErrors.price = 'Valid price is required';
    }
    
    if (!newProduct.category?.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!selectedImage && !newProduct.image) {
      newErrors.image = 'Product image is required';
    }

    if (newProduct.stock === undefined || newProduct.stock < 0) {
      newErrors.stock = 'Stock quantity must be 0 or greater';
    }

    // If there are errors, set them and show toast
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly',
        variant: 'destructive',
      });
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    let imageUrl = newProduct.image;

    if (selectedImage) {
      const uploadedUrl = await uploadImage();
      if (!uploadedUrl) {
        toast({
          title: 'Upload Failed',
          description: 'Failed to upload image. Please try again.',
          variant: 'destructive',
        });
        return;
      }
      imageUrl = uploadedUrl;
      console.log('✅ Image uploaded successfully:', imageUrl);
    }

    const productData = {
      ...newProduct,
      image: imageUrl, // This should contain the uploaded URL
      shortDescription,
      brand,
      sku,
      originalPrice,
    };
    
    console.log('💾 Saving product with data:', productData);
    console.log('📸 Image URL being saved:', productData.image);
    onSave(productData);
    
    // Reset form
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      discount: 0,
      category: '',
      stock: 0,
      status: 'draft',
      image: '',
      tags: [],
      sales: 0,
      favorites: 0,
    });
    setPriceInput('');
    setShortDescription('');
    setBrand('');
    setSku('');
    setOriginalPrice(undefined);
    setSelectedImage(null);
    setImagePreview('');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image *</label>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className={`border-2 border-dashed rounded-lg p-4 text-center hover:border-orange-500 transition-colors ${
                  errors.image ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="product-image"
                  />
                  <label htmlFor="product-image" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload image</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  </label>
                </div>
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                )}
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
              <p className="text-sm text-green-600 mt-2">Selected: {selectedImage.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                value={newProduct.name || ''}
                onChange={(e) => {
                  setNewProduct({...newProduct, name: e.target.value});
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <div className="flex gap-2">
                <select
                  value={newProduct.category || ''}
                  onChange={(e) => {
                    setNewProduct({...newProduct, category: e.target.value});
                    if (errors.category) setErrors({ ...errors, category: '' });
                  }}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.category ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select category</option>
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
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Brief product summary (shown in listings)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              value={newProduct.description || ''}
              onChange={(e) => {
                setNewProduct({...newProduct, description: e.target.value});
                if (errors.description) setErrors({ ...errors, description: '' });
              }}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter detailed product description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Product brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Product SKU"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
              <input
                type="text"
                inputMode="decimal"
                value={priceInput !== '' ? priceInput : (newProduct.price === 0 ? '' : String(newProduct.price || ''))}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow empty string, numbers, decimals, and values ending with decimal point
                  if (value === '' || /^\d*\.?\d*$/.test(value) || value.endsWith('.')) {
                    setPriceInput(value);
                    // Only update the numeric value if it's a valid number
                    if (value === '' || value === '.') {
                      setNewProduct({...newProduct, price: 0});
                    } else {
                      const numValue = parseFloat(value);
                      if (!isNaN(numValue)) {
                        setNewProduct({...newProduct, price: numValue});
                      }
                    }
                    if (errors.price) setErrors({ ...errors, price: '' });
                  }
                }}
                onBlur={(e) => {
                  const value = e.target.value;
                  if (value === '' || value === '.') {
                    setNewProduct({...newProduct, price: 0});
                    setPriceInput('');
                  } else {
                    const numValue = parseFloat(value);
                    if (isNaN(numValue) || numValue < 0) {
                      setNewProduct({...newProduct, price: 0});
                      setPriceInput('');
                    } else {
                      setPriceInput(String(numValue));
                      setNewProduct({...newProduct, price: numValue});
                    }
                  }
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.price ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Original Price ($)</label>
              <input
                type="text"
                inputMode="decimal"
                value={originalPrice || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*\.?\d*$/.test(value)) {
                    const numValue = value === '' ? undefined : parseFloat(value);
                    setOriginalPrice(isNaN(numValue as number) ? undefined : numValue);
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
                value={newProduct.discount === 0 ? '' : newProduct.discount || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*\.?\d*$/.test(value)) {
                    const numValue = value === '' ? 0 : parseFloat(value);
                    setNewProduct({...newProduct, discount: isNaN(numValue) ? 0 : numValue});
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
              <input
                type="text"
                inputMode="numeric"
                value={newProduct.stock === 0 ? '' : newProduct.stock || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d+$/.test(value)) {
                    const numValue = value === '' ? 0 : parseInt(value);
                    setNewProduct({...newProduct, stock: isNaN(numValue) ? 0 : numValue});
                    if (errors.stock) setErrors({ ...errors, stock: '' });
                  }
                }}
                onBlur={(e) => {
                  const value = parseInt(e.target.value);
                  if (isNaN(value) || value < 0) {
                    setNewProduct({...newProduct, stock: 0});
                  }
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.stock ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
              )}
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
                        const currentTags = newProduct.tags || [];
                        setNewProduct({...newProduct, tags: [...currentTags, flavorInput.trim()]});
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
                      const currentTags = newProduct.tags || [];
                      setNewProduct({...newProduct, tags: [...currentTags, flavorInput.trim()]});
                      setFlavorInput('');
                    }
                  }}
                  className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 active:bg-orange-800 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </button>
              </div>
              {newProduct.tags && newProduct.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newProduct.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => {
                          const newTags = [...(newProduct.tags || [])];
                          newTags.splice(index, 1);
                          setNewProduct({...newProduct, tags: newTags});
                        }}
                        className="ml-2 text-orange-600 hover:text-orange-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="px-6 pb-6 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={uploadingImage || isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={uploadingImage || isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center transition-colors"
          >
            {uploadingImage || isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {uploadingImage ? 'Uploading...' : 'Saving...'}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Product
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
