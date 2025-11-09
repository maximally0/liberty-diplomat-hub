import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Shuffle, Search, Users } from "lucide-react";
import { mockCountries, mockDelegates, Country } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";

interface CountryMatrixProps {
  isOrganizer?: boolean;
}

export const CountryMatrix = ({ isOrganizer = false }: CountryMatrixProps) => {
  const [countries, setCountries] = useState<Country[]>(mockCountries);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const getStatusColor = (status: Country['status']) => {
    switch (status) {
      case 'filled':
        return 'bg-green-500/20 border-green-500/50 text-green-700 dark:text-green-300';
      case 'available':
        return 'bg-blue-500/20 border-blue-500/50 text-blue-700 dark:text-blue-300';
      case 'waitlisted':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-700 dark:text-yellow-300';
      case 'reserved':
        return 'bg-purple-500/20 border-purple-500/50 text-purple-700 dark:text-purple-300';
    }
  };

  const handleAutoAssign = () => {
    const availableCountries = countries.filter(c => c.status === 'available');
    const unassignedDelegates = mockDelegates.filter(
      d => !countries.find(c => c.delegateId === d.id)
    );

    const newCountries = [...countries];
    availableCountries.slice(0, unassignedDelegates.length).forEach((country, index) => {
      const delegate = unassignedDelegates[index];
      const countryIndex = newCountries.findIndex(c => c.id === country.id);
      newCountries[countryIndex] = {
        ...country,
        status: 'filled',
        delegateId: delegate.id,
        delegateName: delegate.name
      };
    });

    setCountries(newCountries);
    toast({
      title: "Auto-assignment Complete",
      description: `Assigned ${Math.min(availableCountries.length, unassignedDelegates.length)} delegates to countries.`,
    });
  };

  const handleDragStart = (e: React.DragEvent, delegate: typeof mockDelegates[0]) => {
    e.dataTransfer.setData('delegateId', delegate.id);
    e.dataTransfer.setData('delegateName', delegate.name);
  };

  const handleDrop = (e: React.DragEvent, country: Country) => {
    e.preventDefault();
    const delegateId = e.dataTransfer.getData('delegateId');
    const delegateName = e.dataTransfer.getData('delegateName');

    if (country.status === 'available' || country.status === 'reserved') {
      const newCountries = countries.map(c =>
        c.id === country.id
          ? { ...c, status: 'filled' as const, delegateId, delegateName }
          : c
      );
      setCountries(newCountries);
      toast({
        title: "Delegate Assigned",
        description: `Assigned ${delegateName} to ${country.name}`,
      });
    }
  };

  const filteredCountries = countries.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        {isOrganizer && (
          <Button onClick={handleAutoAssign} className="gap-2">
            <Shuffle className="h-4 w-4" />
            Auto-Assign Countries
          </Button>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500/20 border border-blue-500/50" />
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500/50" />
          <span className="text-sm">Filled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500/20 border border-yellow-500/50" />
          <span className="text-sm">Waitlisted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-500/20 border border-purple-500/50" />
          <span className="text-sm">Reserved</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Country Grid */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Country Allocations</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {filteredCountries.map((country) => (
                <div
                  key={country.id}
                  className={`p-4 rounded-lg border-2 transition-all hover:shadow-md cursor-pointer ${getStatusColor(country.status)}`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => isOrganizer ? handleDrop(e, country) : undefined}
                  onClick={() => setSelectedCountry(country)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <div className="font-medium">{country.name}</div>
                        {country.delegateName && (
                          <div className="text-xs opacity-80">{country.delegateName}</div>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {country.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Delegates Sidebar */}
        {isOrganizer && (
          <div>
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Delegates
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag delegates to assign countries
              </p>
              <div className="space-y-2">
                {mockDelegates.map((delegate) => (
                  <div
                    key={delegate.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, delegate)}
                    className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-move transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{delegate.photo}</span>
                      <div>
                        <div className="font-medium text-sm">{delegate.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {delegate.institution}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
