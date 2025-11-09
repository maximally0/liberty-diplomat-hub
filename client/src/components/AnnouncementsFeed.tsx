import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Plus, Clock, CheckCircle } from "lucide-react";
import { mockAnnouncements, Announcement } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface AnnouncementsFeedProps {
  isOrganizer?: boolean;
}

export const AnnouncementsFeed = ({ isOrganizer = false }: AnnouncementsFeedProps) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("all");

  const handlePostAnnouncement = () => {
    const newAnnouncement: Announcement = {
      id: `a${announcements.length + 1}`,
      title,
      message,
      author: 'Sarah Chen',
      authorRole: 'Organizer',
      timestamp: new Date().toISOString(),
      munId: '1',
      committee: audience === 'all' ? undefined : audience,
      isRead: false
    };

    // Simulate posting delay
    setTimeout(() => {
      setAnnouncements([newAnnouncement, ...announcements]);
      toast({
        title: "Announcement Posted",
        description: "All delegates have been notified.",
      });
    }, 1000);

    setTitle("");
    setMessage("");
    setAudience("all");
    setIsDialogOpen(false);
  };

  const handleMarkAsRead = (id: string) => {
    setAnnouncements(announcements.map(a =>
      a.id === id ? { ...a, isRead: true } : a
    ));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold">Announcements</h2>
          <p className="text-sm text-muted-foreground">
            {announcements.filter(a => !a.isRead).length} unread
          </p>
        </div>
        {isOrganizer && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Post Announcement</DialogTitle>
                <DialogDescription>
                  Keep your committee in sync — post agendas, updates, or schedule shifts
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    placeholder="Opening Ceremony Schedule"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea
                    placeholder="The opening ceremony will begin at 9:00 AM..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Audience</label>
                  <Select value={audience} onValueChange={setAudience}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Delegates</SelectItem>
                      <SelectItem value="UNSC">UNSC Only</SelectItem>
                      <SelectItem value="WHO">WHO Only</SelectItem>
                      <SelectItem value="UNHRC">UNHRC Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handlePostAnnouncement}
                  disabled={!title || !message}
                  className="w-full"
                >
                  Post Announcement
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Announcements List */}
      {announcements.length === 0 ? (
        <Card className="p-12 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            No announcements yet
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className={`p-6 transition-all ${
                announcement.isRead 
                  ? 'opacity-70' 
                  : 'border-l-4 border-l-primary shadow-md'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className={`h-5 w-5 ${announcement.isRead ? 'text-muted-foreground' : 'text-primary'}`} />
                    <h3 className="font-semibold">{announcement.title}</h3>
                    {!announcement.isRead && (
                      <Badge className="bg-primary/20 text-primary">New</Badge>
                    )}
                  </div>
                  <p className="text-sm mb-3">{announcement.message}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTimestamp(announcement.timestamp)}
                    </div>
                    <div>•</div>
                    <div>
                      Posted by {announcement.author} ({announcement.authorRole})
                    </div>
                    {announcement.committee && (
                      <>
                        <div>•</div>
                        <Badge variant="outline" className="text-xs">
                          {announcement.committee}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
                {!announcement.isRead && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleMarkAsRead(announcement.id)}
                    className="gap-1"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Mark as Read
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
