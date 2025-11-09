import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MUNCard } from "@/components/MUNCard";
import { Navigation } from "@/components/Navigation";
import { 
  Globe, 
  Users, 
  Award, 
  Building2, 
  Search,
  ArrowRight,
  Sparkles,
  Shield,
  Trophy
} from "lucide-react";
import { mockMUNs, mockStats } from "@/lib/mockData";

const Index = () => {
  const featuredMUNs = mockMUNs.filter(mun => mun.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 liberty-gradient opacity-5" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">70+ Countries · 1000+ Active Delegates</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Join MUNs
              <span className="text-primary"> across the world</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover upcoming Model UNs, register as a delegate, and start debating — all in one place.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Find MUNs by city, format, or topic..."
                  className="pl-12 h-14 text-lg bg-card border-2"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/browse">
                <Button size="lg" className="gap-2 h-12 px-8">
                  <Search className="h-5 w-5" />
                  Browse MUNs
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="gap-2 h-12 px-8">
                  <Users className="h-5 w-5" />
                  Join as Delegate
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="gap-2 h-12 px-8">
                  <Globe className="h-5 w-5" />
                  Host a MUN
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-slide-up">
              <div className="flex justify-center mb-2">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {mockStats.totalMUNs.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total MUNs</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {mockStats.totalDelegates.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Active Delegates</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex justify-center mb-2">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {mockStats.totalInstitutions}
              </div>
              <div className="text-sm text-muted-foreground">Institutions</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex justify-center mb-2">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {mockStats.countriesRepresented}
              </div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured MUNs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">Featured Events</h2>
              <p className="text-muted-foreground">Handpicked MUNs happening soon</p>
            </div>
            <Link to="/browse">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMUNs.map((mun) => (
              <MUNCard key={mun.id} mun={mun} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Why ProjectLiberty</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              One platform for every kind of MUN.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="liberty-card text-center p-8">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Verified Events</h3>
              <p className="text-muted-foreground">
                Every MUN on ProjectLiberty is verified and secure. No spam, no confusion — just real, trusted events.
              </p>
            </div>

            <div className="liberty-card text-center p-8">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Digital Certificates</h3>
              <p className="text-muted-foreground">
                Get digital certificates and awards automatically after every event — linked directly to your profile.
              </p>
            </div>

            <div className="liberty-card text-center p-8">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Global Network</h3>
              <p className="text-muted-foreground">
                Join thousands of delegates from 70+ countries. Build your network, learn diplomacy, and grow with every MUN.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center liberty-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 liberty-gradient opacity-5" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold mb-4">
                Ready to join your next MUN?
              </h2>
              <p className="text-muted-foreground mb-8">
                Browse events, register, and start your delegate journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/browse">
                  <Button size="lg" className="gap-2">
                    Find MUNs
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-6 w-6 text-primary" />
                <span className="font-display text-lg font-bold">ProjectLiberty</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The global platform for Model United Nations conferences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/browse" className="hover:text-primary">Browse MUNs</Link></li>
                <li><Link to="/leaderboard" className="hover:text-primary">Leaderboard</Link></li>
                <li><Link to="/resources" className="hover:text-primary">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary">Guidelines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Partners</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 ProjectLiberty. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
