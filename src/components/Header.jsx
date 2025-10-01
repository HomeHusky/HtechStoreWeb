import { Link } from 'react-router-dom'
import { ShoppingCart, Laptop, Smartphone, Menu, Search, User } from 'lucide-react'
import { useState } from 'react'
import useStore from '../store/useStore'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cart = useStore(state => state.cart)
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 text-white p-2 rounded-lg">
              <Laptop className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-primary-600">Htech</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Trang chủ
            </Link>
            <a href="#laptops" className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center gap-1">
              <Laptop className="w-4 h-4" />
              Laptop
            </a>
            <a href="#phones" className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center gap-1">
              <Smartphone className="w-4 h-4" />
              Điện thoại
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Liên hệ
            </a>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-gray-700 hover:text-primary-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <Link to="/admin" className="hidden md:block text-gray-700 hover:text-primary-600 transition-colors">
              <User className="w-5 h-5" />
            </Link>

            <Link to="/cart" className="relative text-gray-700 hover:text-primary-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <a
                href="#laptops"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Laptop className="w-4 h-4" />
                Laptop
              </a>
              <a
                href="#phones"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Smartphone className="w-4 h-4" />
                Điện thoại
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Liên hệ
              </a>
              <Link
                to="/admin"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                Quản trị
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
