import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen,
  Download,
  Play,
  FileText,
  Search,
  ExternalLink
} from "lucide-react";

const Resources = () => {
  const resources = [
    {
      id: '1',
      title: 'Complete Guide to Parliamentary Procedure',
      type: 'PDF',
      category: 'Procedure',
      description: 'Comprehensive guide covering rules of procedure, motions, and parliamentary tactics.',
      downloads: 2450,
      icon: FileText
    },
    {
      id: '2',
      title: 'Research & Position Paper Writing',
      type: 'Article',
      category: 'Research',
      description: 'Learn how to conduct effective research and write compelling position papers.',
      downloads: 1890,
      icon: BookOpen
    },
    {
      id: '3',
      title: 'Diplomatic Negotiation Techniques',
      type: 'Video',
      category: 'Diplomacy',
      description: 'Master the art of negotiation, lobbying, and building effective blocs.',
      downloads: 1650,
      icon: Play
    },
    {
      id: '4',
      title: 'Crisis Committee Strategy Guide',
      type: 'PDF',
      category: 'Advanced',
      description: 'Advanced strategies for fast-paced crisis committees and dynamic simulations.',
      downloads: 1420,
      icon: FileText
    },
    {
      id: '5',
      title: 'Public Speaking for Delegates',
      type: 'Video',
      category: 'Speaking',
      description: 'Improve your public speaking, speech delivery, and communication skills.',
      downloads: 2180,
      icon: Play
    },
    {
      id: '6',
      title: 'Introduction to MUN for Beginners',
      type: 'Article',
      category: 'Beginner',
      description: 'Everything you need to know to get started with Model United Nations.',
      downloads: 3240,
      icon: BookOpen
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-2">Resource Library</h1>
          <p className="text-muted-foreground">
            Free guides, articles, and videos to help you excel in MUN
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            All Resources
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Procedure
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Research
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Diplomacy
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Speaking
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Beginner
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Advanced
          </Badge>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Card key={resource.id} className="p-6 hover-lift hover-glow group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline">{resource.category}</Badge>
                </div>

                <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{resource.type}</span>
                  <span>{resource.downloads.toLocaleString()} downloads</span>
                </div>

                <Button variant="outline" className="w-full gap-2">
                  {resource.type === 'Video' ? (
                    <>
                      <Play className="h-4 w-4" />
                      Watch Now
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Download
                    </>
                  )}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* External Resources */}
        <Card className="p-8 mt-12">
          <h2 className="font-display text-2xl font-bold mb-4">External Resources</h2>
          <p className="text-muted-foreground mb-6">
            Curated links to helpful external resources and organizations
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://www.un.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <ExternalLink className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">United Nations Official Site</div>
                <div className="text-sm text-muted-foreground">Official UN documents and resources</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <ExternalLink className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Best Delegate</div>
                <div className="text-sm text-muted-foreground">MUN training and resources</div>
              </div>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Resources;
