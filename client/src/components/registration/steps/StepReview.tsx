import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Edit2, FileText } from "lucide-react";
import { RegistrationData } from "../RegistrationWizard";
import committeesData from "@/data/committees.json";
import eventsData from "@/data/events.json";

interface StepReviewProps {
  data: RegistrationData;
  onSubmit: (data: any) => void;
  onBack: () => void;
  onEdit: (step: number) => void;
}

export function StepReview({ data, onSubmit, onBack, onEdit }: StepReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const committee = committeesData.find((c) => c.id === data.committeeId);
  const event = eventsData.find((e) => e.id === data.munId);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onSubmit(data);
  };

  const getPaymentMethodLabel = () => {
    switch (data.paymentMethod) {
      case "pay_now":
        return "Pay Now";
      case "pay_later":
        return "Pay Later (3-day hold)";
      case "invoice":
        return "Invoice / Bank Transfer";
      default:
        return "Not selected";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Review & Submit</h3>
        <p className="text-sm text-gray-600">
          Please review all information before submitting your registration
        </p>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-semibold">Profile Information</h4>
          <Button variant="ghost" size="sm" onClick={() => onEdit(0)}>
            <Edit2 className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500">Name:</span> {data.profile?.name}
          </div>
          <div>
            <span className="text-gray-500">Email:</span> {data.profile?.email}
          </div>
          <div>
            <span className="text-gray-500">Country:</span> {data.profile?.country}
          </div>
          <div>
            <span className="text-gray-500">Institution:</span> {data.profile?.institution}
          </div>
          <div>
            <span className="text-gray-500">Experience:</span> {data.profile?.experience}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-semibold">Committee Selection</h4>
          <Button variant="ghost" size="sm" onClick={() => onEdit(1)}>
            <Edit2 className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-500">Committee:</span>{" "}
            <span className="font-medium">
              {committee?.name} - {committee?.fullName}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Country Preferences:</span>{" "}
            {data.countryPreferences?.map((country, index) => (
              <Badge key={country} variant="outline" className="ml-1">
                {index + 1}. {country}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-semibold">Portfolio</h4>
          <Button variant="ghost" size="sm" onClick={() => onEdit(2)}>
            <Edit2 className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-gray-500 block mb-1">Position Summary:</span>
            <p className="text-sm bg-gray-50 p-3 rounded">
              {data.portfolioText}
            </p>
          </div>
          {data.portfolioFile && (
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-red-600" />
              <span>Position Paper: {data.portfolioFile.name}</span>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-semibold">Payment</h4>
          <Button variant="ghost" size="sm" onClick={() => onEdit(3)}>
            <Edit2 className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Method:</span>
            <span className="font-medium">{getPaymentMethodLabel()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Amount:</span>
            <span className="font-medium text-lg">
              ${data.amount?.toFixed(2)} {event?.currency}
            </span>
          </div>
          {data.promoCode && (
            <div className="flex justify-between text-green-600">
              <span>Promo Code:</span>
              <Badge variant="secondary">{data.promoCode}</Badge>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm">
          <strong>Note:</strong> By submitting this registration, you agree to abide by
          the conference code of conduct and all event policies. You will receive a
          confirmation email with further instructions.
        </p>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="min-w-[150px]"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </Button>
      </div>
    </div>
  );
}
