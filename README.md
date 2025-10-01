# Htech Store - Website bán máy tính & điện thoại

Website thương mại điện tử hiện đại cho cửa hàng Htech, chuyên bán máy tính và điện thoại tại Việt Nam.

## 🚀 Tính năng

### Khách hàng
- ✅ Xem danh sách sản phẩm (Laptop, Điện thoại, Tablet)
- ✅ Lọc sản phẩm theo danh mục
- ✅ Xem chi tiết sản phẩm
- ✅ Thêm sản phẩm vào giỏ hàng
- ✅ Quản lý giỏ hàng (thêm, xóa, cập nhật số lượng)
- ✅ Thanh toán đơn hàng
- ✅ Nhiều phương thức thanh toán (COD, Chuyển khoản, Thẻ)
- ✅ Giao diện responsive, thân thiện với mobile

### Quản trị viên
- ✅ Dashboard tổng quan
- ✅ Quản lý sản phẩm (Thêm, Sửa, Xóa)
- ✅ Quản lý đơn hàng
- ✅ Cập nhật trạng thái đơn hàng
- ✅ Thống kê doanh thu
- ✅ Cảnh báo sản phẩm sắp hết hàng

## 🛠️ Công nghệ sử dụng

- **React 18** - Thư viện UI
- **Vite** - Build tool
- **React Router** - Routing
- **Zustand** - State management
- **TailwindCSS** - Styling
- **Lucide React** - Icons

## 📦 Cài đặt

### Yêu cầu
- Node.js 16+ 
- npm hoặc yarn

### Các bước cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Mở trình duyệt và truy cập:
```
http://localhost:3000
```

## 📁 Cấu trúc thư mục

```
HtechStoreWeb/
├── src/
│   ├── components/          # Components tái sử dụng
│   │   ├── Layout.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── admin/
│   │       └── AdminLayout.jsx
│   ├── pages/              # Các trang
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── admin/
│   │       ├── Dashboard.jsx
│   │       ├── Products.jsx
│   │       └── Orders.jsx
│   ├── store/              # State management
│   │   └── useStore.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static files
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Sử dụng

### Trang khách hàng

1. **Trang chủ** (`/`)
   - Xem danh sách sản phẩm
   - Lọc theo danh mục (Tất cả, Laptop, Điện thoại, Tablet)
   - Thêm sản phẩm vào giỏ hàng

2. **Chi tiết sản phẩm** (`/product/:id`)
   - Xem thông tin chi tiết
   - Chọn số lượng
   - Thêm vào giỏ hàng

3. **Giỏ hàng** (`/cart`)
   - Xem danh sách sản phẩm trong giỏ
   - Cập nhật số lượng
   - Xóa sản phẩm
   - Xem tổng tiền

4. **Thanh toán** (`/checkout`)
   - Nhập thông tin giao hàng
   - Chọn phương thức thanh toán
   - Đặt hàng

### Trang quản trị

Truy cập: `/admin`

1. **Dashboard** (`/admin`)
   - Tổng quan thống kê
   - Đơn hàng gần đây
   - Sản phẩm sắp hết hàng

2. **Quản lý sản phẩm** (`/admin/products`)
   - Thêm sản phẩm mới
   - Chỉnh sửa sản phẩm
   - Xóa sản phẩm
   - Tìm kiếm sản phẩm

3. **Quản lý đơn hàng** (`/admin/orders`)
   - Xem danh sách đơn hàng
   - Xem chi tiết đơn hàng
   - Cập nhật trạng thái đơn hàng
   - Tìm kiếm đơn hàng

## 💳 Phương thức thanh toán

Website hỗ trợ 3 phương thức thanh toán:

1. **COD (Cash on Delivery)** - Thanh toán khi nhận hàng
2. **Chuyển khoản ngân hàng** - Chuyển khoản qua Internet Banking
3. **Thẻ tín dụng/Ghi nợ** - Thanh toán qua cổng thanh toán

## 🔧 Build cho production

```bash
npm run build
```

Files build sẽ được tạo trong thư mục `dist/`

## 📝 Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build cho production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint

## 🎨 Tùy chỉnh

### Màu sắc

Chỉnh sửa file `tailwind.config.js` để thay đổi màu chủ đạo:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Thay đổi màu primary tại đây
      }
    }
  }
}
```

### Dữ liệu sản phẩm

Dữ liệu sản phẩm mẫu được lưu trong `src/store/useStore.js`. Bạn có thể:
- Thêm/sửa/xóa sản phẩm mẫu trong `initialProducts`
- Tích hợp với API backend để lấy dữ liệu thực

## 🚀 Triển khai

Website có thể được triển khai lên các nền tảng:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 📞 Liên hệ

- Website: https://htech.vn
- Email: support@htech.vn
- Hotline: 1900 xxxx

## 📄 License

Copyright © 2025 Htech. All rights reserved.
