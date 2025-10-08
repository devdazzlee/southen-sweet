# Licorice Ropes - Super Admin Dashboard

A comprehensive admin dashboard for managing the Licorice Ropes e-commerce platform built with Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Features

### 🔐 Authentication & Access Control
- **Admin Login System**: Secure authentication separate from customer accounts
- **Role-Based Access Control (RBAC)**:
  - Super Admin → Full control
  - Manager → Products & orders only  
  - Staff → Limited tasks (shipping, support)
- **Session Management**: Automatic logout and session timeout

### 📊 Dashboard Overview
- **Sales Analytics**: Daily, weekly, monthly revenue tracking
- **Order Management**: Pending, shipped, completed, canceled orders
- **Customer Insights**: New users, returning users, VIP customers
- **Top Products**: Best-selling products with performance metrics
- **Inventory Alerts**: Low-stock warnings and notifications
- **Favorites Trends**: Most-favorited products tracking

### 🛍️ Product Management
- **CRUD Operations**: Add, edit, delete products
- **Product Details**: Name, description, price, discount, nutrition facts
- **Image Management**: Upload and manage product images
- **Category Management**: Organize products by categories and tags
- **Inventory Tracking**: Stock management with alerts
- **Bulk Operations**: CSV/Excel import for bulk product uploads
- **Status Management**: Active, inactive, draft product states

### 📦 Order Management
- **Order Overview**: View all orders with detailed information
- **Order Details**: Products, customer info, payment status
- **Status Updates**: Pending → Processing → Shipped → Delivered → Completed
- **Payment Tracking**: Payment confirmation and refund management
- **Shipping Management**: Address tracking and delivery updates
- **Export Functionality**: CSV/PDF order exports
- **Order Search**: Advanced filtering and search capabilities

### 👥 User Management
- **Customer Accounts**: View and manage customer profiles
- **Account Actions**: Ban/suspend abusive accounts
- **Order History**: Complete customer purchase history
- **Favorites Tracking**: Customer favorite products
- **Admin Accounts**: Manage admin roles and permissions
- **User Statistics**: Registration trends and activity metrics

### 📝 Content Management System (CMS)
- **Testimonials**: Approve/reject customer testimonials
- **Homepage Sections**: Manage static content sections
- **Product Reviews**: Moderate customer reviews and ratings
- **Content Status**: Published, pending, rejected states
- **Content Search**: Advanced filtering and search

### 📈 Analytics & Reports
- **Sales Reports**: Comprehensive sales analytics
- **Customer Behavior**: User journey and conversion tracking
- **Product Performance**: Sales metrics and growth trends
- **Revenue Analytics**: Financial performance insights
- **Export Options**: CSV, Excel, PDF report generation
- **Real-time Data**: Live dashboard updates

### ⚙️ Settings & Configuration
- **Site Settings**: Branding, currency, timezone configuration
- **Email Configuration**: SMTP settings and email templates
- **Notification Settings**: Customizable alert preferences
- **Security Settings**: Password policies, 2FA, session management
- **Integrations**: Third-party service connections

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Lucide React icons, Custom components
- **State Management**: React hooks and context
- **Authentication**: Cookie-based session management
- **Routing**: Next.js App Router with middleware protection

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Next.js project setup

### Installation

1. **Navigate to the admin directory**:
   ```bash
   cd app/admin
   ```

2. **Access the admin dashboard**:
   ```
   http://localhost:3000/admin
   ```

3. **Login with demo credentials**:
   - **Email**: admin@licoriceropes.com
   - **Password**: admin123

### 🔒 Security Features

- **Route Protection**: Middleware-based authentication
- **Session Management**: Secure cookie-based sessions
- **Role-Based Access**: Different permission levels
- **Input Validation**: Form validation and sanitization
- **CSRF Protection**: Built-in Next.js security features

## 📱 Responsive Design

The admin dashboard is fully responsive and works seamlessly across:
- **Desktop**: Full-featured interface with sidebar navigation
- **Tablet**: Optimized layout with collapsible sidebar
- **Mobile**: Touch-friendly interface with mobile navigation

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Dark/Light Mode**: Toggle between themes (ready for implementation)
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages
- **Notifications**: Toast notifications for actions
- **Search & Filter**: Advanced filtering capabilities
- **Data Tables**: Sortable, paginated data tables
- **Charts & Graphs**: Visual data representation (ready for Chart.js/Recharts)

## 🔧 Customization

### Adding New Features
1. Create new page components in `app/admin/[feature]/page.tsx`
2. Add navigation items in `app/admin/layout.tsx`
3. Implement authentication checks
4. Add to middleware protection

### Styling Customization
- Modify Tailwind classes for color schemes
- Update primary colors in settings
- Customize component styles in individual pages

### Data Integration
- Replace mock data with real API calls
- Implement proper database connections
- Add real-time data updates

## 📊 Data Structure

### Key Interfaces
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive' | 'draft';
  // ... more fields
}

interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerInfo;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  // ... more fields
}
```

## 🚀 Deployment

### Production Setup
1. **Environment Variables**: Configure production settings
2. **Database**: Set up production database
3. **Authentication**: Implement secure authentication
4. **SSL**: Enable HTTPS for security
5. **Monitoring**: Add error tracking and analytics

### Performance Optimization
- **Code Splitting**: Automatic Next.js optimization
- **Image Optimization**: Next.js Image component
- **Caching**: Implement proper caching strategies
- **CDN**: Use CDN for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is part of the Licorice Ropes e-commerce platform.

## 🆘 Support

For support and questions:
- **Email**: admin@licoriceropes.com
- **Documentation**: Check this README
- **Issues**: Report bugs and feature requests

---

**Built with ❤️ for Licorice Ropes E-commerce Platform**
