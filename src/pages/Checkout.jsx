import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Wallet, Building2, CheckCircle } from 'lucide-react'
import useStore from '../store/useStore'

export default function Checkout() {
  const navigate = useNavigate()
  const cart = useStore(state => state.cart)
  const getCartTotal = useStore(state => state.getCartTotal)
  const createOrder = useStore(state => state.createOrder)
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    note: ''
  })
  
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [isProcessing, setIsProcessing] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const order = createOrder({
        customer: formData,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid'
      })

      setIsProcessing(false)
      
      // Show success message
      alert(`Đặt hàng thành công! Mã đơn hàng: #${order.id}`)
      
      // Redirect to home
      navigate('/')
    }, 2000)
  }

  if (cart.length === 0) {
    navigate('/cart')
    return null
  }

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Thanh toán khi nhận hàng (COD)',
      icon: Wallet,
      description: 'Thanh toán bằng tiền mặt khi nhận hàng'
    },
    {
      id: 'bank',
      name: 'Chuyển khoản ngân hàng',
      icon: Building2,
      description: 'Chuyển khoản qua Internet Banking'
    },
    {
      id: 'card',
      name: 'Thẻ tín dụng/Ghi nợ',
      icon: CreditCard,
      description: 'Thanh toán qua cổng thanh toán an toàn'
    }
  ]

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customer Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Thông tin giao hàng</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Địa chỉ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Số nhà, tên đường"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tỉnh/Thành phố <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Chọn Tỉnh/Thành phố</option>
                      <option value="HCM">TP. Hồ Chí Minh</option>
                      <option value="HN">Hà Nội</option>
                      <option value="DN">Đà Nẵng</option>
                      <option value="HP">Hải Phòng</option>
                      <option value="CT">Cần Thơ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Quận/Huyện</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Ghi chú</label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      className="input-field"
                      rows="3"
                      placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Phương thức thanh toán</h2>
                
                <div className="space-y-3">
                  {paymentMethods.map(method => {
                    const Icon = method.icon
                    return (
                      <label
                        key={method.id}
                        className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mt-1"
                        />
                        <Icon className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-semibold">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                      </label>
                    )
                  })}
                </div>

                {paymentMethod === 'bank' && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="font-semibold mb-2">Thông tin chuyển khoản:</p>
                    <p className="text-sm">Ngân hàng: Vietcombank</p>
                    <p className="text-sm">Số tài khoản: 1234567890</p>
                    <p className="text-sm">Chủ tài khoản: CÔNG TY HTECH</p>
                    <p className="text-sm">Nội dung: Họ tên + Số điện thoại</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Đơn hàng của bạn</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                        <p className="text-sm text-gray-600">SL: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3 mb-6">
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

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Đặt hàng
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-600 text-center mt-4">
                  Bằng việc đặt hàng, bạn đồng ý với{' '}
                  <a href="#" className="text-primary-600 hover:underline">
                    Điều khoản sử dụng
                  </a>{' '}
                  của Htech
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
