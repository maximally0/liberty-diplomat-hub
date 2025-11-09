import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Menu, User, Search, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { NotificationsCenter } from "./NotificationsCenter";

export const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [eventMode, setEventMode] = useState<'all' | 'online' | 'offline'>('all');

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/browse", label: "Browse MUNs" },
    { path: "/leaderboard", label: "Leaderboard" },
    { path: "/resources", label: "Resources" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-[60px] items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Globe className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg text-foreground">
              ProjectLiberty
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <button
                  className={`px-3 py-2 text-[15px] font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </button>
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            {/* Event Mode Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 text-sm font-medium">
                  {eventMode === 'all' ? 'All Events' : eventMode === 'online' ? 'Online' : 'Offline'}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setEventMode('all')}>
                  All Events
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setEventMode('online')}>
                  Online Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setEventMode('offline')}>
                  Offline Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search MUNs..."
                className="w-[200px] pl-9 h-9 bg-muted border-0"
              />
            </div>

            <NotificationsCenter />

            <Link to="/auth">
              <Button variant="ghost" size="sm" className="text-sm font-medium">
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="text-sm font-medium">
                Get Started
              </Button>
            </Link>
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
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search MUNs..."
                    className="pl-9 bg-muted border-0"
                  />
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <button
                      className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                        isActive(link.path)
                          ? 'bg-secondary text-primary'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {link.label}
                    </button>
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full mb-2">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">
                      Get Started
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
