import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MUNCard } from "@/components/MUNCard";
import { Navigation } from "@/components/Navigation";
import { 
  Search,
  Clock,
  TrendingUp,
  Trophy,
  Globe,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { mockMUNs, mockBadges } from "@/lib/mockData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: "All" },
    { id: "online", label: "Online" },
    { id: "offline", label: "Offline" },
    { id: "hybrid", label: "Hybrid" },
    { id: "free", label: "Free" },
    { id: "closing-soon", label: "Closing Soon" },
  ];

  const featuredMUNs = mockMUNs.filter(m => m.isFeatured).slice(0, 6);
  const closingSoon = mockMUNs.slice(0, 4);
  const newAndPopular = mockMUNs.slice(3, 9);

  const topDelegates = [
    { rank: 1, name: 'Sarah Chen', institution: 'Oxford University', xp: 8950, awards: 12 },
    { rank: 2, name: 'Marcus Johnson', institution: 'Harvard University', xp: 8420, awards: 11 },
    { rank: 3, name: 'Priya Sharma', institution: 'NUS', xp: 8180, awards: 10 },
    { rank: 4, name: 'Emma Watson', institution: 'Cambridge', xp: 7650, awards: 9 },
    { rank: 5, name: 'Alex Rivera', institution: 'CIS Madrid', xp: 7420, awards: 8 },
  ];

  const institutions = [
    { name: 'Harvard', logo: '🏛️' },
    { name: 'Oxford', logo: '🎓' },
    { name: 'Stanford', logo: '🌉' },
    { name: 'Cambridge', logo: '📚' },
    { name: 'NUS', logo: '🦁' },
    { name: 'Sciences Po', logo: '🗼' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Search Hero - Minimal */}
      <section className="border-b bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-semibold text-foreground mb-2 text-center">
              Find Model UNs around the world
            </h1>
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Search by city, institution, or format
            </p>

            {/* Large Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search MUNs by name, city, or host..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base border-2"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2 justify-center">
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured MUNs */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Featured MUNs</h2>
            <Link to="/browse">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMUNs.map((mun) => (
              <MUNCard key={mun.id} mun={mun} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing Soon - Horizontal Scroll */}
      <section className="py-12 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Closing Soon</h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {closingSoon.map((mun) => (
              <div key={mun.id} className="min-w-[320px] flex-shrink-0">
                <div className="liberty-card p-5 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{mun.logo}</div>
                    <Badge variant="destructive" className="text-xs">
                      3 days left
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{mun.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{mun.host}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">{mun.format}</Badge>
                    {mun.isFree && <Badge variant="secondary" className="text-xs">Free</Badge>}
                  </div>
                  <Link to={`/mun/${mun.id}`}>
                    <Button size="sm" className="w-full">View Details</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New & Popular */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">New & Popular</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newAndPopular.map((mun) => (
              <MUNCard key={mun.id} mun={mun} />
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Snapshot */}
      <section className="py-12 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-semibold">Leaderboard</h2>
            </div>
            <Link to="/leaderboard">
              <Button variant="ghost" size="sm" className="gap-1">
                View Full Leaderboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="liberty-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Rank</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Institution</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">XP</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Awards</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topDelegates.map((delegate) => (
                  <tr key={delegate.rank} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                        {delegate.rank}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{delegate.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{delegate.institution}</td>
                    <td className="py-3 px-4 text-right font-semibold">{delegate.xp.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant="outline" className="text-xs">{delegate.awards}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Institution Logos */}
      <section className="py-8 border-b bg-white">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground text-center mb-6">
            Top Institutions Hosting on ProjectLiberty
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap grayscale opacity-60">
            {institutions.map((inst) => (
              <div key={inst.name} className="flex flex-col items-center gap-1">
                <div className="text-4xl">{inst.logo}</div>
                <div className="text-xs font-medium">{inst.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 text-sm">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/browse" className="hover:text-foreground">Browse MUNs</Link></li>
                <li><Link to="/leaderboard" className="hover:text-foreground">Leaderboard</Link></li>
                <li><Link to="/resources" className="hover:text-foreground">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
                <li><a href="#" className="hover:text-foreground">Guidelines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Partners</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-5 w-5 text-primary" />
                <span className="font-semibold text-sm">ProjectLiberty</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Built for the world's next generation of diplomats
              </p>
            </div>
          </div>
          <div className="pt-6 border-t text-center">
            <p className="text-xs text-muted-foreground">
              © 2025 ProjectLiberty · All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
