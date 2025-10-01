import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import useStore from '../store/useStore'

export default function ProductCard({ product }) {
  const addToCart = useStore(state => state.addToCart)
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <Link to={`/product/${product.id}`} className="card overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
            -{discount}%
          </div>
        )}
        {product.stock < 10 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            Sắp hết hàng
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-sm text-gray-600 ml-1">(99)</span>
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.specs.slice(0, 3).map((spec, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {spec}
            </span>
          ))}
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Thêm vào giỏ
        </button>
      </div>
    </Link>
  )
}
