import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Loader2, Clock, CreditCard, FileText, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import eventsData from "@/data/events.json";
import promoCodesData from "@/data/promoCodes.json";

interface StepPaymentProps {
  munId: string;
  amount?: number;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function StepPayment({ munId, amount: initialAmount, onNext, onBack }: StepPaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<"pay_now" | "pay_later" | "invoice">("pay_now");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [promoError, setPromoError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const event = eventsData.find((e) => e.id === munId);
  const baseFee = event?.fee || 0;

  const discount = appliedPromo
    ? appliedPromo.type === "percentage"
      ? (baseFee * appliedPromo.discount) / 100
      : appliedPromo.discount
    : 0;
  const total = baseFee - discount;

  const handleApplyPromo = () => {
    const code = promoCodesData.find(
      (p) => p.code.toUpperCase() === promoCode.toUpperCase() && p.active
    );
    
    if (code) {
      setAppliedPromo(code);
      setPromoError("");
    } else {
      setPromoError("Invalid or expired promo code");
      setAppliedPromo(null);
    }
  };

  const handleNext = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    onNext({
      paymentMethod,
      promoCode: appliedPromo?.code,
      amount: total,
    });
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Payment Options</h3>
        <p className="text-sm text-gray-600">
          Choose how you'd like to pay for your registration
        </p>
      </div>

      <Card className="p-6">
        <h4 className="font-semibold mb-4">Price Breakdown</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Registration Fee</span>
            <span>${baseFee.toFixed(2)}</span>
          </div>
          {appliedPromo && (
            <div className="flex justify-between text-green-600">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                Discount ({appliedPromo.code})
              </span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)} {event?.currency}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="promo">Promo Code</Label>
          <div className="flex gap-2">
            <Input
              id="promo"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              placeholder="Enter code"
              disabled={!!appliedPromo}
            />
            <Button
              variant="outline"
              onClick={handleApplyPromo}
              disabled={!promoCode || !!appliedPromo}
            >
              Apply
            </Button>
            {appliedPromo && (
              <Button
                variant="ghost"
                onClick={() => {
                  setAppliedPromo(null);
                  setPromoCode("");
                }}
              >
                Remove
              </Button>
            )}
          </div>
          {promoError && (
            <p className="text-sm text-red-600">{promoError}</p>
          )}
          {appliedPromo && (
            <p className="text-sm text-green-600">✓ {appliedPromo.description}</p>
          )}
        </div>
      </Card>

      <div className="space-y-4">
        <Label>Select Payment Method</Label>
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value: any) => setPaymentMethod(value)}
        >
          <Card
            className={`p-4 cursor-pointer ${
              paymentMethod === "pay_now" ? "border-blue-600 bg-blue-50" : ""
            }`}
            onClick={() => setPaymentMethod("pay_now")}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="pay_now" id="pay_now" className="mt-1" />
              <div className="flex-1">
                <label
                  htmlFor="pay_now"
                  className="font-medium cursor-pointer flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Pay Now
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Complete payment immediately and receive instant confirmation
                </p>
              </div>
            </div>
          </Card>

          <Card
            className={`p-4 cursor-pointer ${
              paymentMethod === "pay_later" ? "border-blue-600 bg-blue-50" : ""
            }`}
            onClick={() => setPaymentMethod("pay_later")}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="pay_later" id="pay_later" className="mt-1" />
              <div className="flex-1">
                <label
                  htmlFor="pay_later"
                  className="font-medium cursor-pointer flex items-center gap-2"
                >
                  <Clock className="h-4 w-4" />
                  Pay Later (3-day hold)
                  <Badge variant="secondary">Popular</Badge>
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Reserve your seat now — checkout within 72 hours or your seat will be released
                </p>
              </div>
            </div>
          </Card>

          <Card
            className={`p-4 cursor-pointer ${
              paymentMethod === "invoice" ? "border-blue-600 bg-blue-50" : ""
            }`}
            onClick={() => setPaymentMethod("invoice")}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="invoice" id="invoice" className="mt-1" />
              <div className="flex-1">
                <label
                  htmlFor="invoice"
                  className="font-medium cursor-pointer flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Invoice / Bank Transfer
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Request an invoice for institutional payment or bank transfer
                </p>
              </div>
            </div>
          </Card>
        </RadioGroup>
      </div>

      {paymentMethod === "pay_later" && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            Your seat will be held for 72 hours. You'll receive a payment link via email with reminders at 48 and 8 hours before expiry.
          </AlertDescription>
        </Alert>
      )}

      {paymentMethod === "invoice" && (
        <Alert>
          <FileText className="h-4 w-4" />
          <AlertDescription>
            An organizer will review your request and send an invoice. Your registration will be pending until payment is confirmed.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={isProcessing}>
          {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Next: Review
        </Button>
      </div>
    </div>
  );
}
