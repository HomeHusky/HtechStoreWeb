import { Package, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react'
import useStore from '../../store/useStore'

export default function Dashboard() {
  const products = useStore(state => state.products)
  const orders = useStore(state => state.orders)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter(order => order.status === 'pending').length
  const totalProducts = products.length

  const stats = [
    {
      name: 'Tổng sản phẩm',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      name: 'Đơn hàng',
      value: orders.length,
      icon: ShoppingBag,
      color: 'bg-green-500'
    },
    {
      name: 'Đơn chờ xử lý',
      value: pendingOrders,
      icon: TrendingUp,
      color: 'bg-orange-500'
    },
    {
      name: 'Doanh thu',
      value: formatPrice(totalRevenue),
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.name}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Đơn hàng gần đây</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Chưa có đơn hàng nào</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Mã đơn</th>
                  <th className="text-left py-3 px-4">Khách hàng</th>
                  <th className="text-left py-3 px-4">Tổng tiền</th>
                  <th className="text-left py-3 px-4">Trạng thái</th>
                  <th className="text-left py-3 px-4">Ngày đặt</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">#{order.id}</td>
                    <td className="py-3 px-4">{order.customer.fullName}</td>
                    <td className="py-3 px-4">{formatPrice(order.total)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-700'
                          : order.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status === 'pending' ? 'Chờ xử lý' : 
                         order.status === 'completed' ? 'Hoàn thành' : order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Low Stock Products */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Sản phẩm sắp hết hàng</h2>
        {products.filter(p => p.stock < 20).length === 0 ? (
          <p className="text-gray-600 text-center py-8">Tất cả sản phẩm đều còn đủ hàng</p>
        ) : (
          <div className="space-y-4">
            {products
              .filter(p => p.stock < 20)
              .map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${product.stock < 10 ? 'text-red-600' : 'text-orange-600'}`}>
                      Còn {product.stock} sản phẩm
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
