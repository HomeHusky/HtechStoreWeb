import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import useStore from '../store/useStore'

export default function Cart() {
  const cart = useStore(state => state.cart)
  const updateCartQuantity = useStore(state => state.updateCartQuantity)
  const removeFromCart = useStore(state => state.removeFromCart)
  const getCartTotal = useStore(state => state.getCartTotal)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Link to="/" className="btn-primary inline-block">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/" className="text-primary-600 hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Tiếp tục mua sắm
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.id}`}
                      className="font-semibold text-lg hover:text-primary-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600 text-sm mb-2">{item.brand}</p>
                    <p className="text-primary-600 font-bold text-xl">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6">Tổng đơn hàng</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-semibold">{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-semibold text-green-600">Miễn phí</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-primary-600">
                      {formatPrice(getCartTotal())}
                    </span>
                  </div>
                </div>
              </div>

              <Link to="/checkout" className="btn-primary w-full block text-center mb-3">
                Tiến hành thanh toán
              </Link>
              
              <Link to="/" className="btn-outline w-full block text-center">
                Tiếp tục mua sắm
              </Link>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 text-center">
                  Miễn phí giao hàng cho đơn từ 5 triệu đồng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
