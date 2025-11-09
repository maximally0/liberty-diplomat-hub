import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Download, Calendar, Mail, Clock } from "lucide-react";
import { RegistrationData } from "./RegistrationWizard";
import eventsData from "@/data/events.json";
import committeesData from "@/data/committees.json";

interface SuccessScreenProps {
  registrationData: RegistrationData;
  onClose: () => void;
}

export function SuccessScreen({ registrationData, onClose }: SuccessScreenProps) {
  const event = eventsData.find((e) => e.id === registrationData.munId);
  const committee = committeesData.find((c) => c.id === registrationData.committeeId);
  
  const isPaid = registrationData.paymentMethod === "pay_now";
  const isPayLater = registrationData.paymentMethod === "pay_later";
  
  const holdExpiryDate = new Date();
  holdExpiryDate.setHours(holdExpiryDate.getHours() + 72);

  return (
    <div className="space-y-6 py-4">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {isPaid ? "Registration Confirmed!" : "Registration Submitted!"}
        </h2>
        <p className="text-gray-600">
          {isPaid
            ? "Your payment has been processed and your spot is confirmed."
            : isPayLater
            ? "Your seat has been reserved for 72 hours."
            : "Your registration is pending payment confirmation."}
        </p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Registration Summary</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Event:</span>
            <span className="font-medium">{event?.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Committee:</span>
            <span className="font-medium">{committee?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Status:</span>
            <Badge variant={isPaid ? "default" : "secondary"}>
              {isPaid ? "Confirmed (Paid)" : isPayLater ? "Pending Payment" : "Pending (Invoice)"}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Amount:</span>
            <span className="font-medium">${registrationData.amount?.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      {isPayLater && (
        <Card className="p-4 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-1">Payment Deadline</h4>
              <p className="text-sm text-amber-800 mb-2">
                Complete your payment by{" "}
                <strong>{holdExpiryDate.toLocaleString()}</strong> or your seat will be released.
              </p>
              <Button size="sm" className="mt-2">
                Pay Now
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold mb-3">Next Steps</h3>
        <ol className="space-y-2 text-sm list-decimal list-inside">
          <li>Check your email for confirmation and detailed instructions</li>
          {isPayLater && (
            <li>Complete payment within 72 hours using the link sent to your email</li>
          )}
          {!isPaid && registrationData.paymentMethod === "invoice" && (
            <li>An organizer will review your request and send an invoice</li>
          )}
          <li>
            {committee?.requiresPaper && !registrationData.portfolioFile
              ? "Upload your position paper before the deadline"
              : "Review your committee materials and prepare for the conference"}
          </li>
          <li>Add the event to your calendar and join the delegate community</li>
        </ol>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Button variant="outline" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Receipt
        </Button>
        <Button variant="outline" className="w-full">
          <Calendar className="mr-2 h-4 w-4" />
          Add to Calendar
        </Button>
        <Button variant="outline" className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          Contact Support
        </Button>
      </div>

      <div className="flex justify-center pt-4">
        <Button onClick={onClose} size="lg">
          Go to Dashboard
        </Button>
      </div>

      <p className="text-xs text-center text-gray-500">
        A confirmation email has been sent to {registrationData.profile?.email}
      </p>
    </div>
  );
}
