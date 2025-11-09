import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CertificateVault } from "@/components/CertificateVault";
import { PositionPaperUpload } from "@/components/PositionPaperUpload";
import { 
  Award, 
  Calendar, 
  TrendingUp, 
  FileText, 
  Download,
  CheckCircle,
  Clock,
  Trophy,
  Target,
  Zap
} from "lucide-react";
import { mockBadges } from "@/lib/mockData";

const Dashboard = () => {
  const mockUserData = {
    name: "Alex Rivera",
    institution: "Cambridge International School",
    xp: 2450,
    level: 7,
    nextLevelXP: 3000,
    totalMUNs: 12,
    awardsWon: 8,
    committees: ['UNSC', 'WHO', 'UNHRC', 'ECOSOC'],
    streak: 5,
    badges: mockBadges.filter(b => b.unlocked)
  };

  const upcomingMUNs = [
    {
      id: '1',
      name: 'Global Youth Summit MUN 2025',
      date: '2025-03-15',
      status: 'confirmed',
      committee: 'UNSC',
      country: 'United Kingdom'
    }
  ];

  const certificates = [
    {
      id: '1',
      event: 'Harvard WorldMUN 2024',
      award: 'Best Delegate',
      date: '2024-11-20',
      committee: 'UNSC'
    },
    {
      id: '2',
      event: 'Singapore Youth MUN',
      award: 'Outstanding Delegate',
      date: '2024-09-15',
      committee: 'WHO'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {mockUserData.name}!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="h-5 w-5 text-primary" />
              <Badge variant="outline">Level {mockUserData.level}</Badge>
            </div>
            <div className="text-2xl font-bold mb-1">{mockUserData.xp} XP</div>
            <Progress 
              value={(mockUserData.xp / mockUserData.nextLevelXP) * 100} 
              className="h-2 mb-2" 
            />
            <p className="text-xs text-muted-foreground">
              {mockUserData.nextLevelXP - mockUserData.xp} XP to Level {mockUserData.level + 1}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">MUNs Attended</span>
            </div>
            <div className="text-2xl font-bold">{mockUserData.totalMUNs}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2 this semester
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Awards Won</span>
            </div>
            <div className="text-2xl font-bold">{mockUserData.awardsWon}</div>
            <p className="text-xs text-muted-foreground mt-1">
              67% success rate
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-medium text-muted-foreground">Streak</span>
            </div>
            <div className="text-2xl font-bold">{mockUserData.streak} months</div>
            <p className="text-xs text-muted-foreground mt-1">
              Keep it going!
            </p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="upcoming" className="space-y-4">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming MUNs</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
                <TabsTrigger value="papers">Position Papers</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingMUNs.map((mun) => (
                  <Card key={mun.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-lg font-semibold mb-1">
                          {mun.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(mun.date).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                      <Badge className="liberty-badge-primary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Confirmed
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Committee</div>
                        <div className="font-medium">{mun.committee}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Country</div>
                        <div className="font-medium">{mun.country}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Upload Position Paper
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="past">
                <Card className="p-12 text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Your past MUNs will appear here
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="certificates" className="space-y-4">
                <CertificateVault />
              </TabsContent>

              <TabsContent value="papers">
                <PositionPaperUpload />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                {/* Participation Heatmap */}
                <Card className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">Participation Timeline</h3>
                  <div className="grid grid-cols-12 gap-2">
                    {Array.from({ length: 52 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-8 rounded ${
                          i % 4 === 0 ? 'bg-primary/80' : i % 3 === 0 ? 'bg-primary/40' : 'bg-muted'
                        }`}
                        title={`Week ${i + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>Jun</span>
                    <span>Sep</span>
                    <span>Dec</span>
                  </div>
                </Card>

                {/* Awards Breakdown */}
                <Card className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">Awards by Type</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-accent" />
                          Best Delegate
                        </span>
                        <span className="font-medium">3</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          Outstanding Delegate
                        </span>
                        <span className="font-medium">3</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="flex items-center gap-2">
                          <Badge className="h-4 w-4" />
                          High Commendation
                        </span>
                        <span className="font-medium">2</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                  </div>
                </Card>

                {/* Committee Experience */}
                <Card className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">Committees Attended</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['UNSC', 'WHO', 'UNHRC', 'ECOSOC'].map((committee) => (
                      <div key={committee} className="p-4 rounded-lg bg-muted/50 text-center">
                        <div className="text-2xl font-bold mb-1">
                          {Math.floor(Math.random() * 5) + 2}
                        </div>
                        <div className="text-sm text-muted-foreground">{committee}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Best Performance */}
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground text-2xl">
                      🏆
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold mb-1">
                        Best MUN Performance
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Harvard WorldMUN 2024 • UNSC
                      </p>
                      <Badge className="liberty-badge-gold">Best Delegate</Badge>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Analytics */}
            <Card className="p-6">
              <h3 className="font-display text-xl font-semibold mb-4">Your Analytics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Speaking & Debate</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Research & Preparation</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Diplomacy & Negotiation</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Procedure Knowledge</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Badges & Achievements</h3>
              <div className="grid grid-cols-2 gap-3">
                {mockUserData.badges.map((badge) => (
                  <div
                    key={badge.name}
                    className="flex flex-col items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {badge.icon}
                    </div>
                    <div className="text-xs font-medium text-center">{badge.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(badge.unlockedDate!).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {mockBadges.filter(b => !b.unlocked).slice(0, 2).map((badge) => (
                  <div
                    key={badge.name}
                    className="flex flex-col items-center p-3 rounded-lg bg-muted/30 opacity-50"
                  >
                    <div className="text-3xl mb-2 grayscale">{badge.icon}</div>
                    <div className="text-xs font-medium text-center">{badge.name}</div>
                    <div className="text-xs text-muted-foreground">Locked</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Committee Expertise */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Committee Experience</h3>
              <div className="space-y-2">
                {mockUserData.committees.map((committee) => (
                  <div
                    key={committee}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                  >
                    <span className="text-sm font-medium">{committee}</span>
                    <Badge variant="outline" className="text-xs">Expert</Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Countries Represented</dt>
                  <dd className="font-medium">8</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Position Papers</dt>
                  <dd className="font-medium">12</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Speaking Time (avg)</dt>
                  <dd className="font-medium">18 min</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Resolutions Passed</dt>
                  <dd className="font-medium">6</dd>
                </div>
              </dl>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
