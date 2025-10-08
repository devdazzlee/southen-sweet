'use client';

import { useState, useEffect } from 'react';
import AdminDataManager, { Product } from '@/lib/admin-data';
import ProductFilters from '../../../components/product/ProductFilters';
import ProductTable from '../../../components/product/ProductTable';
import AddProductModal from '../../../components/product/AddProductModal';
import EditProductModal from '../../../components/product/EditProductModal';
import ViewProductModal from '../../../components/product/ViewProductModal';
import AddCategoryModal from '../../../components/product/AddCategoryModal';

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[]>(['Licorice', 'Candy', 'Snacks', 'Gifts']);

  const dataManager = AdminDataManager.getInstance();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const productsData = dataManager.getProducts();
      setProducts(productsData);
      setIsLoading(false);
    };

    fetchProducts();
  }, [dataManager]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleAddProduct = (newProduct: Partial<Product>) => {
    const product: Product = {
      id: (products.length + 1).toString(),
      name: newProduct.name || '',
      description: newProduct.description || '',
      price: newProduct.price || 0,
      discount: newProduct.discount || 0,
      category: newProduct.category || '',
      stock: newProduct.stock || 0,
      status: newProduct.status || 'draft',
      image: newProduct.image || '/images/product_1.webp',
      tags: newProduct.tags || [],
      sales: newProduct.sales || 0,
      favorites: newProduct.favorites || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts([...products, product]);
    dataManager.addProduct(product);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    dataManager.updateProduct(updatedProduct.id, updatedProduct);
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      dataManager.deleteProduct(id);
    }
  };

  const handleAddCategory = (categoryName: string) => {
    if (!categories.includes(categoryName)) {
      setCategories([...categories, categoryName]);
    }
  };

  const handleDeleteCategory = (category: string) => {
    if (confirm(`Are you sure you want to delete the category "${category}"? This will affect all products in this category.`)) {
      setCategories(categories.filter(c => c !== category));
      // Update products that use this category
      setProducts(products.map(p => 
        p.category === category ? { ...p, category: 'Uncategorized' } : p
      ));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
        <p className="text-gray-600 mt-1">Manage your licorice product catalog</p>
      </div>

      {/* Filters and Search */}
      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        categories={categories}
        onAddProduct={() => setShowAddModal(true)}
      />

      {/* Products Table */}
      <ProductTable
        products={filteredProducts}
        onEditProduct={handleEditProduct}
        onViewProduct={handleViewProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      {/* Modals */}
      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddProduct}
        categories={categories}
        onAddCategory={() => setShowCategoryModal(true)}
      />

      <EditProductModal
        isOpen={showEditModal}
        product={editingProduct}
        onClose={() => {
          setShowEditModal(false);
          setEditingProduct(null);
        }}
        onSave={handleUpdateProduct}
        categories={categories}
        onAddCategory={() => setShowCategoryModal(true)}
      />

      <ViewProductModal
        isOpen={showViewModal}
        product={selectedProduct}
        onClose={() => {
          setShowViewModal(false);
          setSelectedProduct(null);
        }}
      />

      <AddCategoryModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
}