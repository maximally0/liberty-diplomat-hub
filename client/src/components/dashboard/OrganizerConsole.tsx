import { useState } from "react";
import { useRegistration } from "@/hooks/useRegistration";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MoreVertical, CheckCircle, XCircle, Send } from "lucide-react";
import eventsData from "@/data/events.json";
import committeesData from "@/data/committees.json";
import usersData from "@/data/users.json";

export function OrganizerConsole() {
  const { getAllRegistrations, updateRegistrationStatus, assignCountry } = useRegistration();
  const { toast } = useToast();
  const [filter, setFilter] = useState<string>('all');
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

  const allRegistrations = getAllRegistrations();

  const getEventDetails = (munId: string) => {
    return eventsData.find((e: any) => e.id === munId);
  };

  const getCommitteeDetails = (committeeId: string) => {
    return committeesData.find((c: any) => c.id === committeeId);
  };

  const getUserDetails = (userId: string) => {
    return usersData.find((u: any) => u.id === userId);
  };

  const filteredRegistrations = allRegistrations.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'pending') return r.status === 'pending_payment' || r.status === 'pending_invoice';
    if (filter === 'waitlist') return r.status === 'waitlisted';
    return r.status === filter;
  });

  const handleApprove = (registration: any) => {
    updateRegistrationStatus(registration.id, 'confirmed');
    toast({
      title: 'Registration Approved',
      description: 'The delegate has been confirmed for the conference.',
    });
  };

  const handleReject = () => {
    if (!selectedRegistration) return;
    
    updateRegistrationStatus(selectedRegistration.id, 'rejected', rejectionReason);
    toast({
      title: 'Registration Rejected',
      description: 'The delegate has been notified of the rejection.',
      variant: 'destructive',
    });
    
    setRejectDialogOpen(false);
    setRejectionReason('');
    setSelectedRegistration(null);
  };

  const handleAssignCountry = () => {
    if (!selectedRegistration || !selectedCountry) return;
    
    assignCountry(selectedRegistration.id, selectedCountry);
    toast({
      title: 'Country Assigned',
      description: `${selectedCountry} has been assigned to the delegate.`,
    });
    
    setAssignDialogOpen(false);
    setSelectedCountry('');
    setSelectedRegistration(null);
  };

  const handleSendReminder = (registration: any) => {
    toast({
      title: 'Reminder Sent',
      description: 'Payment reminder email has been sent to the delegate.',
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      confirmed: { variant: 'default', label: 'Confirmed' },
      pending_payment: { variant: 'secondary', label: 'Pending Payment' },
      pending_invoice: { variant: 'outline', label: 'Invoice Requested' },
      waitlisted: { variant: 'secondary', label: 'Waitlisted' },
      rejected: { variant: 'destructive', label: 'Rejected' },
      withdrawn: { variant: 'outline', label: 'Withdrawn' },
    };

    const config = variants[status] || { variant: 'outline', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (allRegistrations.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="flex flex-col items-center">
          <MoreVertical className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Registrations Yet</h3>
          <p className="text-muted-foreground">
            Registrations for your events will appear here
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All ({allRegistrations.length})
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('pending')}
        >
          Pending Review ({allRegistrations.filter(r => r.status === 'pending_payment' || r.status === 'pending_invoice').length})
        </Button>
        <Button
          variant={filter === 'confirmed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('confirmed')}
        >
          Confirmed ({allRegistrations.filter(r => r.status === 'confirmed').length})
        </Button>
        <Button
          variant={filter === 'waitlist' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('waitlist')}
        >
          Waitlist ({allRegistrations.filter(r => r.status === 'waitlisted').length})
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Delegate</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Committee</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRegistrations.map((registration) => {
              const event = getEventDetails(registration.munId);
              const committee = getCommitteeDetails(registration.committeeId);
              const user = getUserDetails(registration.userId);

              return (
                <TableRow key={registration.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user?.name || 'Unknown'}</div>
                      <div className="text-sm text-muted-foreground">{user?.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{event?.name}</div>
                  </TableCell>
                  <TableCell>{committee?.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      ${registration.amountPaid || 0} / ${registration.amountDue}
                    </div>
                  </TableCell>
                  <TableCell>{registration.assignedCountry || '-'}</TableCell>
                  <TableCell>{getStatusBadge(registration.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {(registration.status === 'pending_payment' || registration.status === 'pending_invoice') && (
                          <>
                            <DropdownMenuItem onClick={() => handleApprove(registration)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedRegistration(registration);
                                setRejectDialogOpen(true);
                              }}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        {registration.status === 'pending_payment' && (
                          <DropdownMenuItem onClick={() => handleSendReminder(registration)}>
                            <Send className="h-4 w-4 mr-2" />
                            Send Payment Reminder
                          </DropdownMenuItem>
                        )}
                        {registration.status === 'confirmed' && !registration.assignedCountry && (
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedRegistration(registration);
                              setAssignDialogOpen(true);
                            }}
                          >
                            Assign Country
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Registration</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this registration. The delegate will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectionReason}>
              Reject Registration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Country</DialogTitle>
            <DialogDescription>
              Assign a country to this delegate for their committee.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                placeholder="Enter country name..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignCountry} disabled={!selectedCountry}>
              Assign Country
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
