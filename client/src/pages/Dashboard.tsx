import { Navigation } from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DelegateDashboard } from "@/components/dashboard/DelegateDashboard";
import { OrganizerConsole } from "@/components/dashboard/OrganizerConsole";
import { UserCircle, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your registrations and conference activities</p>
        </div>

        <Tabs defaultValue="delegate" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="delegate" className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              My Registrations
            </TabsTrigger>
            <TabsTrigger value="organizer" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Organizer Console
            </TabsTrigger>
          </TabsList>

          <TabsContent value="delegate" className="mt-6">
            <DelegateDashboard />
          </TabsContent>

          <TabsContent value="organizer" className="mt-6">
            <OrganizerConsole />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
