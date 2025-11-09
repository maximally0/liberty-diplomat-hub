import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Wifi, Video } from "lucide-react";
import { MUN } from "@/lib/mockData";

interface MUNCardProps {
  mun: MUN;
}

export const MUNCard = ({ mun }: MUNCardProps) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFormatIcon = () => {
    switch (mun.format) {
      case 'online':
        return <Video className="h-4 w-4" />;
      case 'offline':
        return <MapPin className="h-4 w-4" />;
      case 'hybrid':
        return <Wifi className="h-4 w-4" />;
    }
  };

  return (
    <div className="liberty-card hover-lift hover-glow group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-3xl">
              {mun.logo}
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
                {mun.name}
              </h3>
              <p className="text-sm text-muted-foreground">{mun.host}</p>
            </div>
          </div>
          {mun.isFeatured && (
            <span className="liberty-badge-gold">Featured</span>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(mun.startDate)} - {formatDate(mun.endDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {getFormatIcon()}
            <span className="capitalize">{mun.format}</span>
            {mun.format !== 'online' && <span>• {mun.location}</span>}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{mun.committees.length} Committees</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {mun.isFree && (
            <span className="liberty-badge-primary">Free</span>
          )}
          {mun.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="liberty-badge bg-muted text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {mun.description}
        </p>

        {/* CTA */}
        <Link to={`/mun/${mun.id}`}>
          <Button className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};
