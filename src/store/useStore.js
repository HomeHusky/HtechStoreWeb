import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Mock data - sản phẩm mẫu
const initialProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'phone',
    price: 29990000,
    originalPrice: 34990000,
    image: 'https://images.unsplash.com/photo-1696446702183-cbd50c2efc42?w=500&h=500&fit=crop',
    description: 'iPhone 15 Pro Max với chip A17 Pro mạnh mẽ, camera 48MP, màn hình Super Retina XDR 6.7 inch',
    specs: ['Chip A17 Pro', 'Camera 48MP', 'RAM 8GB', 'Bộ nhớ 256GB', 'Pin 4422mAh'],
    stock: 50,
    brand: 'Apple'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'phone',
    price: 26990000,
    originalPrice: 29990000,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop',
    description: 'Samsung Galaxy S24 Ultra với bút S Pen, camera 200MP, màn hình Dynamic AMOLED 6.8 inch',
    specs: ['Snapdragon 8 Gen 3', 'Camera 200MP', 'RAM 12GB', 'Bộ nhớ 256GB', 'Pin 5000mAh'],
    stock: 45,
    brand: 'Samsung'
  },
  {
    id: 3,
    name: 'MacBook Pro 14 M3',
    category: 'laptop',
    price: 42990000,
    originalPrice: 46990000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
    description: 'MacBook Pro 14 inch với chip M3, màn hình Liquid Retina XDR, hiệu năng vượt trội',
    specs: ['Chip M3', 'RAM 8GB', 'SSD 512GB', 'Màn hình 14.2 inch', 'Pin 70Wh'],
    stock: 30,
    brand: 'Apple'
  },
  {
    id: 4,
    name: 'Dell XPS 15',
    category: 'laptop',
    price: 35990000,
    originalPrice: 39990000,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop',
    description: 'Dell XPS 15 với Intel Core i7 thế hệ 13, màn hình OLED 4K, thiết kế cao cấp',
    specs: ['Intel Core i7-13700H', 'RAM 16GB', 'SSD 512GB', 'RTX 4050', 'Màn hình 15.6 inch OLED'],
    stock: 25,
    brand: 'Dell'
  },
  {
    id: 5,
    name: 'iPad Pro 12.9 M2',
    category: 'tablet',
    price: 28990000,
    originalPrice: 31990000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop',
    description: 'iPad Pro 12.9 inch với chip M2, màn hình Liquid Retina XDR, hỗ trợ Apple Pencil',
    specs: ['Chip M2', 'RAM 8GB', 'Bộ nhớ 128GB', 'Màn hình 12.9 inch', 'Camera 12MP'],
    stock: 40,
    brand: 'Apple'
  },
  {
    id: 6,
    name: 'ASUS ROG Strix G16',
    category: 'laptop',
    price: 38990000,
    originalPrice: 42990000,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop',
    description: 'ASUS ROG Strix G16 - Laptop gaming mạnh mẽ với RTX 4060, màn hình 165Hz',
    specs: ['Intel Core i7-13650HX', 'RAM 16GB', 'SSD 512GB', 'RTX 4060', 'Màn hình 16 inch 165Hz'],
    stock: 20,
    brand: 'ASUS'
  },
  {
    id: 7,
    name: 'Xiaomi 14 Pro',
    category: 'phone',
    price: 18990000,
    originalPrice: 21990000,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
    description: 'Xiaomi 14 Pro với camera Leica, Snapdragon 8 Gen 3, sạc nhanh 120W',
    specs: ['Snapdragon 8 Gen 3', 'Camera 50MP Leica', 'RAM 12GB', 'Bộ nhớ 256GB', 'Pin 4880mAh'],
    stock: 60,
    brand: 'Xiaomi'
  },
  {
    id: 8,
    name: 'HP Pavilion 15',
    category: 'laptop',
    price: 18990000,
    originalPrice: 21990000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
    description: 'HP Pavilion 15 - Laptop văn phòng hiệu suất cao, thiết kế thanh lịch',
    specs: ['Intel Core i5-1235U', 'RAM 8GB', 'SSD 512GB', 'Intel Iris Xe', 'Màn hình 15.6 inch FHD'],
    stock: 35,
    brand: 'HP'
  }
]

const useStore = create(
  persist(
    (set, get) => ({
      // Products
      products: initialProducts,
      
      // Cart
      cart: [],
      
      // Orders
      orders: [],
      
      // Add to cart
      addToCart: (product, quantity = 1) => {
        const cart = get().cart
        const existingItem = cart.find(item => item.id === product.id)
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
        } else {
          set({ cart: [...cart, { ...product, quantity }] })
        }
      },
      
      // Remove from cart
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id !== productId) })
      },
      
      // Update cart quantity
      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
        } else {
          set({
            cart: get().cart.map(item =>
              item.id === productId ? { ...item, quantity } : item
            )
          })
        }
      },
      
      // Clear cart
      clearCart: () => set({ cart: [] }),
      
      // Get cart total
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      
      // Create order
      createOrder: (orderData) => {
        const newOrder = {
          id: Date.now(),
          items: get().cart,
          total: get().getCartTotal(),
          status: 'pending',
          createdAt: new Date().toISOString(),
          ...orderData
        }
        set({ orders: [...get().orders, newOrder] })
        get().clearCart()
        return newOrder
      },
      
      // Admin: Add product
      addProduct: (product) => {
        const newProduct = {
          ...product,
          id: Date.now()
        }
        set({ products: [...get().products, newProduct] })
      },
      
      // Admin: Update product
      updateProduct: (productId, updates) => {
        set({
          products: get().products.map(product =>
            product.id === productId ? { ...product, ...updates } : product
          )
        })
      },
      
      // Admin: Delete product
      deleteProduct: (productId) => {
        set({ products: get().products.filter(product => product.id !== productId) })
      },
      
      // Admin: Update order status
      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          )
        })
      }
    }),
    {
      name: 'htech-store',
      partialize: (state) => ({
        cart: state.cart,
        orders: state.orders,
        products: state.products
      })
    }
  )
)

export default useStore
