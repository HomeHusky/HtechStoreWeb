import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { ShoppingCart, Star, Check, Minus, Plus, ArrowLeft, Truck, Shield, RefreshCw } from 'lucide-react'
import useStore from '../store/useStore'

export default function ProductDetail() {
  const { id } = useParams()
  const products = useStore(state => state.products)
  const addToCart = useStore(state => state.addToCart)
  const [quantity, setQuantity] = useState(1)
  
  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h2>
        <Link to="/" className="text-primary-600 hover:underline">
          Quay lại trang chủ
        </Link>
      </div>
    )
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addToCart(product, quantity)
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="text-primary-600 hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Quay lại trang chủ
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div>
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-lg"
                />
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg text-lg font-bold">
                    -{discount}%
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">(99 đánh giá)</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold text-primary-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Thông số kỹ thuật:</h3>
                <div className="space-y-2">
                  {product.specs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  product.stock > 10 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {product.stock > 10 ? 'Còn hàng' : `Chỉ còn ${product.stock} sản phẩm`}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block font-semibold mb-2">Số lượng:</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decrementQuantity}
                    className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thêm vào giỏ hàng
                </button>
                <Link to="/cart" className="flex-1 btn-outline text-center">
                  Xem giỏ hàng
                </Link>
              </div>

              {/* Benefits */}
              <div className="border-t pt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary-600" />
                  <span className="text-gray-700">Bảo hành chính hãng 12 tháng</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-primary-600" />
                  <span className="text-gray-700">Miễn phí giao hàng toàn quốc</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-6 h-6 text-primary-600" />
                  <span className="text-gray-700">Đổi trả trong 7 ngày nếu có lỗi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
