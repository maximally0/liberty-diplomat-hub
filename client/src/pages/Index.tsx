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
  Trophy
} from "lucide-react";
import { mockStats } from "@/lib/mockData";
import { useEffect, useState } from "react";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-noir-black text-white film-grain overflow-hidden">
      <Navigation />

      {/* Hero Section - Cinematic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Spotlight Effect */}
        <div className="spotlight-effect"></div>
        
        {/* Animated Background Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-noir-gold to-transparent"></div>
          <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-noir-crimson to-transparent"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-noir-gold to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div 
            className="max-w-6xl mx-auto text-center parallax-text"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            {/* Overline */}
            <div className="cinematic-fade-in mb-8" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center gap-3 px-6 py-3 border border-noir-gold/30 bg-noir-gold/5 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-noir-gold animate-pulse" />
                <span className="text-sm font-display tracking-widest text-noir-gold uppercase">
                  70+ Countries · 1000+ Active Delegates
                </span>
              </div>
            </div>
            
            {/* Main Headline */}
            <h1 
              className="font-display text-7xl md:text-9xl font-bold mb-12 leading-none cinematic-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              <span className="block text-white letter-spacing-wide">THE</span>
              <span className="block text-noir-gold noir-glow tracking-wide">LIBERTY</span>
              <span className="block text-white/90 text-5xl md:text-7xl mt-6 font-serif italic">
                Discourse
              </span>
            </h1>
            
            {/* Subtitle */}
            <p 
              className="text-xl md:text-2xl text-white/70 mb-16 max-w-3xl mx-auto font-serif leading-relaxed cinematic-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              Where nations converge, ideas clash, and history unfolds.
              <br />
              <span className="text-noir-gold/80">Enter the chamber of global discourse.</span>
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-6 justify-center mb-20 cinematic-fade-in"
              style={{ animationDelay: '0.8s' }}
            >
              <Link to="/browse">
                <Button 
                  size="lg" 
                  className="bg-noir-gold text-noir-black hover:bg-noir-gold/90 h-14 px-10 text-base font-display tracking-wider uppercase border-2 border-noir-gold transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                >
                  Explore Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 text-base font-display tracking-wider uppercase backdrop-blur-sm transition-all duration-300"
                >
                  Join the Discourse
                </Button>
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="cinematic-fade-in" style={{ animationDelay: '1s' }}>
              <div className="inline-block animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
                  <div className="w-1 h-3 bg-noir-gold rounded-full mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Minimalist */}
      <section className="relative py-24 border-y border-white/10 bg-gradient-to-b from-noir-black to-noir-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            <div className="text-center group cursor-default cinematic-fade-in">
              <div className="text-6xl md:text-7xl font-display text-noir-gold mb-3 transition-all duration-500 group-hover:scale-110">
                {mockStats.totalMUNs}
              </div>
              <div className="text-sm text-white/50 uppercase tracking-widest font-display">
                Total Events
              </div>
            </div>
            <div className="text-center group cursor-default cinematic-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-6xl md:text-7xl font-display text-white mb-3 transition-all duration-500 group-hover:scale-110">
                {mockStats.totalDelegates.toLocaleString()}
              </div>
              <div className="text-sm text-white/50 uppercase tracking-widest font-display">
                Delegates
              </div>
            </div>
            <div className="text-center group cursor-default cinematic-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-6xl md:text-7xl font-display text-noir-gold mb-3 transition-all duration-500 group-hover:scale-110">
                {mockStats.totalInstitutions}
              </div>
              <div className="text-sm text-white/50 uppercase tracking-widest font-display">
                Institutions
              </div>
            </div>
            <div className="text-center group cursor-default cinematic-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-6xl md:text-7xl font-display text-white mb-3 transition-all duration-500 group-hover:scale-110">
                {mockStats.countriesRepresented}
              </div>
              <div className="text-sm text-white/50 uppercase tracking-widest font-display">
                Nations
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Cinematic Cards */}
      <section className="relative py-32 bg-noir-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 text-white tracking-wide">
              THE <span className="text-noir-gold">TRINITY</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg font-serif italic">
              Three pillars upon which the discourse stands
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="group relative overflow-hidden border border-white/10 bg-gradient-to-b from-noir-gray/50 to-noir-black p-10 transition-all duration-500 hover:border-noir-gold/50 hover:shadow-[0_0_50px_rgba(212,175,55,0.2)]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-noir-gold/5 rounded-full blur-3xl transition-all duration-500 group-hover:bg-noir-gold/10"></div>
              <div className="relative z-10">
                <Shield className="h-12 w-12 text-noir-gold mb-6 transition-transform duration-500 group-hover:scale-110" />
                <h3 className="font-display text-2xl font-semibold mb-4 text-white tracking-wide">
                  VERIFIED
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Every discourse vetted. Every event authentic. No pretense, no confusion—only truth.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden border border-white/10 bg-gradient-to-b from-noir-gray/50 to-noir-black p-10 transition-all duration-500 hover:border-noir-gold/50 hover:shadow-[0_0_50px_rgba(212,175,55,0.2)]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-noir-crimson/5 rounded-full blur-3xl transition-all duration-500 group-hover:bg-noir-crimson/10"></div>
              <div className="relative z-10">
                <Trophy className="h-12 w-12 text-noir-gold mb-6 transition-transform duration-500 group-hover:scale-110" />
                <h3 className="font-display text-2xl font-semibold mb-4 text-white tracking-wide">
                  LAURELS
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Digital honors, forever etched. Your achievements immortalized in the eternal ledger.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden border border-white/10 bg-gradient-to-b from-noir-gray/50 to-noir-black p-10 transition-all duration-500 hover:border-noir-gold/50 hover:shadow-[0_0_50px_rgba(212,175,55,0.2)]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-noir-gold/5 rounded-full blur-3xl transition-all duration-500 group-hover:bg-noir-gold/10"></div>
              <div className="relative z-10">
                <Globe className="h-12 w-12 text-noir-gold mb-6 transition-transform duration-500 group-hover:scale-110" />
                <h3 className="font-display text-2xl font-semibold mb-4 text-white tracking-wide">
                  ASSEMBLY
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Seventy nations. Thousands united. A fellowship forged in the fires of debate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Dramatic */}
      <section className="relative py-40 overflow-hidden">
        {/* Dramatic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir-black via-noir-gray to-noir-black"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-noir-gold/20 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-6xl md:text-7xl font-bold mb-8 text-white tracking-wide leading-tight">
              YOUR STORY
              <br />
              <span className="text-noir-gold noir-glow">AWAITS</span>
            </h2>
            <p className="text-xl text-white/70 mb-12 font-serif italic max-w-2xl mx-auto">
              Step into the arena. Make your mark. Let history remember your voice.
            </p>
            <Link to="/browse">
              <Button 
                size="lg" 
                className="bg-noir-gold text-noir-black hover:bg-noir-gold/90 h-16 px-12 text-lg font-display tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
              >
                Begin Your Journey
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Minimal Noir */}
      <footer className="relative border-t border-white/10 bg-noir-black">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-6 w-6 text-noir-gold" />
                <span className="font-display text-xl font-bold text-white tracking-wide">LIBERTY</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                The stage for diplomatic excellence.
              </p>
            </div>
            <div>
              <h4 className="font-display text-sm font-semibold mb-4 text-white/90 tracking-widest uppercase">Platform</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li><Link to="/browse" className="hover:text-noir-gold transition-colors">Browse Events</Link></li>
                <li><Link to="/leaderboard" className="hover:text-noir-gold transition-colors">Leaderboard</Link></li>
                <li><Link to="/resources" className="hover:text-noir-gold transition-colors">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm font-semibold mb-4 text-white/90 tracking-widest uppercase">Support</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li><a href="#" className="hover:text-noir-gold transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-noir-gold transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-noir-gold transition-colors">Guidelines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm font-semibold mb-4 text-white/90 tracking-widest uppercase">Company</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li><a href="#" className="hover:text-noir-gold transition-colors">About</a></li>
                <li><a href="#" className="hover:text-noir-gold transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-noir-gold transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-white/40 font-display tracking-wide">
            <p>© 2025 LIBERTY. ALL RIGHTS RESERVED.</p>
            <p className="mt-2 text-white/30">
              AN INITIATIVE BY <span className="text-noir-gold font-semibold tracking-wider">MAXIMALLY</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
