import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Users,
  Building2
} from "lucide-react";
import { mockBadges } from "@/lib/mockData";

const Leaderboard = () => {
  const topDelegates = [
    { rank: 1, name: 'Sarah Chen', institution: 'Oxford University', country: 'United Kingdom', xp: 8950, badges: mockBadges.filter(b => b.unlocked).length, change: 0 },
    { rank: 2, name: 'Marcus Johnson', institution: 'Harvard University', country: 'United States', xp: 8420, badges: mockBadges.filter(b => b.unlocked).length - 2, change: 1 },
    { rank: 3, name: 'Priya Sharma', institution: 'National University of Singapore', country: 'Singapore', xp: 8180, badges: mockBadges.filter(b => b.unlocked).length - 3, change: -1 },
    { rank: 4, name: 'Emma Watson', institution: 'Cambridge University', country: 'United Kingdom', xp: 7650, badges: mockBadges.filter(b => b.unlocked).length - 5, change: 2 },
    { rank: 5, name: 'Alex Rivera', institution: 'Cambridge International School', country: 'Spain', xp: 7420, badges: mockBadges.filter(b => b.unlocked).length - 6, change: 0 },
    { rank: 6, name: 'Yuki Tanaka', institution: 'Tokyo International School', country: 'Japan', xp: 7250, badges: mockBadges.filter(b => b.unlocked).length - 7, change: -2 },
    { rank: 7, name: 'Olga Petrov', institution: 'Moscow State University', country: 'Russia', xp: 7100, badges: mockBadges.filter(b => b.unlocked).length - 8, change: 1 },
    { rank: 8, name: 'Ahmed Hassan', institution: 'American University Cairo', country: 'Egypt', xp: 6890, badges: mockBadges.filter(b => b.unlocked).length - 9, change: 0 },
    { rank: 9, name: 'Sophie Martin', institution: 'Sciences Po Paris', country: 'France', xp: 6720, badges: mockBadges.filter(b => b.unlocked).length - 10, change: 3 },
    { rank: 10, name: 'Carlos Silva', institution: 'University of São Paulo', country: 'Brazil', xp: 6550, badges: mockBadges.filter(b => b.unlocked).length - 10, change: -1 },
  ];

  const topInstitutions = [
    { rank: 1, name: 'Harvard University', delegates: 156, awards: 89, country: 'United States' },
    { rank: 2, name: 'Oxford University', delegates: 142, awards: 82, country: 'United Kingdom' },
    { rank: 3, name: 'National University of Singapore', delegates: 138, awards: 76, country: 'Singapore' },
    { rank: 4, name: 'Cambridge University', delegates: 129, awards: 71, country: 'United Kingdom' },
    { rank: 5, name: 'Sciences Po Paris', delegates: 118, awards: 65, country: 'France' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-accent" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-muted-foreground">{rank}</span>;
    }
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (change < 0) {
      return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
    }
    return <span className="text-xs text-muted-foreground">—</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-2">Global Leaderboard</h1>
          <p className="text-muted-foreground">
            Top performers in the Liberty community
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="delegates" className="space-y-6">
          <TabsList>
            <TabsTrigger value="delegates" className="gap-2">
              <Users className="h-4 w-4" />
              Delegates
            </TabsTrigger>
            <TabsTrigger value="institutions" className="gap-2">
              <Building2 className="h-4 w-4" />
              Institutions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="delegates">
            {/* Top 3 Podium */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {topDelegates.slice(0, 3).map((delegate, idx) => {
                const heights = ['md:order-2', 'md:order-1', 'md:order-3'];
                const scales = ['scale-105', 'scale-100', 'scale-100'];
                return (
                  <Card key={delegate.rank} className={`p-6 text-center ${heights[idx]} ${scales[idx]} transition-all hover:shadow-lg animate-fade-in`} style={{ animationDelay: `${idx * 100}ms` }}>
                    <div className="flex justify-center mb-3">
                      {getRankIcon(delegate.rank)}
                    </div>
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl mx-auto mb-3">
                      👤
                    </div>
                    <h3 className="font-display text-lg font-bold mb-1">{delegate.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{delegate.institution}</p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Badge variant="outline">{delegate.country}</Badge>
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">{delegate.xp.toLocaleString()} XP</div>
                    <div className="text-xs text-muted-foreground">{delegate.badges} badges earned</div>
                  </Card>
                );
              })}
            </div>

            {/* Full Leaderboard */}
            <Card>
              <div className="p-6 border-b border-border">
                <h3 className="font-display text-xl font-semibold">Top 10 Delegates</h3>
              </div>
              <div className="divide-y divide-border">
                {topDelegates.map((delegate) => (
                  <div key={delegate.rank} className="p-4 hover:bg-muted/50 transition-all hover:shadow-sm animate-fade-in" style={{ animationDelay: `${delegate.rank * 50}ms` }}>
                    <div className="flex items-center gap-4">
                      <div className="flex w-12 justify-center">
                        {getRankIcon(delegate.rank)}
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl">
                        👤
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{delegate.name}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{delegate.institution}</span>
                          <span>•</span>
                          <span>{delegate.country}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg mb-1">{delegate.xp.toLocaleString()}</div>
                        <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                          <Medal className="h-3 w-3 text-accent" />
                          {delegate.badges} badges
                        </div>
                      </div>
                      <div className="w-8">
                        {getTrendIcon(delegate.change)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="institutions">
            <Card>
              <div className="p-6 border-b border-border">
                <h3 className="font-display text-xl font-semibold">Top Institutions</h3>
              </div>
              <div className="divide-y divide-border">
                {topInstitutions.map((institution) => (
                  <div key={institution.rank} className="p-6 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex w-12 justify-center">
                        {getRankIcon(institution.rank)}
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-2xl">
                        🏛️
                      </div>
                      <div className="flex-1">
                        <div className="font-display font-semibold text-lg mb-1">{institution.name}</div>
                        <div className="text-sm text-muted-foreground">{institution.country}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-8 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary mb-1">{institution.delegates}</div>
                          <div className="text-xs text-muted-foreground">Delegates</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-accent mb-1">{institution.awards}</div>
                          <div className="text-xs text-muted-foreground">Awards</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <Card className="p-8 text-center mt-8">
          <Award className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="font-display text-xl font-semibold mb-2">
            Want to see your name here?
          </h3>
          <p className="text-muted-foreground mb-4">
            Participate in MUNs, earn awards, and climb the leaderboard
          </p>
          <Button>Browse Upcoming MUNs</Button>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
