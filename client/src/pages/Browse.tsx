import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MUNCard } from "@/components/MUNCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { mockMUNs } from "@/lib/mockData";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filteredMUNs = mockMUNs.filter(mun => {
    const matchesSearch = mun.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mun.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mun.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFormat = selectedFormat === "all" || mun.format === selectedFormat;
    const matchesRegion = selectedRegion === "all" || mun.region === selectedRegion;
    const matchesFree = !showFreeOnly || mun.isFree;

    return matchesSearch && matchesFormat && matchesRegion && matchesFree;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedFormat("all");
    setSelectedRegion("all");
    setShowFreeOnly(false);
  };

  const activeFilterCount = [
    selectedFormat !== "all",
    selectedRegion !== "all",
    showFreeOnly
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-2">Browse MUN Events</h1>
          <p className="text-muted-foreground">
            Discover Model United Nations conferences from around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="liberty-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, city, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Format Filter */}
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            {/* Region Filter */}
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Global">Global</SelectItem>
                <SelectItem value="Asia">Asia</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
                <SelectItem value="Americas">Americas</SelectItem>
                <SelectItem value="Middle East">Middle East</SelectItem>
              </SelectContent>
            </Select>

            {/* Free Filter */}
            <Button
              variant={showFreeOnly ? "default" : "outline"}
              onClick={() => setShowFreeOnly(!showFreeOnly)}
              className="w-full md:w-auto"
            >
              Free Only
            </Button>
          </div>

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="ml-auto gap-1"
              >
                <X className="h-4 w-4" />
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredMUNs.length} event{filteredMUNs.length !== 1 ? 's' : ''} found
          </p>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* MUN Grid */}
        {filteredMUNs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMUNs.map((mun) => (
              <MUNCard key={mun.id} mun={mun} />
            ))}
          </div>
        ) : (
          <div className="liberty-card p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">No MUNs match your filters</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or clearing some filters
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
