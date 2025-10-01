import { useState } from 'react'
import { Eye, Search, X } from 'lucide-react'
import useStore from '../../store/useStore'

export default function Orders() {
  const orders = useStore(state => state.orders)
  const updateOrderStatus = useStore(state => state.updateOrderStatus)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const filteredOrders = orders.filter(order =>
    order.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.phone.includes(searchTerm) ||
    order.id.toString().includes(searchTerm)
  )

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedOrder(null)
  }

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus)
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Chờ xử lý', className: 'bg-yellow-100 text-yellow-700' },
      processing: { label: 'Đang xử lý', className: 'bg-blue-100 text-blue-700' },
      shipping: { label: 'Đang giao', className: 'bg-purple-100 text-purple-700' },
      completed: { label: 'Hoàn thành', className: 'bg-green-100 text-green-700' },
      cancelled: { label: 'Đã hủy', className: 'bg-red-100 text-red-700' }
    }

    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.className}`}>
        {config.label}
      </span>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Quản lý đơn hàng</h1>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, số điện thoại hoặc mã đơn hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold">Mã đơn</th>
                <th className="text-left py-4 px-6 font-semibold">Khách hàng</th>
                <th className="text-left py-4 px-6 font-semibold">Số điện thoại</th>
                <th className="text-left py-4 px-6 font-semibold">Tổng tiền</th>
                <th className="text-left py-4 px-6 font-semibold">Thanh toán</th>
                <th className="text-left py-4 px-6 font-semibold">Trạng thái</th>
                <th className="text-left py-4 px-6 font-semibold">Ngày đặt</th>
                <th className="text-right py-4 px-6 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">#{order.id}</td>
                  <td className="py-4 px-6">{order.customer.fullName}</td>
                  <td className="py-4 px-6">{order.customer.phone}</td>
                  <td className="py-4 px-6 font-semibold">{formatPrice(order.total)}</td>
                  <td className="py-4 px-6">
                    <span className="text-sm">
                      {order.paymentMethod === 'cod' ? 'COD' :
                       order.paymentMethod === 'bank' ? 'Chuyển khoản' : 'Thẻ'}
                    </span>
                  </td>
                  <td className="py-4 px-6">{getStatusBadge(order.status)}</td>
                  <td className="py-4 px-6">
                    {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {orders.length === 0 ? 'Chưa có đơn hàng nào' : 'Không tìm thấy đơn hàng nào'}
            </p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">Chi tiết đơn hàng #{selectedOrder.id}</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Thông tin khách hàng</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><span className="font-medium">Họ tên:</span> {selectedOrder.customer.fullName}</p>
                  <p><span className="font-medium">Số điện thoại:</span> {selectedOrder.customer.phone}</p>
                  {selectedOrder.customer.email && (
                    <p><span className="font-medium">Email:</span> {selectedOrder.customer.email}</p>
                  )}
                  <p><span className="font-medium">Địa chỉ:</span> {selectedOrder.customer.address}</p>
                  <p><span className="font-medium">Quận/Huyện:</span> {selectedOrder.customer.district}</p>
                  <p><span className="font-medium">Tỉnh/Thành phố:</span> {selectedOrder.customer.city}</p>
                  {selectedOrder.customer.note && (
                    <p><span className="font-medium">Ghi chú:</span> {selectedOrder.customer.note}</p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Sản phẩm</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.brand}</p>
                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                        <p className="text-sm text-gray-600">{formatPrice(item.price)} x {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Tổng kết đơn hàng</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span className="font-semibold">{formatPrice(selectedOrder.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span className="font-semibold text-green-600">Miễn phí</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-bold">Tổng cộng:</span>
                    <span className="font-bold text-primary-600 text-xl">
                      {formatPrice(selectedOrder.total)}
                    </span>
                  </div>
                  <div className="border-t pt-2">
                    <p><span className="font-medium">Phương thức thanh toán:</span> {
                      selectedOrder.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' :
                      selectedOrder.paymentMethod === 'bank' ? 'Chuyển khoản ngân hàng' : 'Thẻ tín dụng/Ghi nợ'
                    }</p>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Cập nhật trạng thái</h3>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                  className="input-field"
                >
                  <option value="pending">Chờ xử lý</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="shipping">Đang giao</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button onClick={handleCloseModal} className="flex-1 btn-primary">
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
