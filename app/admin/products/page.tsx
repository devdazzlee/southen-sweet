'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/admin-data';
import ProductFilters from '../../../components/product/ProductFilters';
import ProductTable from '../../../components/product/ProductTable';
import AddProductModal from '../../../components/product/AddProductModal';
import EditProductModal from '../../../components/product/EditProductModal';
import ViewProductModal from '../../../components/product/ViewProductModal';
import AddCategoryModal from '../../../components/product/AddCategoryModal';
import { api } from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ProductManagement() {
  const { toast } = useToast();
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
  const [categories, setCategories] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/products', { limit: 100 });
      
      if (response.success && response.data && response.data.products) {
        const formattedProducts = response.data.products.map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: Number(p.price),
          discount: p.discount || 0,
          category: p.category || 'Uncategorized',
          stock: p.stock || 0,
          status: p.isActive ? 'active' : 'draft',
          image: p.image || '/images/product_1.webp',
          tags: p.tags || [],
          sales: p.soldCount || 0,
          favorites: p.favoriteCount || 0,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        }));
        setProducts(formattedProducts);
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      if (response.success && response.data && response.data.categories) {
        // Filter out inactive categories and "Uncategorized"
        const activeCategories = response.data.categories
          .filter((c: any) => c.isActive && c.name && c.name !== 'Uncategorized')
          .map((c: any) => c.name);
        
        if (activeCategories.length === 0) {
          toast({
            title: 'No Categories',
            description: 'Please create at least one active category before adding products',
            variant: 'destructive',
          });
        }
        
        setCategories(activeCategories);
      }
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch categories',
        variant: 'destructive',
      });
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleAddProduct = async (productData: any) => {
    try {
      // Validate required fields
      if (!productData.name || !productData.description || !productData.category) {
        toast({
          title: 'Validation Error',
          description: 'Please fill in all required fields (Name, Description, Category)',
          variant: 'destructive',
        });
        return;
      }

      if (!productData.price || productData.price <= 0) {
        toast({
          title: 'Validation Error',
          description: 'Please enter a valid price greater than 0',
          variant: 'destructive',
        });
        return;
      }

      if (!categories.includes(productData.category)) {
        toast({
          title: 'Invalid Category',
          description: 'Please select a valid category',
          variant: 'destructive',
        });
        return;
      }

      if (!productData.image || productData.image.trim() === '') {
        toast({
          title: 'Image Required',
          description: 'Please upload a product image',
          variant: 'destructive',
        });
        return;
      }

      setIsAdding(true);
      console.log('📤 Sending product data to API:', productData);
      console.log('📸 Image URL in productData:', productData.image);

      const requestBody = {
        name: productData.name,
        description: productData.description,
        shortDescription: productData.shortDescription || '',
        price: parseFloat(productData.price as any),
        originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice as any) : null,
        discount: productData.discount ? parseInt(productData.discount as any) : 0,
        stock: productData.stock || 0,
        category: productData.category,
        brand: productData.brand || '',
        sku: productData.sku || `SKU-${Date.now()}`,
        image: productData.image || '',
        isActive: productData.status === 'active',
      };

      console.log('📦 Request body being sent:', requestBody);
      console.log('🖼️ Image field in request:', requestBody.image);

      const response = await api.post('/products', requestBody);

      if (response.success) {
        toast({
          title: 'Success',
          description: 'Product added successfully',
        });
        fetchProducts();
        setShowAddModal(false);
      }
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || error.message || 'Failed to add product',
        variant: 'destructive',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      // Validate required fields
      if (!updatedProduct.name || !updatedProduct.description || !updatedProduct.category) {
        toast({
          title: 'Validation Error',
          description: 'Please fill in all required fields',
          variant: 'destructive',
        });
        return;
      }

      if (!updatedProduct.price || updatedProduct.price <= 0) {
        toast({
          title: 'Validation Error',
          description: 'Please enter a valid price greater than 0',
          variant: 'destructive',
        });
        return;
      }

      setIsUpdating(true);
      const response = await api.put(`/products/${updatedProduct.id}`, {
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        discount: updatedProduct.discount || 0,
        stock: updatedProduct.stock || 0,
        category: updatedProduct.category,
        brand: updatedProduct.brand || '',
        sku: updatedProduct.sku,
        image: updatedProduct.image,
        isActive: updatedProduct.status === 'active',
      });

      if (response.success) {
        toast({
          title: 'Success',
          description: 'Product updated successfully',
        });
        fetchProducts();
        setShowEditModal(false);
        setEditingProduct(null);
      }
    } catch (error: any) {
      console.error('Error updating product:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || error.message || 'Failed to update product',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      setIsDeleting(true);
      const response = await api.delete(`/products/${productToDelete}`);

      if (response.success) {
        toast({
          title: 'Success',
          description: 'Product deleted successfully',
        });
        fetchProducts();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete product',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleAddCategory = async (categoryName: string) => {
    try {
      const response = await api.post('/categories', {
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
      });

      if (response.success) {
        toast({
          title: 'Success',
          description: 'Category added successfully',
        });
        fetchCategories();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to add category',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteCategory = async (category: string) => {
    if (confirm(`Are you sure you want to delete the category "${category}"? This will affect all products in this category.`)) {
      try {
        // Note: You'll need to get the category ID first, or modify the API to support delete by name
        toast({
          title: 'Info',
          description: 'Category deletion needs to be implemented with category ID',
        });
        // const response = await api.delete(`/categories/${categoryId}`);
        // fetchCategories();
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to delete category',
          variant: 'destructive',
        });
      }
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
        isDeleting={isDeleting}
        deletingProductId={productToDelete}
      />

      {/* Modals */}
        <AddProductModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddProduct}
          categories={categories}
          onAddCategory={() => setShowCategoryModal(true)}
          isLoading={isAdding}
        />

      <EditProductModal
        isOpen={showEditModal}
        product={editingProduct}
        onClose={() => {
          setShowEditModal(false);
          setEditingProduct(null);
        }}
        onSave={handleUpdateProduct}
        isLoading={isUpdating}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}