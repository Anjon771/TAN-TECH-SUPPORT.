export interface Product {
  id: string;
  name: string;
  banglaName: string;
  category: 'electronics' | 'gadgets' | 'computers' | 'stationery' | 'power';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  badge?: string;
  description: string;
  specs: string[];
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  customerName: string;
  customerPhone: string;
  district: string;
  address: string;
  deliveryOption: 'inside-dhaka' | 'outside-dhaka' | 'showroom-pickup';
  deliveryFee: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'rocket';
  trxId?: string;
  note?: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
}

export interface PrintDesign {
  id: string;
  title: string;
  bengaliTitle: string;
  category: string;
  basePrice: number;
  unit: string;
  imageKey: string;
  galleryImages?: string[];
  badge?: string;
  aspect: string;
  description: string;
}

export interface ShowroomVehicle {
  id: string;
  name: string;
  bengaliName: string;
  type: string;
  price: number;
  specs: string[];
  features: string[];
  videoTitle: string;
}
