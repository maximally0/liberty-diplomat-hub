import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { CountryMatrix } from "@/components/CountryMatrix";
import { AnnouncementsFeed } from "@/components/AnnouncementsFeed";
import { RegistrationWizard } from "@/components/registration/RegistrationWizard";
import { ProfileCaptureModal } from "@/components/registration/ProfileCaptureModal";
import { useRegistration } from "@/hooks/useRegistration";
import { 
  Calendar, 
  MapPin, 
  Users, 
  FileText, 
  Award,
  Bell,
  Clock,
  Globe,
  Wifi,
  Video,
  ExternalLink,
  UserCircle
} from "lucide-react";
import { mockMUNs, mockDelegates } from "@/lib/mockData";

const MUNEvent = () => {
  const { id } = useParams();
  const mun = mockMUNs.find(m => m.id === id);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRegistrationWizard, setShowRegistrationWizard] = useState(false);
  const { currentUser, saveUser, addRegistration, getUserRegistration } = useRegistration();
  
  const existingRegistration = getUserRegistration(id || '');

  if (!mun) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <Link to="/browse">
            <Button>Browse Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const daysUntil = Math.ceil(
    (new Date(mun.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const getFormatIcon = () => {
    switch (mun.format) {
      case 'online':
        return <Video className="h-5 w-5" />;
      case 'offline':
        return <MapPin className="h-5 w-5" />;
      case 'hybrid':
        return <Wifi className="h-5 w-5" />;
    }
  };

  const eventDelegates = mockDelegates.filter(d => d.munId === mun.id);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Banner */}
      <div className="relative border-b border-border">
        <div className="absolute inset-0 liberty-gradient opacity-10" />
        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-4xl">
                {mun.logo}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {mun.isFeatured && (
                    <Badge className="liberty-badge-gold">Featured</Badge>
                  )}
                  {mun.isFree && (
                    <Badge className="liberty-badge-primary">Free</Badge>
                  )}
                  <Badge variant="outline" className="gap-1">
                    {getFormatIcon()}
                    <span className="capitalize">{mun.format}</span>
                  </Badge>
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                  {mun.name}
                </h1>
                <p className="text-lg text-muted-foreground">{mun.host}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3 liberty-card p-4">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Dates</div>
                  <div className="font-medium">{formatDate(mun.startDate)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 liberty-card p-4">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Location</div>
                  <div className="font-medium">{mun.format === 'online' ? 'Virtual' : mun.city}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 liberty-card p-4">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Starts In</div>
                  <div className="font-medium">{daysUntil} days</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {existingRegistration ? (
                <Card className="p-4 bg-green-50 border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold mb-1">Registration Status</div>
                      <div className="text-sm">
                        {existingRegistration.status === 'confirmed' && '✓ Confirmed and Paid'}
                        {existingRegistration.status === 'pending_payment' && '⏳ Pending Payment (Complete within 72 hours)'}
                        {existingRegistration.status === 'pending_invoice' && '📄 Invoice Requested'}
                      </div>
                    </div>
                    <Badge variant={existingRegistration.status === 'confirmed' ? 'default' : 'secondary'}>
                      {existingRegistration.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </Card>
              ) : (
                <Button
                  size="lg"
                  className="w-full md:w-auto"
                  onClick={() => {
                    if (!currentUser) {
                      setShowProfileModal(true);
                    } else {
                      setShowRegistrationWizard(true);
                    }
                  }}
                >
                  Register for This Event
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modals */}
      {showProfileModal && (
        <ProfileCaptureModal
          open={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          onSubmit={(data) => {
            const newUser = {
              id: `user-${Date.now()}`,
              ...data,
            };
            saveUser(newUser);
            setShowProfileModal(false);
            setShowRegistrationWizard(true);
          }}
        />
      )}

      {showRegistrationWizard && currentUser && (
        <RegistrationWizard
          open={showRegistrationWizard}
          onClose={() => setShowRegistrationWizard(false)}
          munId={id || ''}
          userId={currentUser.id}
          userProfile={currentUser}
          onRegistrationComplete={(registration) => {
            addRegistration(registration);
            setShowRegistrationWizard(false);
          }}
        />
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="committees">Committees</TabsTrigger>
                <TabsTrigger value="countries">Country Matrix</TabsTrigger>
                <TabsTrigger value="delegates">Delegates</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="p-6">
                  <h2 className="font-display text-2xl font-bold mb-4">About This Event</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {mun.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mun.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">Event Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                          1
                        </div>
                        <div className="w-px h-full bg-border mt-2" />
                      </div>
                      <div className="pb-8">
                        <div className="font-semibold mb-1">Opening Ceremony</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(mun.startDate)} • 9:00 AM
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                          2
                        </div>
                        <div className="w-px h-full bg-border mt-2" />
                      </div>
                      <div className="pb-8">
                        <div className="font-semibold mb-1">Committee Sessions</div>
                        <div className="text-sm text-muted-foreground">
                          Multiple days of debate and diplomacy
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                          3
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Closing & Awards</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(mun.endDate)} • 5:00 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="committees" className="space-y-4">
                {mun.committees.length > 0 ? (
                  mun.committees.map((committee) => (
                    <Card key={committee.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-display text-xl font-semibold mb-1">
                            {committee.name}
                          </h3>
                          <p className="text-muted-foreground">{committee.agenda}</p>
                        </div>
                        <Badge variant="outline">
                          {committee.filled}/{committee.capacity} seats
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex -space-x-2">
                          {committee.chairs.map((chair) => (
                            <div
                              key={chair.id}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground border-2 border-background"
                              title={chair.name}
                            >
                              {chair.photo}
                            </div>
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Chaired by {committee.chairs.map(c => c.name).join(', ')}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <FileText className="h-4 w-4" />
                          Background Guide
                        </Button>
                        <Button size="sm">Apply for Committee</Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-12 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Committee details will be published soon
                    </p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="countries" className="space-y-4">
                <CountryMatrix isOrganizer={true} />
              </TabsContent>

              <TabsContent value="delegates" className="space-y-4">
                {eventDelegates.length > 0 ? (
                  <Card className="p-6">
                    <h3 className="font-display text-xl font-semibold mb-4">
                      Registered Delegates ({eventDelegates.length})
                    </h3>
                    <div className="space-y-3">
                      {eventDelegates.map((delegate) => (
                        <div key={delegate.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xl">
                            {delegate.photo}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{delegate.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {delegate.institution} • {delegate.country}
                            </div>
                          </div>
                          <Badge variant="outline">{delegate.committee}</Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                ) : (
                  <Card className="p-12 text-center">
                    <UserCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No delegates registered yet. Be the first!
                    </p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="documents">
                <Card className="p-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Documents will be available after registration
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="announcements">
                <AnnouncementsFeed isOrganizer={true} />
              </TabsContent>

              <TabsContent value="results">
                <Card className="p-12 text-center">
                  <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Results will be published after the event concludes
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Register as Delegate
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Bell className="h-4 w-4" />
                  Get Notifications
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Share Event
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Event Details</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground mb-1">Host Institution</dt>
                  <dd className="font-medium">{mun.host}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Format</dt>
                  <dd className="font-medium capitalize">{mun.format}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Region</dt>
                  <dd className="font-medium">{mun.region}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Registration Fee</dt>
                  <dd className="font-medium">{mun.isFree ? 'Free' : 'Paid'}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Status</dt>
                  <dd>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Open
                    </Badge>
                  </dd>
                </div>
              </dl>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MUNEvent;
