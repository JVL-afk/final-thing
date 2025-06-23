import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-600 via-orange-700 to-black animate-pulse" 
           style={{
             animation: 'backgroundShift 6s ease-in-out infinite',
             background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 30%, #9a3412 60%, #000000 100%)'
           }}>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-6xl font-bold text-white mb-6">
                My Story
              </h1>
              <p className="text-2xl text-orange-200 mb-8">
                From a small Romanian village to building AFFILIFY
              </p>
              <div className="w-32 h-1 bg-purple-500 mx-auto rounded-full"></div>
            </div>

            {/* Story Content */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-orange-500/20">
              <div className="prose prose-lg prose-invert max-w-none">
                
                {/* Chapter 1: The Beginning */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-orange-300 mb-6 flex items-center">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-4">1</span>
                    The Beginning
                  </h2>
                  <p className="text-xl text-gray-200 leading-relaxed mb-6">
                    My name is Andrew, and my story begins in a small village in Romania. Like many young people from rural areas, I grew up with big dreams but limited opportunities. The path ahead seemed unclear, and for a long time, I struggled to find my direction in life.
                  </p>
                  <p className="text-xl text-gray-200 leading-relaxed">
                    I went through a difficult period of depression, feeling lost and uncertain about my future. It was during this dark time that I stumbled upon something that would completely change my life: affiliate marketing.
                  </p>
                </div>

                {/* Chapter 2: The Discovery */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-orange-300 mb-6 flex items-center">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-4">2</span>
                    The Discovery
                  </h2>
                  <p className="text-xl text-gray-200 leading-relaxed mb-6">
                    When I first learned about affiliate marketing, it felt like discovering a hidden treasure. Here was an opportunity to build something meaningful, to create value for others while building a sustainable income. But I quickly realized that success wouldn't come overnight.
                  </p>
                  <p className="text-xl text-gray-200 leading-relaxed">
                    The biggest challenge I faced was creating professional-looking websites. As someone without extensive technical skills, building attractive, converting affiliate sites seemed like an impossible task. I knew there had to be a better way.
                  </p>
                </div>

                {/* Chapter 3: The Journey */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-orange-300 mb-6 flex items-center">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-4">3</span>
                    Six Months of Relentless Learning
                  </h2>
                  <p className="text-xl text-gray-200 leading-relaxed mb-6">
                    What followed were six intense months of learning, building, and refining. I immersed myself in understanding what makes affiliate websites successful. I studied design principles, user experience, conversion optimization, and the psychology of online purchasing decisions.
                  </p>
                  <p className="text-xl text-gray-200 leading-relaxed mb-6">
                    Day after day, I worked on creating a solution that would solve the problem I had faced: how to quickly and easily create professional affiliate marketing websites that actually convert visitors into customers.
                  </p>
                  <p className="text-xl text-gray-200 leading-relaxed">
                    Through countless iterations, testing, and refinement, AFFILIFY began to take shape. It wasn't just about building websites – it was about creating a complete ecosystem for affiliate marketing success.
                  </p>
                </div>

                {/* Chapter 4: The Vision */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-orange-300 mb-6 flex items-center">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-4">4</span>
                    The Vision Realized
                  </h2>
                  <p className="text-xl text-gray-200 leading-relaxed mb-6">
                    AFFILIFY represents everything I wished I had when I started my affiliate marketing journey. It's an AI-powered platform that can generate professional, converting affiliate websites in seconds. But more than that, it's a tool that democratizes success in affiliate marketing.
                  </p>
                  <p className="text-xl text-gray-200 leading-relaxed mb-6">
                    Whether you're a complete beginner like I once was, or an experienced marketer looking to scale your operations, AFFILIFY provides the tools, analytics, and insights you need to succeed.
                  </p>
                  <p className="text-xl text-gray-200 leading-relaxed">
                    Every feature in AFFILIFY was born from real challenges I faced and real solutions I needed. This isn't just a product – it's my passion project, designed to help others achieve the success that once seemed impossible to me.
                  </p>
                </div>

                {/* Final Message */}
                <div className="text-center mt-16 p-8 bg-gradient-to-r from-purple-600/20 to-orange-600/20 rounded-xl border border-purple-500/30">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    WELCOME TO AFFILIFY!!!
                  </h2>
                  <p className="text-xl text-orange-200 mb-8">
                    Your journey to affiliate marketing success starts here. Let's build something amazing together.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      href="/signup" 
                      className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      Start Your Journey
                    </Link>
                    <Link 
                      href="/features" 
                      className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-700 hover:to-orange-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      Explore Features
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Animation Styles */}
      <style jsx>{`
        @keyframes backgroundShift {
          0% { background: linear-gradient(135deg, #ea580c 0%, #c2410c 30%, #9a3412 60%, #000000 100%); }
          33% { background: linear-gradient(135deg, #c2410c 0%, #9a3412 30%, #7c2d12 60%, #000000 100%); }
          66% { background: linear-gradient(135deg, #9a3412 0%, #7c2d12 30%, #451a03 60%, #000000 100%); }
          100% { background: linear-gradient(135deg, #ea580c 0%, #c2410c 30%, #9a3412 60%, #000000 100%); }
        }
      `}</style>
    </div>
  )
}
