import { useRegistration } from "@/contexts/RegistrationContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, FileText, XCircle, AlertCircle, Ban } from "lucide-react";
import eventsData from "@/data/events.json";
import committeesData from "@/data/committees.json";

export function DelegateDashboard() {
  const { getUserRegistrations, withdrawRegistration } = useRegistration();
  const registrations = getUserRegistrations();

  const getEventDetails = (munId: string) => {
    return eventsData.find((e: any) => e.id === munId);
  };

  const getCommitteeDetails = (committeeId: string) => {
    return committeesData.find((c: any) => c.id === committeeId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending_payment':
        return <Clock className="h-5 w-5 text-orange-600" />;
      case 'pending_invoice':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'waitlisted':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'withdrawn':
        return <Ban className="h-5 w-5 text-gray-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 border-green-200';
      case 'pending_payment':
        return 'bg-orange-50 border-orange-200';
      case 'pending_invoice':
        return 'bg-blue-50 border-blue-200';
      case 'waitlisted':
        return 'bg-yellow-50 border-yellow-200';
      case 'rejected':
        return 'bg-red-50 border-red-200';
      case 'withdrawn':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleWithdraw = (registrationId: string) => {
    if (confirm('Are you sure you want to withdraw from this event?')) {
      withdrawRegistration(registrationId);
    }
  };

  if (registrations.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="flex flex-col items-center">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Registrations Yet</h3>
          <p className="text-muted-foreground mb-6">
            Browse MUN events and register for conferences to get started
          </p>
          <Button onClick={() => window.location.href = '/browse'}>
            Browse Events
          </Button>
        </div>
      </Card>
    );
  }

  const groupedRegistrations = {
    confirmed: registrations.filter(r => r.status === 'confirmed'),
    pending_payment: registrations.filter(r => r.status === 'pending_payment'),
    pending_invoice: registrations.filter(r => r.status === 'pending_invoice'),
    waitlisted: registrations.filter(r => r.status === 'waitlisted'),
    rejected: registrations.filter(r => r.status === 'rejected'),
    withdrawn: registrations.filter(r => r.status === 'withdrawn'),
  };

  const renderRegistrationCard = (registration: any) => {
    const event = getEventDetails(registration.munId);
    const committee = getCommitteeDetails(registration.committeeId);

    if (!event) return null;

    return (
      <Card key={registration.id} className={`p-6 ${getStatusColor(registration.status)}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{event.name}</h3>
            <p className="text-sm text-muted-foreground">{event.host}</p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(registration.status)}
            <Badge variant="outline">
              {getStatusLabel(registration.status)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Committee</div>
            <div className="font-medium">{committee?.name || 'N/A'}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Assigned Country</div>
            <div className="font-medium">{registration.assignedCountry || 'Not assigned'}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Payment</div>
            <div className="font-medium">
              ${registration.amountPaid || 0} / ${registration.amountDue}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Date</div>
            <div className="font-medium">
              {new Date(event.startDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        {registration.status === 'pending_payment' && registration.holdExpiresAt && (
          <div className="mb-4 p-3 bg-orange-100 border border-orange-200 rounded-md">
            <p className="text-sm font-medium text-orange-900">
              Payment hold expires: {new Date(registration.holdExpiresAt).toLocaleString()}
            </p>
          </div>
        )}

        {registration.status === 'rejected' && registration.rejectionReason && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-md">
            <p className="text-sm font-medium text-red-900">
              Rejection reason: {registration.rejectionReason}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          {registration.status === 'confirmed' && (
            <>
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Upload Position Paper
              </Button>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </>
          )}
          {registration.status === 'pending_payment' && (
            <Button size="sm">
              Complete Payment
            </Button>
          )}
          {(registration.status === 'confirmed' || registration.status === 'pending_payment' || registration.status === 'pending_invoice') && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleWithdraw(registration.id)}
            >
              Withdraw
            </Button>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {groupedRegistrations.confirmed.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Confirmed Registrations
          </h2>
          <div className="grid gap-4">
            {groupedRegistrations.confirmed.map(renderRegistrationCard)}
          </div>
        </div>
      )}

      {groupedRegistrations.pending_payment.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Clock className="h-6 w-6 text-orange-600" />
            Pending Payment
          </h2>
          <div className="grid gap-4">
            {groupedRegistrations.pending_payment.map(renderRegistrationCard)}
          </div>
        </div>
      )}

      {groupedRegistrations.pending_invoice.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            Invoice Requested
          </h2>
          <div className="grid gap-4">
            {groupedRegistrations.pending_invoice.map(renderRegistrationCard)}
          </div>
        </div>
      )}

      {groupedRegistrations.waitlisted.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
            Waitlisted
          </h2>
          <div className="grid gap-4">
            {groupedRegistrations.waitlisted.map(renderRegistrationCard)}
          </div>
        </div>
      )}

      {groupedRegistrations.rejected.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <XCircle className="h-6 w-6 text-red-600" />
            Rejected
          </h2>
          <div className="grid gap-4">
            {groupedRegistrations.rejected.map(renderRegistrationCard)}
          </div>
        </div>
      )}

      {groupedRegistrations.withdrawn.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Ban className="h-6 w-6 text-gray-600" />
            Withdrawn
          </h2>
          <div className="grid gap-4">
            {groupedRegistrations.withdrawn.map(renderRegistrationCard)}
          </div>
        </div>
      )}
    </div>
  );
}
