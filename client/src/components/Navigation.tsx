import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Menu, User, Search, Bell, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const isSignedIn = false; // Mock state

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const browseMUNsItems = [
    { label: "All MUNs", path: "/browse" },
    { label: "Online MUNs", path: "/browse?format=online" },
    { label: "Offline MUNs", path: "/browse?format=offline" },
    { label: "Hybrid MUNs", path: "/browse?format=hybrid" },
    { label: "Beginner-Friendly", path: "/browse?level=beginner" },
    { label: "Advanced Committees", path: "/browse?level=advanced" },
  ];

  const hostMUNItems = [
    { label: "Host a public MUN", path: "/auth" },
    { label: "Manage your institution", path: "/auth" },
    { label: "Create recurring event", path: "/auth" },
  ];

  const resourcesItems = [
    { label: "Delegate Guide", path: "/resources" },
    { label: "Rules of Procedure", path: "/resources" },
    { label: "Crisis Committee Tips", path: "/resources" },
    { label: "Article Library", path: "/resources" },
    { label: "Help Center", path: "/resources" },
  ];

  const profileItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "My MUNs", path: "/dashboard" },
    { label: "Settings", path: "/dashboard" },
    { label: "Log Out", path: "/" },
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full bg-white border-b border-[#E5E7EB] transition-shadow ${hasScrolled ? "shadow-[0_1px_4px_rgba(0,0,0,0.05)]" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="flex h-[60px] items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Globe className="h-5 w-5 text-[#0A0A0A]" />
            <span className="font-semibold text-[#0A0A0A]">
              Liberty
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Browse MUNs Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-[#0A0A0A] font-medium hover:text-[#0072CE] transition-colors text-[15px] outline-none">
                Browse MUNs
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-[#E5E7EB] rounded shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-[100]">
                {browseMUNsItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link to={item.path} className="cursor-pointer text-[#0A0A0A] hover:text-[#0072CE] font-normal">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Host a MUN Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-[#0A0A0A] font-medium hover:text-[#0072CE] transition-colors text-[15px] outline-none">
                Host a MUN
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-[#E5E7EB] rounded shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-[100]">
                {hostMUNItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link to={item.path} className="cursor-pointer text-[#0A0A0A] hover:text-[#0072CE] font-normal">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-[#0A0A0A] font-medium hover:text-[#0072CE] transition-colors text-[15px] outline-none">
                Resources
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-[#E5E7EB] rounded shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-[100]">
                {resourcesItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link to={item.path} className="cursor-pointer text-[#0A0A0A] hover:text-[#0072CE] font-normal">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            {searchExpanded ? (
              <div className="relative">
                <Input
                  placeholder="Search MUNs or institutions…"
                  className="w-64 h-9 bg-[#F3F4F6] border-[#E5E7EB] rounded-sm"
                  autoFocus
                  onBlur={() => setSearchExpanded(false)}
                />
              </div>
            ) : (
              <button
                onClick={() => setSearchExpanded(true)}
                className="text-[#6B7280] hover:text-[#0072CE] transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            )}

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-[#6B7280] hover:text-[#0072CE] transition-colors relative outline-none">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 bg-white border border-[#E5E7EB] rounded shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-[100]">
                <DropdownMenuItem className="text-[#0A0A0A] font-normal">
                  New announcement posted in UNSC
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#0A0A0A] font-normal">
                  Position paper feedback received
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#0A0A0A] font-normal">
                  New certificate available
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile / Sign In */}
            {isSignedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="h-8 w-8 rounded-full bg-[#E5E7EB] flex items-center justify-center">
                    <User className="h-4 w-4 text-[#0A0A0A]" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white border border-[#E5E7EB] rounded shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-[100]">
                  {profileItems.map((item) => (
                    <DropdownMenuItem key={item.label} asChild>
                      <Link to={item.path} className="cursor-pointer text-[#0A0A0A] hover:text-[#0072CE] font-normal">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth" className="text-[#0A0A0A] hover:text-[#0072CE] font-medium text-[15px] transition-colors">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                <Link to="/browse" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Browse MUNs
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Host a MUN
                  </Button>
                </Link>
                <Link to="/resources" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Resources
                  </Button>
                </Link>
                <div className="pt-4 border-t">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
