import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-purple-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-3xl font-bold text-white hover:text-orange-300 transition-colors">
            AFFILIFY
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-orange-300 transition-colors">Home</Link>
            <Link href="/about" className="text-white hover:text-orange-300 transition-colors">About</Link>
            <Link href="/features" className="text-white hover:text-orange-300 transition-colors">Features</Link>
            <Link href="/pricing" className="text-white hover:text-orange-300 transition-colors">Pricing</Link>
            <Link href="/docs" className="text-white hover:text-orange-300 transition-colors">Documentation</Link>
            <Link href="/login" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">Sign-in</Link>
            <Link href="/signup" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors">Sign-up</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
