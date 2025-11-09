import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { StepProfile } from "./steps/StepProfile";
import { StepCommittee } from "./steps/StepCommittee";
import { StepPortfolio } from "./steps/StepPortfolio";
import { StepPayment } from "./steps/StepPayment";
import { StepReview } from "./steps/StepReview";
import { SuccessScreen } from "./SuccessScreen";

export interface RegistrationData {
  userId: string;
  munId: string;
  profile?: any;
  committeeId?: string;
  countryPreferences?: string[];
  portfolioText?: string;
  portfolioFile?: File;
  paymentMethod?: "pay_now" | "pay_later" | "invoice";
  promoCode?: string;
  amount?: number;
}

interface RegistrationWizardProps {
  open: boolean;
  onClose: () => void;
  munId: string;
  userId: string;
  userProfile: any;
  onRegistrationComplete: (registration: any) => void;
}

const STEPS = ["Profile", "Committee", "Portfolio", "Payment", "Review"];

export function RegistrationWizard({
  open,
  onClose,
  munId,
  userId,
  userProfile,
  onRegistrationComplete,
}: RegistrationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    userId,
    munId,
    profile: userProfile,
  });
  const [isComplete, setIsComplete] = useState(false);

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleNext = (stepData: any) => {
    setRegistrationData({ ...registrationData, ...stepData });
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async (finalData: any) => {
    const completeRegistration = { ...registrationData, ...finalData };
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const holdExpiresAt = completeRegistration.paymentMethod === 'pay_later'
      ? new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()
      : null;
    
    const status = completeRegistration.paymentMethod === 'pay_now'
      ? 'confirmed'
      : completeRegistration.paymentMethod === 'pay_later'
      ? 'pending_payment'
      : 'pending_invoice';
    
    const finalRegistration = {
      id: `r-${Date.now()}`,
      userId: completeRegistration.userId,
      munId: completeRegistration.munId,
      committeeId: completeRegistration.committeeId,
      countryPreference: completeRegistration.countryPreferences,
      assignedCountry: null,
      portfolioText: completeRegistration.portfolioText,
      positionPaperUrl: completeRegistration.portfolioFile ? `mock://uploads/${completeRegistration.portfolioFile.name}` : null,
      status,
      paymentMethod: completeRegistration.paymentMethod,
      holdExpiresAt,
      amountDue: completeRegistration.amount,
      amountPaid: completeRegistration.paymentMethod === 'pay_now' ? completeRegistration.amount : 0,
      promoCode: completeRegistration.promoCode || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    onRegistrationComplete(finalRegistration);
    setIsComplete(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepProfile
            profile={registrationData.profile}
            munId={munId}
            onNext={handleNext}
            onBack={onClose}
          />
        );
      case 1:
        return (
          <StepCommittee
            munId={munId}
            selectedCommittee={registrationData.committeeId}
            selectedCountries={registrationData.countryPreferences}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <StepPortfolio
            committeeId={registrationData.committeeId!}
            portfolioText={registrationData.portfolioText}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <StepPayment
            munId={munId}
            amount={registrationData.amount}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <StepReview
            data={registrationData}
            onSubmit={handleComplete}
            onBack={handleBack}
            onEdit={(step) => setCurrentStep(step)}
          />
        );
      default:
        return null;
    }
  };

  if (isComplete) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <SuccessScreen
            registrationData={registrationData}
            onClose={onClose}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">Event Registration</h2>
              <span className="text-sm text-gray-500">
                Step {currentStep + 1} of {STEPS.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2">
              {STEPS.map((step, index) => (
                <div
                  key={step}
                  className={`text-xs ${
                    index <= currentStep
                      ? "text-blue-600 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
