export const mockFeatures: Record<string, Array<{
  id: string;
  moduleId: string;
  name: string;
  functionCount: number;
  classCount: number;
  complexityScore: number;
  apiCount: number;
  dbTableCount: number;
  testCoverage: number;
  documentationStatus: 'complete' | 'partial' | 'missing';
  description: string;
}>> = {
  'mod-user': [
    { id: 'feat-user-register', moduleId: 'mod-user', name: 'Registration', functionCount: 8, classCount: 3, complexityScore: 45, apiCount: 3, dbTableCount: 2, testCoverage: 92, documentationStatus: 'complete', description: 'New user sign-up with email verification' },
    { id: 'feat-user-login', moduleId: 'mod-user', name: 'Login', functionCount: 6, classCount: 2, complexityScore: 38, apiCount: 2, dbTableCount: 1, testCoverage: 95, documentationStatus: 'complete', description: 'Authentication with multiple strategies' },
    { id: 'feat-user-profile', moduleId: 'mod-user', name: 'Profile Management', functionCount: 10, classCount: 4, complexityScore: 52, apiCount: 5, dbTableCount: 3, testCoverage: 88, documentationStatus: 'complete', description: 'User profile editing and preferences' },
    { id: 'feat-user-avatar', moduleId: 'mod-user', name: 'Avatar Upload', functionCount: 4, classCount: 1, complexityScore: 22, apiCount: 2, dbTableCount: 1, testCoverage: 78, documentationStatus: 'partial', description: 'Profile image upload and cropping' },
    { id: 'feat-user-password', moduleId: 'mod-user', name: 'Password Management', functionCount: 5, classCount: 2, complexityScore: 35, apiCount: 2, dbTableCount: 1, testCoverage: 90, documentationStatus: 'complete', description: 'Password reset, change, and strength validation' },
    { id: 'feat-user-search', moduleId: 'mod-user', name: 'User Search', functionCount: 7, classCount: 2, complexityScore: 48, apiCount: 3, dbTableCount: 1, testCoverage: 85, documentationStatus: 'partial', description: 'Advanced user search and filtering' },
    { id: 'feat-user-roles', moduleId: 'mod-user', name: 'Role Assignment', functionCount: 4, classCount: 2, complexityScore: 40, apiCount: 2, dbTableCount: 2, testCoverage: 82, documentationStatus: 'missing', description: 'Role and permission assignment' },
    { id: 'feat-user-export', moduleId: 'mod-user', name: 'User Export', functionCount: 3, classCount: 1, complexityScore: 18, apiCount: 1, dbTableCount: 0, testCoverage: 65, documentationStatus: 'missing', description: 'Bulk user data export to CSV/Excel' },
  ],
  'mod-customer': [
    { id: 'feat-cust-list', moduleId: 'mod-customer', name: 'Customer List', functionCount: 7, classCount: 2, complexityScore: 42, apiCount: 3, dbTableCount: 1, testCoverage: 90, documentationStatus: 'complete', description: 'Customer listing with pagination and filters' },
    { id: 'feat-cust-detail', moduleId: 'mod-customer', name: 'Customer Detail', functionCount: 8, classCount: 3, complexityScore: 50, apiCount: 4, dbTableCount: 2, testCoverage: 88, documentationStatus: 'complete', description: 'Detailed customer view with history' },
    { id: 'feat-cust-segment', moduleId: 'mod-customer', name: 'Segmentation', functionCount: 6, classCount: 2, complexityScore: 55, apiCount: 3, dbTableCount: 2, testCoverage: 72, documentationStatus: 'partial', description: 'Customer segmentation and grouping' },
    { id: 'feat-cust-analytics', moduleId: 'mod-customer', name: 'Customer Analytics', functionCount: 5, classCount: 2, complexityScore: 48, apiCount: 2, dbTableCount: 1, testCoverage: 68, documentationStatus: 'missing', description: 'Customer behavior and trend analysis' },
    { id: 'feat-cust-notes', moduleId: 'mod-customer', name: 'Notes & Activity', functionCount: 4, classCount: 1, complexityScore: 25, apiCount: 2, dbTableCount: 1, testCoverage: 76, documentationStatus: 'partial', description: 'Internal notes and activity log per customer' },
    { id: 'feat-cust-rating', moduleId: 'mod-customer', name: 'Customer Rating', functionCount: 4, classCount: 1, complexityScore: 20, apiCount: 1, dbTableCount: 1, testCoverage: 85, documentationStatus: 'complete', description: 'Customer satisfaction rating and reviews' },
  ],
  'mod-product': [
    { id: 'feat-prod-catalog', moduleId: 'mod-product', name: 'Product Catalog', functionCount: 12, classCount: 4, complexityScore: 68, apiCount: 5, dbTableCount: 3, testCoverage: 85, documentationStatus: 'complete', description: 'Full product catalog with categories and facets' },
    { id: 'feat-prod-variant', moduleId: 'mod-product', name: 'Variants', functionCount: 8, classCount: 3, complexityScore: 58, apiCount: 4, dbTableCount: 2, testCoverage: 80, documentationStatus: 'partial', description: 'Product variants (size, color, etc.)' },
    { id: 'feat-prod-pricing', moduleId: 'mod-product', name: 'Pricing Engine', functionCount: 10, classCount: 3, complexityScore: 72, apiCount: 3, dbTableCount: 2, testCoverage: 78, documentationStatus: 'partial', description: 'Tiered pricing, discounts, and promotions' },
    { id: 'feat-prod-search', moduleId: 'mod-product', name: 'Product Search', functionCount: 7, classCount: 2, complexityScore: 55, apiCount: 3, dbTableCount: 1, testCoverage: 82, documentationStatus: 'complete', description: 'Full-text search with relevance ranking' },
    { id: 'feat-prod-reviews', moduleId: 'mod-product', name: 'Reviews & Ratings', functionCount: 6, classCount: 2, complexityScore: 38, apiCount: 3, dbTableCount: 2, testCoverage: 74, documentationStatus: 'missing', description: 'User reviews and star ratings' },
    { id: 'feat-prod-categories', moduleId: 'mod-product', name: 'Category Tree', functionCount: 5, classCount: 2, complexityScore: 42, apiCount: 2, dbTableCount: 1, testCoverage: 90, documentationStatus: 'complete', description: 'Hierarchical category management' },
    { id: 'feat-prod-media', moduleId: 'mod-product', name: 'Media Gallery', functionCount: 6, classCount: 2, complexityScore: 35, apiCount: 3, dbTableCount: 1, testCoverage: 72, documentationStatus: 'partial', description: 'Product images, videos, and asset management' },
    { id: 'feat-prod-import', moduleId: 'mod-product', name: 'Bulk Import', functionCount: 5, classCount: 2, complexityScore: 62, apiCount: 2, dbTableCount: 1, testCoverage: 60, documentationStatus: 'missing', description: 'CSV/JSON bulk product import' },
    { id: 'feat-prod-export-ft', moduleId: 'mod-product', name: 'Bulk Export', functionCount: 3, classCount: 1, complexityScore: 28, apiCount: 1, dbTableCount: 0, testCoverage: 55, documentationStatus: 'missing', description: 'Product data export to external systems' },
  ],
  'mod-order': [
    { id: 'feat-order-create', moduleId: 'mod-order', name: 'Order Creation', functionCount: 9, classCount: 3, complexityScore: 65, apiCount: 4, dbTableCount: 3, testCoverage: 90, documentationStatus: 'complete', description: 'Order creation with validation and inventory check' },
    { id: 'feat-order-lifecycle', moduleId: 'mod-order', name: 'Order Lifecycle', functionCount: 8, classCount: 3, complexityScore: 58, apiCount: 3, dbTableCount: 2, testCoverage: 88, documentationStatus: 'complete', description: 'Status transitions: pending, confirmed, shipped, delivered' },
    { id: 'feat-order-tracking', moduleId: 'mod-order', name: 'Tracking', functionCount: 6, classCount: 2, complexityScore: 38, apiCount: 4, dbTableCount: 1, testCoverage: 92, documentationStatus: 'complete', description: 'Shipment tracking with carrier integration' },
    { id: 'feat-order-return', moduleId: 'mod-order', name: 'Returns', functionCount: 7, classCount: 3, complexityScore: 52, apiCount: 3, dbTableCount: 2, testCoverage: 76, documentationStatus: 'partial', description: 'Return/refund processing and workflow' },
    { id: 'feat-order-cancel', moduleId: 'mod-order', name: 'Cancellation', functionCount: 4, classCount: 2, complexityScore: 30, apiCount: 2, dbTableCount: 1, testCoverage: 85, documentationStatus: 'complete', description: 'Order cancellation with configurable rules' },
    { id: 'feat-order-invoice', moduleId: 'mod-order', name: 'Invoicing', functionCount: 10, classCount: 3, complexityScore: 62, apiCount: 3, dbTableCount: 2, testCoverage: 80, documentationStatus: 'partial', description: 'Invoice generation and PDF export' },
    { id: 'feat-order-history', moduleId: 'mod-order', name: 'Order History', functionCount: 7, classCount: 2, complexityScore: 35, apiCount: 2, dbTableCount: 1, testCoverage: 75, documentationStatus: 'missing', description: 'Historical order search and filtering' },
  ],
  'mod-payment': [
    { id: 'feat-pay-process', moduleId: 'mod-payment', name: 'Payment Processing', functionCount: 12, classCount: 4, complexityScore: 82, apiCount: 6, dbTableCount: 3, testCoverage: 88, documentationStatus: 'complete', description: 'Multi-gateway payment processing' },
    { id: 'feat-pay-billing', moduleId: 'mod-payment', name: 'Billing', functionCount: 8, classCount: 3, complexityScore: 68, apiCount: 4, dbTableCount: 2, testCoverage: 82, documentationStatus: 'complete', description: 'Recurring billing and subscription plans' },
    { id: 'feat-pay-receipt', moduleId: 'mod-payment', name: 'Receipts', functionCount: 5, classCount: 2, complexityScore: 28, apiCount: 2, dbTableCount: 1, testCoverage: 90, documentationStatus: 'complete', description: 'Receipt generation and email delivery' },
    { id: 'feat-pay-refund', moduleId: 'mod-payment', name: 'Refunds', functionCount: 6, classCount: 2, complexityScore: 48, apiCount: 3, dbTableCount: 2, testCoverage: 75, documentationStatus: 'partial', description: 'Partial and full refund processing' },
    { id: 'feat-pay-reports', moduleId: 'mod-payment', name: 'Payment Reports', functionCount: 7, classCount: 2, complexityScore: 55, apiCount: 2, dbTableCount: 1, testCoverage: 68, documentationStatus: 'missing', description: 'Transaction reports and reconciliation' },
  ],
  'mod-inventory': [
    { id: 'feat-inv-stock', moduleId: 'mod-inventory', name: 'Stock Management', functionCount: 10, classCount: 3, complexityScore: 52, apiCount: 4, dbTableCount: 2, testCoverage: 92, documentationStatus: 'complete', description: 'Real-time stock levels and adjustments' },
    { id: 'feat-inv-transfer', moduleId: 'mod-inventory', name: 'Transfers', functionCount: 6, classCount: 2, complexityScore: 38, apiCount: 3, dbTableCount: 2, testCoverage: 85, documentationStatus: 'complete', description: 'Stock transfers between warehouses' },
    { id: 'feat-inv-alert', moduleId: 'mod-inventory', name: 'Low Stock Alerts', functionCount: 5, classCount: 2, complexityScore: 25, apiCount: 2, dbTableCount: 1, testCoverage: 88, documentationStatus: 'partial', description: 'Threshold-based stock alerts and notifications' },
    { id: 'feat-inv-count', moduleId: 'mod-inventory', name: 'Inventory Count', functionCount: 7, classCount: 2, complexityScore: 35, apiCount: 2, dbTableCount: 1, testCoverage: 72, documentationStatus: 'missing', description: 'Physical inventory counting and reconciliation' },
  ],
  'mod-reports': [
    { id: 'feat-rpt-builder', moduleId: 'mod-reports', name: 'Report Builder', functionCount: 12, classCount: 4, complexityScore: 78, apiCount: 5, dbTableCount: 3, testCoverage: 72, documentationStatus: 'partial', description: 'Drag-and-drop report builder with custom fields' },
    { id: 'feat-rpt-schedule', moduleId: 'mod-reports', name: 'Scheduled Reports', functionCount: 8, classCount: 3, complexityScore: 55, apiCount: 3, dbTableCount: 2, testCoverage: 80, documentationStatus: 'complete', description: 'Automated report generation and distribution' },
    { id: 'feat-rpt-export', moduleId: 'mod-reports', name: 'Export Engine', functionCount: 6, classCount: 2, complexityScore: 42, apiCount: 2, dbTableCount: 1, testCoverage: 78, documentationStatus: 'complete', description: 'Multi-format export (PDF, CSV, Excel)' },
    { id: 'feat-rpt-dash', moduleId: 'mod-reports', name: 'Dashboards', functionCount: 7, classCount: 3, complexityScore: 62, apiCount: 3, dbTableCount: 2, testCoverage: 65, documentationStatus: 'missing', description: 'Interactive dashboard visualizations' },
    { id: 'feat-rpt-filter', moduleId: 'mod-reports', name: 'Advanced Filters', functionCount: 5, classCount: 2, complexityScore: 38, apiCount: 2, dbTableCount: 1, testCoverage: 82, documentationStatus: 'partial', description: 'Custom filter conditions and saved presets' },
    { id: 'feat-rpt-embed', moduleId: 'mod-reports', name: 'Embedded Charts', functionCount: 3, classCount: 1, complexityScore: 22, apiCount: 1, dbTableCount: 0, testCoverage: 60, documentationStatus: 'missing', description: 'Embeddable chart widgets for external use' },
  ],
  'mod-auth': [
    { id: 'feat-auth-sso', moduleId: 'mod-auth', name: 'SSO Integration', functionCount: 8, classCount: 3, complexityScore: 72, apiCount: 4, dbTableCount: 2, testCoverage: 85, documentationStatus: 'complete', description: 'Single sign-on via SAML/OIDC providers' },
    { id: 'feat-auth-oauth', moduleId: 'mod-auth', name: 'OAuth2 Server', functionCount: 10, classCount: 4, complexityScore: 85, apiCount: 5, dbTableCount: 3, testCoverage: 80, documentationStatus: 'complete', description: 'OAuth2 authorization server implementation' },
    { id: 'feat-auth-mfa', moduleId: 'mod-auth', name: 'Multi-Factor Auth', functionCount: 6, classCount: 2, complexityScore: 58, apiCount: 3, dbTableCount: 2, testCoverage: 90, documentationStatus: 'complete', description: 'TOTP and SMS-based multi-factor authentication' },
    { id: 'feat-auth-rbac', moduleId: 'mod-auth', name: 'Role-Based Access', functionCount: 5, classCount: 2, complexityScore: 48, apiCount: 2, dbTableCount: 2, testCoverage: 88, documentationStatus: 'partial', description: 'Role-based access control with policy engine' },
    { id: 'feat-auth-session', moduleId: 'mod-auth', name: 'Session Management', functionCount: 3, classCount: 1, complexityScore: 28, apiCount: 2, dbTableCount: 1, testCoverage: 76, documentationStatus: 'missing', description: 'Session tracking, expiry, and revocation' },
  ],
};
