import { useState } from 'react'
import { Laptop, Smartphone, Tablet, TrendingUp, Shield, Truck, Headphones } from 'lucide-react'
import useStore from '../store/useStore'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const products = useStore(state => state.products)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Tất cả', icon: TrendingUp },
    { id: 'laptop', name: 'Laptop', icon: Laptop },
    { id: 'phone', name: 'Điện thoại', icon: Smartphone },
    { id: 'tablet', name: 'Tablet', icon: Tablet },
  ]

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Chào mừng đến với Htech
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Máy tính & Điện thoại chính hãng - Giá tốt nhất thị trường
            </p>
            <a href="#products" className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Khám phá ngay
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Hàng chính hãng</h3>
              <p className="text-sm text-gray-600">100% sản phẩm chính hãng, bảo hành toàn quốc</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Giao hàng nhanh</h3>
              <p className="text-sm text-gray-600">Giao hàng miễn phí toàn quốc cho đơn từ 5 triệu</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Giá tốt nhất</h3>
              <p className="text-sm text-gray-600">Cam kết giá tốt nhất thị trường, hoàn tiền nếu rẻ hơn</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Headphones className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Hỗ trợ 24/7</h3>
              <p className="text-sm text-gray-600">Đội ngũ tư vấn nhiệt tình, hỗ trợ mọi lúc mọi nơi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Sản phẩm nổi bật</h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.name}
                </button>
              )
            })}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Không có sản phẩm nào trong danh mục này</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Cần tư vấn?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Liên hệ ngay với chúng tôi để được tư vấn miễn phí
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:1900xxxx" className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Gọi ngay: 1900 xxxx
            </a>
            <a href="mailto:support@htech.vn" className="inline-block bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white">
              Email: support@htech.vn
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
