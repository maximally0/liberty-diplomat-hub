import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { 
  Globe, 
  Users, 
  Award, 
  Building2, 
  ArrowRight,
  Sparkles,
  Shield,
  Trophy,
  Zap,
  Heart,
  Star
} from "lucide-react";
import { mockStats } from "@/lib/mockData";
import { useEffect, useState } from "react";
import { FloatingBlobs } from "@/components/FloatingBlobs";
import { CursorTrail } from "@/components/CursorTrail";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-playful-lavender via-white to-playful-sky overflow-hidden relative">
      <CursorTrail />
      <FloatingBlobs />
      <Navigation />

      {/* Hero Section - Playful Techcore */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div 
            className="max-w-6xl mx-auto text-center"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            {/* Floating Badge */}
            <div className="mb-8 animate-bounce-soft inline-block">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-playful-purple/20 to-playful-pink/20 backdrop-blur-lg border-2 border-playful-purple/30 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Sparkles className="h-5 w-5 text-playful-purple animate-wiggle" />
                <span className="text-sm font-bold tracking-wide bg-gradient-to-r from-playful-purple to-playful-pink bg-clip-text text-transparent">
                  70+ Countries · 1000+ Active Delegates
                </span>
                <Star className="h-4 w-4 text-playful-pink animate-pulse" />
              </div>
            </div>
            
            {/* Main Headline with Gradient */}
            <h1 className="font-display text-6xl md:text-8xl font-extrabold mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-playful-purple via-playful-pink to-playful-blue bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                Welcome to
              </span>
              <span className="block text-7xl md:text-9xl bg-gradient-to-r from-playful-cyan via-playful-blue to-playful-purple bg-clip-text text-transparent mt-4 animate-gradient-x bg-[length:200%_auto] drop-shadow-2xl">
                LIBERTY
              </span>
              <span className="block text-4xl md:text-6xl mt-6 bg-gradient-to-r from-playful-orange via-playful-yellow to-playful-lime bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                Where Ideas Come Alive
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
              Join thousands of delegates from around the world in the most vibrant MUN platform. 
              <br />
              <span className="bg-gradient-to-r from-playful-purple to-playful-pink bg-clip-text text-transparent font-bold">
                Let's make diplomacy fun again!
              </span>
            </p>

            {/* CTA Buttons with 3D effect */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <Link to="/browse">
                <Button 
                  size="lg" 
                  className="relative group bg-gradient-to-r from-playful-purple to-playful-pink text-white hover:shadow-2xl h-16 px-12 text-lg font-bold rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Events
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-playful-pink to-playful-purple opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button 
                  size="lg" 
                  className="relative group bg-white text-playful-purple hover:shadow-2xl h-16 px-12 text-lg font-bold rounded-full border-4 border-playful-purple/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:border-playful-pink/50"
                >
                  <span className="flex items-center gap-2 bg-gradient-to-r from-playful-purple to-playful-pink bg-clip-text text-transparent">
                    Join the Fun
                    <Heart className="h-5 w-5 text-playful-pink group-hover:animate-bounce-soft" />
                  </span>
                </Button>
              </Link>
            </div>

            {/* Fun Scroll Indicator */}
            <div className="animate-bounce-soft">
              <div className="inline-flex flex-col items-center gap-2">
                <div className="w-8 h-12 rounded-full bg-gradient-to-b from-playful-purple/30 to-playful-pink/30 border-3 border-playful-purple/50 p-1 backdrop-blur-sm">
                  <div className="w-2 h-3 bg-gradient-to-b from-playful-purple to-playful-pink rounded-full mx-auto animate-pulse" />
                </div>
                <span className="text-xs font-medium text-playful-purple">Scroll for more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating 3D Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-playful-yellow to-playful-orange rounded-3xl animate-float shadow-2xl opacity-80 rotate-12" />
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-gradient-to-br from-playful-cyan to-playful-blue rounded-full animate-float-slow shadow-2xl opacity-80" />
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-gradient-to-br from-playful-pink to-playful-purple rounded-2xl animate-blob shadow-xl opacity-80" />
      </section>

      {/* Stats Section - Playful Cards */}
      <section className="relative py-24 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center group cursor-default">
              <div className="bg-gradient-to-br from-playful-purple to-playful-pink p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:-rotate-2">
                <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">
                  {mockStats.totalMUNs}
                </div>
                <div className="text-sm text-white/90 font-semibold tracking-wide">
                  Events
                </div>
              </div>
            </div>
            <div className="text-center group cursor-default">
              <div className="bg-gradient-to-br from-playful-cyan to-playful-blue p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-2">
                <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">
                  {mockStats.totalDelegates.toLocaleString()}
                </div>
                <div className="text-sm text-white/90 font-semibold tracking-wide">
                  Delegates
                </div>
              </div>
            </div>
            <div className="text-center group cursor-default">
              <div className="bg-gradient-to-br from-playful-yellow to-playful-orange p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:-rotate-2">
                <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">
                  {mockStats.totalInstitutions}
                </div>
                <div className="text-sm text-white/90 font-semibold tracking-wide">
                  Institutions
                </div>
              </div>
            </div>
            <div className="text-center group cursor-default">
              <div className="bg-gradient-to-br from-playful-mint to-playful-lime p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-2">
                <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">
                  {mockStats.countriesRepresented}
                </div>
                <div className="text-sm text-white/90 font-semibold tracking-wide">
                  Nations
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Bubbly Cards */}
      <section className="relative py-32 bg-gradient-to-b from-white via-playful-lavender/20 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-playful-purple via-playful-pink to-playful-blue bg-clip-text text-transparent">
              Why You'll Love It Here
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
              Three amazing features that make Liberty special
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 - Verified */}
            <div className="group relative overflow-hidden rounded-3xl bg-white p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-playful-purple/20 to-playful-pink/20 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-playful-purple to-playful-pink shadow-lg mb-6 group-hover:animate-bounce-soft">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 text-gray-800">
                  Verified Events
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every event is carefully vetted and authentic. Join with confidence knowing you're in the right place!
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-playful-purple to-playful-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl" />
            </div>

            {/* Card 2 - Achievements */}
            <div className="group relative overflow-hidden rounded-3xl bg-white p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-playful-cyan/20 to-playful-blue/20 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-playful-cyan to-playful-blue shadow-lg mb-6 group-hover:animate-bounce-soft">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 text-gray-800">
                  Digital Achievements
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Earn badges, collect honors, and showcase your diplomatic excellence to the world!
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-playful-cyan to-playful-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl" />
            </div>

            {/* Card 3 - Global Community */}
            <div className="group relative overflow-hidden rounded-3xl bg-white p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-playful-yellow/20 to-playful-orange/20 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-playful-yellow to-playful-orange shadow-lg mb-6 group-hover:animate-bounce-soft">
                  <Globe className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 text-gray-800">
                  Global Community
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect with thousands of delegates from 70+ countries. Make friends, share ideas, grow together!
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-playful-yellow to-playful-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Energetic */}
      <section className="relative py-40 overflow-hidden bg-gradient-to-br from-playful-purple via-playful-pink to-playful-blue">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 animate-bounce-soft">
              <Zap className="h-8 w-8 text-yellow-300 animate-pulse" />
              <Star className="h-6 w-6 text-yellow-200 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <Sparkles className="h-7 w-7 text-yellow-300 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            
            <h2 className="font-display text-5xl md:text-7xl font-extrabold mb-8 text-white leading-tight drop-shadow-2xl">
              Ready to Start Your
              <br />
              <span className="text-6xl md:text-8xl">Adventure?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 font-semibold max-w-2xl mx-auto drop-shadow-lg">
              Join thousands of delegates making a difference. Your voice matters, your ideas count!
            </p>
            
            <Link to="/browse">
              <Button 
                size="lg" 
                className="relative group bg-white text-playful-purple hover:shadow-2xl h-20 px-16 text-xl font-bold rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-2 shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Let's Go!
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-3 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-playful-yellow to-playful-orange opacity-0 group-hover:opacity-20 rounded-full transition-opacity" />
              </Button>
            </Link>
            
            <p className="mt-8 text-white/80 text-sm font-medium">
              Free to join • No credit card required • Start in seconds
            </p>
          </div>
        </div>
      </section>

      {/* Footer - Playful */}
      <footer className="relative bg-gradient-to-br from-playful-lavender via-white to-playful-sky pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-playful-purple to-playful-pink">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <span className="font-display text-2xl font-extrabold bg-gradient-to-r from-playful-purple to-playful-pink bg-clip-text text-transparent">LIBERTY</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                Making diplomacy fun and accessible for everyone!
              </p>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold mb-4 text-playful-purple">Platform</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link to="/browse" className="hover:text-playful-pink transition-colors font-medium hover:translate-x-1 inline-block">Browse Events</Link></li>
                <li><Link to="/leaderboard" className="hover:text-playful-pink transition-colors font-medium hover:translate-x-1 inline-block">Leaderboard</Link></li>
                <li><Link to="/resources" className="hover:text-playful-pink transition-colors font-medium hover:translate-x-1 inline-block">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold mb-4 text-playful-blue">Support</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-playful-cyan transition-colors font-medium hover:translate-x-1 inline-block">Help Center</a></li>
                <li><a href="#" className="hover:text-playful-cyan transition-colors font-medium hover:translate-x-1 inline-block">Contact</a></li>
                <li><a href="#" className="hover:text-playful-cyan transition-colors font-medium hover:translate-x-1 inline-block">Guidelines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold mb-4 text-playful-orange">Company</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-playful-yellow transition-colors font-medium hover:translate-x-1 inline-block">About</a></li>
                <li><a href="#" className="hover:text-playful-yellow transition-colors font-medium hover:translate-x-1 inline-block">Partners</a></li>
                <li><a href="#" className="hover:text-playful-yellow transition-colors font-medium hover:translate-x-1 inline-block">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t-2 border-playful-lavender text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-playful-pink animate-pulse" />
              <p className="text-sm text-gray-600 font-semibold">Made with love for the MUN community</p>
              <Heart className="h-4 w-4 text-playful-pink animate-pulse" />
            </div>
            <p className="text-xs text-gray-500 font-medium">© 2025 LIBERTY. All rights reserved.</p>
            <p className="mt-2 text-xs text-gray-400">
              An initiative by <span className="bg-gradient-to-r from-playful-purple to-playful-pink bg-clip-text text-transparent font-bold">MAXIMALLY</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
