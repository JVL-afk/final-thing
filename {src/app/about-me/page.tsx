import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-gradient-to-br from-orange-900 via-orange-800 to-black animate-color-transition">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold text-white mb-6">About Me</h1>
              <div className="w-32 h-32 bg-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">A</span>
              </div>
              <h2 className="text-3xl font-semibold text-orange-200">Andrew's Journey</h2>
            </div>

            {/* Story Content */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <div className="prose prose-lg max-w-none text-white">
                <p className="text-xl leading-relaxed mb-6">
                  Hi, I'm Andrew and I'm nothing better than you. I'm from a small village in Romania and I am 
                  a student at the local school. About one year ago, I reached my peak: I had great friends, 
                  high grades, and I was seeing my crush on the side. Everything was going as planned. But 
                  then, in December 2024, something hit me. I realized that I don't just want to be that normal 
                  guy, I wanted something different. That one thought changed everything, my crush became 
                  just another girl and my friends became some annoying people. I knew I had to do 
                  something.
                </p>

                <p className="text-xl leading-relaxed mb-6">
                  Back then, I didn't know anything about how to make money online, but I knew 
                  that was the best way. I tried Dropshipping and it failed, I tried Copywriting and it failed, I 
                  tried making money through social media and that failed as well. By now it was New Year's 
                  and I was feeling a little bit depressed, I didn't have any friends to party with and no girl to 
                  kiss. On top of that, my ambition didn't lead to any result, and I made absolutely no money 
                  from it. I wanted to quit. At about 1 am I saw a post about an affiliate marketing website and 
                  how much it was making. It seemed like I hit gold.
                </p>

                <p className="text-xl leading-relaxed mb-6">
                  I started immediately, I signed up for an 
                  affiliate program and picked my product. Then I realized that I had no idea on how to make a 
                  website, so I started looking for alternatives, all the free programs gave out, and the ones I 
                  had to pay for didn't work out as well. I was back to depression. I had done nothing useful. I 
                  lost everything that took me years to get. ALL for NOTHING. Then I remembered all the 
                  nights in which I dreamed about succeeding, of proving everybody wrong. I wasn't gonna let the 
                  dream fade away.
                </p>

                <p className="text-xl leading-relaxed mb-6">
                  Ok I guess that by now you know that I'm joking. What actually happened 
                  was I tried to recover my old life and it didn't work out. So I sat back down on my chair and 
                  started thinking: What should I do? What should I do?... . Finally, after like a week, I came to 
                  this idea: I will make a tool that will give everybody a chance to start affiliate marketing. For 
                  that I needed to build a website, so I started studying, and studying,and studying some 
                  more.
                </p>

                <p className="text-xl leading-relaxed mb-6">
                  It was March, I finally learned how to write some code. I started writing, checking the 
                  list that I made every time to see if I made mistakes. I didn't add the AI yet, but I just wanted 
                  to see how the website would work. I started deploying-error another deployment-error. I 
                  kept receiving errors like this for a month. It was already April. I thought that instead of losing 
                  time deploying I should first find a way to integrate the main AI bot. I started researching 
                  again. Only after a month I had found the solution. It was going to cost me, but what was my 
                  scholarship for anyway? I started integrating-error another error and even more errors.
                </p>

                <p className="text-xl leading-relaxed mb-8">
                  Finally, after another three weeks I succeeded! Now I had to set up payment, legal terms and 
                  domains. Fortunately, I didn't have any problems with that. And here we are, we got to the 
                  point where I'm writing this. I just want you to know that if you got here, you're probably a 
                  way better person than me because honestly, if the roles were switched, I wouldn't have 
                  done the same. Good Luck and <span className="text-orange-400 font-bold text-2xl">WELCOME TO AFFILIFY!!!</span>
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <h3 className="text-3xl font-bold text-white mb-6">Ready to Start Your Own Journey?</h3>
              <Link href="/signup">
                <button className="bg-gradient-to-r from-red-600 to-red-800 text-white text-xl font-bold px-10 py-4 rounded-full shadow-2xl hover:from-red-700 hover:to-red-900 transform hover:scale-110 transition-all duration-300">
                  Join AFFILIFY Today
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
