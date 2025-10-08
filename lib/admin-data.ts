// Admin Data Management System
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive' | 'draft';
  image: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  favorites: number;
  sales: number;
  tags?: string[];
  nutritionFacts?: {
    calories: number;
    sugar: number;
    fat: number;
    protein: number;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'banned';
  registrationDate: string;
  lastLogin: string;
  totalOrders: number;
  totalSpent: number;
  favoriteProducts: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences: {
    newsletter: boolean;
    notifications: boolean;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
  status: 'published' | 'pending' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  content: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
}

// Mock Data Generator
export class AdminDataManager {
  private static instance: AdminDataManager;
  private products: Product[] = [];
  private orders: Order[] = [];
  private customers: Customer[] = [];
  private testimonials: Testimonial[] = [];
  private reviews: Review[] = [];

  private constructor() {
    this.initializeData();
  }

  public static getInstance(): AdminDataManager {
    if (!AdminDataManager.instance) {
      AdminDataManager.instance = new AdminDataManager();
    }
    return AdminDataManager.instance;
  }

  private initializeData() {
    // Initialize with mock data
    this.products = [
      {
        id: '1',
        name: 'Classic Black Licorice',
        description: 'Traditional black licorice with authentic flavor and perfect texture',
        price: 15.99,
        discount: 10,
        category: 'Classic',
        stock: 45,
        status: 'active',
        image: '/images/product_1.webp',
        images: ['/images/product_1.webp', '/images/product_2.webp'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15',
        favorites: 89,
        sales: 156,
        tags: ['traditional', 'black', 'classic'],
        nutritionFacts: {
          calories: 120,
          sugar: 25,
          fat: 0,
          protein: 1
        }
      },
      {
        id: '2',
        name: 'Red Twists',
        description: 'Sweet red licorice twists with a perfect chewy texture',
        price: 12.99,
        category: 'Twists',
        stock: 12,
        status: 'active',
        image: '/images/product_2.webp',
        images: ['/images/product_2.webp'],
        createdAt: '2024-01-02',
        updatedAt: '2024-01-14',
        favorites: 76,
        sales: 134,
        tags: ['red', 'twists', 'sweet'],
        nutritionFacts: {
          calories: 110,
          sugar: 22,
          fat: 0,
          protein: 1
        }
      },
      {
        id: '3',
        name: 'Green Apple Ropes',
        description: 'Tart green apple flavored licorice ropes',
        price: 14.99,
        category: 'Fruity',
        stock: 3,
        status: 'active',
        image: '/images/product_3.webp',
        images: ['/images/product_3.webp'],
        createdAt: '2024-01-03',
        updatedAt: '2024-01-13',
        favorites: 54,
        sales: 98,
        tags: ['green', 'apple', 'tart'],
        nutritionFacts: {
          calories: 115,
          sugar: 23,
          fat: 0,
          protein: 1
        }
      },
      {
        id: '4',
        name: 'Strawberry Swirls',
        description: 'Sweet strawberry licorice with beautiful swirl pattern',
        price: 16.99,
        category: 'Swirls',
        stock: 28,
        status: 'active',
        image: '/images/product_4.webp',
        images: ['/images/product_4.webp'],
        createdAt: '2024-01-04',
        updatedAt: '2024-01-12',
        favorites: 43,
        sales: 87,
        tags: ['strawberry', 'swirls', 'sweet'],
        nutritionFacts: {
          calories: 125,
          sugar: 26,
          fat: 0,
          protein: 1
        }
      },
      {
        id: '5',
        name: 'Cherry Bombs',
        description: 'Bold cherry flavored licorice with intense flavor',
        price: 13.99,
        category: 'Fruity',
        stock: 0,
        status: 'inactive',
        image: '/images/product_5.webp',
        images: ['/images/product_5.webp'],
        createdAt: '2024-01-05',
        updatedAt: '2024-01-11',
        favorites: 38,
        sales: 76,
        tags: ['cherry', 'bold', 'intense'],
        nutritionFacts: {
          calories: 118,
          sugar: 24,
          fat: 0,
          protein: 1
        }
      },
      {
        id: '6',
        name: 'Vanilla Cream',
        description: 'Smooth vanilla cream licorice with rich flavor',
        price: 17.99,
        category: 'Cream',
        stock: 15,
        status: 'draft',
        image: '/images/product_6.webp',
        images: ['/images/product_6.webp'],
        createdAt: '2024-01-06',
        updatedAt: '2024-01-10',
        favorites: 0,
        sales: 0,
        tags: ['vanilla', 'cream', 'smooth'],
        nutritionFacts: {
          calories: 130,
          sugar: 28,
          fat: 0,
          protein: 1
        }
      }
    ];

    this.orders = [
      {
        id: '1',
        orderNumber: 'ORD-2024-001',
        customer: {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1 (555) 123-4567',
        },
        items: [
          { productId: '1', name: 'Classic Black Licorice', quantity: 2, price: 15.99, image: '/images/product_1.webp' },
          { productId: '2', name: 'Red Twists', quantity: 1, price: 12.99, image: '/images/product_2.webp' },
        ],
        total: 44.97,
        status: 'pending',
        paymentStatus: 'paid',
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        notes: 'Customer requested express shipping',
      },
      {
        id: '2',
        orderNumber: 'ORD-2024-002',
        customer: {
          name: 'Mike Chen',
          email: 'mike.chen@email.com',
          phone: '+1 (555) 234-5678',
        },
        items: [
          { productId: '3', name: 'Green Apple Ropes', quantity: 3, price: 14.99, image: '/images/product_3.webp' },
        ],
        total: 44.97,
        status: 'processing',
        paymentStatus: 'paid',
        shippingAddress: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA',
        },
        createdAt: '2024-01-15T14:20:00Z',
        updatedAt: '2024-01-15T15:45:00Z',
      },
      {
        id: '3',
        orderNumber: 'ORD-2024-003',
        customer: {
          name: 'Emily Davis',
          email: 'emily.davis@email.com',
          phone: '+1 (555) 345-6789',
        },
        items: [
          { productId: '4', name: 'Strawberry Swirls', quantity: 1, price: 16.99, image: '/images/product_4.webp' },
          { productId: '5', name: 'Cherry Bombs', quantity: 2, price: 13.99, image: '/images/product_5.webp' },
        ],
        total: 44.97,
        status: 'shipped',
        paymentStatus: 'paid',
        shippingAddress: {
          street: '789 Pine St',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA',
        },
        createdAt: '2024-01-14T09:15:00Z',
        updatedAt: '2024-01-15T11:30:00Z',
        trackingNumber: 'TRK123456789',
      }
    ];

    this.customers = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        status: 'active',
        registrationDate: '2023-12-01',
        lastLogin: '2024-01-15',
        totalOrders: 12,
        totalSpent: 456.78,
        favoriteProducts: 5,
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        preferences: {
          newsletter: true,
          notifications: true,
        },
      },
      {
        id: '2',
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        phone: '+1 (555) 234-5678',
        status: 'active',
        registrationDate: '2023-11-15',
        lastLogin: '2024-01-14',
        totalOrders: 8,
        totalSpent: 234.50,
        favoriteProducts: 3,
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA',
        },
        preferences: {
          newsletter: false,
          notifications: true,
        },
      }
    ];

    this.testimonials = [
      {
        id: '1',
        name: 'Sarah Johnson',
        role: 'Licorice Enthusiast',
        content: 'The best licorice I\'ve ever tasted! The quality is outstanding and the flavors are amazing.',
        rating: 5,
        image: '/images/user1.png',
        status: 'published',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-10',
      },
      {
        id: '2',
        name: 'Mike Chen',
        role: 'Candy Collector',
        content: 'Great variety of flavors and excellent customer service. Highly recommended!',
        rating: 5,
        image: '/images/user2.png',
        status: 'published',
        createdAt: '2024-01-12',
        updatedAt: '2024-01-12',
      }
    ];

    this.reviews = [
      {
        id: '1',
        productId: '1',
        productName: 'Classic Black Licorice',
        customerName: 'Lisa Brown',
        customerEmail: 'lisa.brown@email.com',
        rating: 5,
        content: 'Absolutely delicious! The texture is perfect and the flavor is authentic.',
        status: 'approved',
        createdAt: '2024-01-15',
      },
      {
        id: '2',
        productId: '2',
        productName: 'Red Twists',
        customerName: 'John Smith',
        customerEmail: 'john.smith@email.com',
        rating: 4,
        content: 'Great taste, but could be a bit softer. Overall satisfied with the purchase.',
        status: 'pending',
        createdAt: '2024-01-14',
      }
    ];
  }

  // Product CRUD Operations
  public getProducts(): Product[] {
    return this.products;
  }

  public getProduct(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  public addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'favorites' | 'sales'>): Product {
    const newProduct: Product = {
      ...product,
      id: (this.products.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorites: 0,
      sales: 0,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.products[index];
  }

  public deleteProduct(id: string): boolean {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.products.splice(index, 1);
    return true;
  }

  // Order CRUD Operations
  public getOrders(): Order[] {
    return this.orders;
  }

  public getOrder(id: string): Order | undefined {
    return this.orders.find(o => o.id === id);
  }

  public updateOrderStatus(id: string, status: Order['status']): Order | null {
    const order = this.getOrder(id);
    if (!order) return null;
    
    order.status = status;
    order.updatedAt = new Date().toISOString();
    return order;
  }

  // Customer CRUD Operations
  public getCustomers(): Customer[] {
    return this.customers;
  }

  public getCustomer(id: string): Customer | undefined {
    return this.customers.find(c => c.id === id);
  }

  public updateCustomerStatus(id: string, status: Customer['status']): Customer | null {
    const customer = this.getCustomer(id);
    if (!customer) return null;
    
    customer.status = status;
    return customer;
  }

  // Testimonial CRUD Operations
  public getTestimonials(): Testimonial[] {
    return this.testimonials;
  }

  public updateTestimonialStatus(id: string, status: Testimonial['status']): Testimonial | null {
    const testimonial = this.testimonials.find(t => t.id === id);
    if (!testimonial) return null;
    
    testimonial.status = status;
    testimonial.updatedAt = new Date().toISOString();
    return testimonial;
  }

  // Review CRUD Operations
  public getReviews(): Review[] {
    return this.reviews;
  }

  public updateReviewStatus(id: string, status: Review['status']): Review | null {
    const review = this.reviews.find(r => r.id === id);
    if (!review) return null;
    
    review.status = status;
    return review;
  }

  // Analytics
  public getDashboardStats() {
    const totalRevenue = this.orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = this.orders.length;
    const totalCustomers = this.customers.length;
    const totalProducts = this.products.length;
    const lowStockItems = this.products.filter(p => p.stock <= 5 && p.status === 'active').length;
    const pendingOrders = this.orders.filter(o => o.status === 'pending').length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const conversionRate = 3.2; // Mock data

    return {
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      lowStockItems,
      pendingOrders,
      avgOrderValue,
      conversionRate,
    };
  }
}

export default AdminDataManager;
