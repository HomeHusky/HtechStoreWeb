import { useState } from 'react'
import { Plus, Edit, Trash2, Search, X } from 'lucide-react'
import useStore from '../../store/useStore'

export default function Products() {
  const products = useStore(state => state.products)
  const addProduct = useStore(state => state.addProduct)
  const updateProduct = useStore(state => state.updateProduct)
  const deleteProduct = useStore(state => state.deleteProduct)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'laptop',
    price: '',
    originalPrice: '',
    image: '',
    description: '',
    specs: '',
    stock: '',
    brand: ''
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || '',
        image: product.image,
        description: product.description,
        specs: product.specs.join(', '),
        stock: product.stock.toString(),
        brand: product.brand
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: '',
        category: 'laptop',
        price: '',
        originalPrice: '',
        image: '',
        description: '',
        specs: '',
        stock: '',
        brand: ''
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const productData = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      image: formData.image,
      description: formData.description,
      specs: formData.specs.split(',').map(s => s.trim()),
      stock: parseInt(formData.stock),
      brand: formData.brand
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productData)
      alert('Cập nhật sản phẩm thành công!')
    } else {
      addProduct(productData)
      alert('Thêm sản phẩm thành công!')
    }

    handleCloseModal()
  }

  const handleDelete = (productId, productName) => {
    if (window.confirm(`Bạn có chắc muốn xóa sản phẩm "${productName}"?`)) {
      deleteProduct(productId)
      alert('Xóa sản phẩm thành công!')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
        <button
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Thêm sản phẩm
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold">Sản phẩm</th>
                <th className="text-left py-4 px-6 font-semibold">Danh mục</th>
                <th className="text-left py-4 px-6 font-semibold">Giá</th>
                <th className="text-left py-4 px-6 font-semibold">Tồn kho</th>
                <th className="text-left py-4 px-6 font-semibold">Thương hiệu</th>
                <th className="text-right py-4 px-6 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {product.category === 'laptop' ? 'Laptop' : 
                       product.category === 'phone' ? 'Điện thoại' : 'Tablet'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold">{formatPrice(product.price)}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-semibold ${
                      product.stock < 10 ? 'text-red-600' : 
                      product.stock < 20 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4 px-6">{product.brand}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Không tìm thấy sản phẩm nào</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">
                {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tên sản phẩm <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Danh mục <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="laptop">Laptop</option>
                      <option value="phone">Điện thoại</option>
                      <option value="tablet">Tablet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Thương hiệu <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Giá bán <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Giá gốc</label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tồn kho <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    URL hình ảnh <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="https://..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mô tả <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-field"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Thông số kỹ thuật <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="specs"
                    value={formData.specs}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Ngăn cách bằng dấu phẩy, ví dụ: Chip M3, RAM 8GB, SSD 512GB"
                    required
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Nhập các thông số cách nhau bằng dấu phẩy
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button type="submit" className="flex-1 btn-primary">
                  {editingProduct ? 'Cập nhật' : 'Thêm sản phẩm'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 btn-secondary"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
