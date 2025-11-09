import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LandingPageEvent } from "@/lib/mockData";

interface EventCardProps {
  event: LandingPageEvent;
  gradientFrom: string;
  gradientTo: string;
  buttonText?: string;
  borderColor?: string;
}

export const EventCard = ({ event, gradientFrom, gradientTo, buttonText = "Learn More", borderColor }: EventCardProps) => {
  return (
    <div className={`group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 ${borderColor ? `border-2 ${borderColor}` : ''}`}>
      <div className={`inline-flex px-3 py-1 rounded-full ${event.badgeBgClass} ${event.badgeTextClass} text-xs font-bold mb-4`}>
        {event.badgeText}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
      <p className="text-sm text-gray-600 mb-3">{event.location} • {event.dates}</p>
      <p className="text-sm text-gray-500 mb-4">{event.description}</p>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {event.tags.map((tag, idx) => (
          <span
            key={idx}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              tag === 'FREE'
                ? 'bg-playful-rose text-playful-pink'
                : tag === 'Crisis'
                ? 'bg-playful-peach text-playful-orange'
                : tag === 'Regional'
                ? 'bg-playful-mint text-playful-lime'
                : tag === 'Specialized'
                ? 'bg-playful-lavender text-playful-purple'
                : tag === 'Beginner Friendly'
                ? 'bg-playful-sky text-playful-blue'
                : tag === 'Offline'
                ? 'bg-playful-lavender text-playful-purple'
                : 'bg-playful-sky text-playful-blue'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <Link to={`/mun/${event.id}`}>
        <Button className={`w-full bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white rounded-full font-bold hover:shadow-lg`}>
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};
