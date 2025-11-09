import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Users, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import committeesData from "@/data/committees.json";
import countriesData from "@/data/countries.json";

interface StepCommitteeProps {
  munId: string;
  selectedCommittee?: string;
  selectedCountries?: string[];
  onNext: (data: any) => void;
  onBack: () => void;
}

export function StepCommittee({
  munId,
  selectedCommittee,
  selectedCountries = [],
  onNext,
  onBack,
}: StepCommitteeProps) {
  const [committeeId, setCommitteeId] = useState(selectedCommittee);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [countryPreferences, setCountryPreferences] = useState<string[]>(selectedCountries);

  const committees = committeesData.filter((c) => c.munId === munId);

  const handleSelectCommittee = (id: string) => {
    setCommitteeId(id);
    setShowCountryModal(true);
  };

  const handleConfirmCountries = () => {
    if (countryPreferences.length === 3) {
      setShowCountryModal(false);
    }
  };

  const handleNext = () => {
    if (committeeId && countryPreferences.length === 3) {
      onNext({
        committeeId,
        countryPreferences,
      });
    }
  };

  const selectedCommitteeData = committees.find((c) => c.id === committeeId);
  const remainingSeats = selectedCommitteeData
    ? selectedCommitteeData.capacity - selectedCommitteeData.filled
    : 0;
  const isFull = remainingSeats === 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Select Committee & Country</h3>
        <p className="text-sm text-gray-600">
          Choose your preferred committee and rank your top 3 country preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {committees.map((committee) => {
          const remaining = committee.capacity - committee.filled;
          const fullCommittee = remaining === 0;
          const isSelected = committeeId === committee.id;

          return (
            <Card
              key={committee.id}
              className={`p-4 cursor-pointer transition-all ${
                isSelected
                  ? "border-blue-600 bg-blue-50"
                  : fullCommittee
                  ? "border-gray-200 bg-gray-50 opacity-60"
                  : "hover:border-blue-300"
              }`}
              onClick={() => !fullCommittee && handleSelectCommittee(committee.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-lg">{committee.name}</h4>
                    <Badge variant={committee.difficulty === "Advanced" ? "destructive" : committee.difficulty === "Intermediate" ? "default" : "secondary"}>
                      {committee.difficulty}
                    </Badge>
                    {committee.requiresPaper && (
                      <Badge variant="outline">Paper Required</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{committee.fullName}</p>
                  <p className="text-sm mb-3">{committee.agenda}</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex -space-x-2">
                      {committee.chairs.map((chair, idx) => (
                        <Avatar key={idx} className="h-8 w-8 border-2 border-white">
                          <AvatarImage src={chair.avatar} />
                          <AvatarFallback>{chair.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      Chaired by {committee.chairs.map(c => c.name).join(", ")}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm mb-1">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">
                      {committee.filled}/{committee.capacity}
                    </span>
                  </div>
                  <div className={`text-xs ${fullCommittee ? "text-red-600" : "text-green-600"}`}>
                    {fullCommittee ? "Full - Waitlist" : `${remaining} seats left`}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {committeeId && countryPreferences.length === 3 && (
        <Card className="p-4 bg-green-50 border-green-200">
          <h4 className="font-semibold mb-2">Selection Summary</h4>
          <p className="text-sm">
            <span className="font-medium">Committee:</span> {selectedCommitteeData?.name}
          </p>
          <p className="text-sm">
            <span className="font-medium">Country Preferences:</span>{" "}
            {countryPreferences.join(" → ")}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => setShowCountryModal(true)}
          >
            Change Countries
          </Button>
        </Card>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!committeeId || countryPreferences.length !== 3}
        >
          Next: Portfolio
        </Button>
      </div>

      <Dialog open={showCountryModal} onOpenChange={setShowCountryModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Rank Your Country Preferences</DialogTitle>
            <DialogDescription>
              We'll try to allocate your top choice — rank 1–3.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {[0, 1, 2].map((index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`country-${index}`}>
                  Preference {index + 1}
                </Label>
                <Select
                  value={countryPreferences[index]}
                  onValueChange={(value) => {
                    const newPrefs = [...countryPreferences];
                    newPrefs[index] = value;
                    setCountryPreferences(newPrefs);
                  }}
                >
                  <SelectTrigger id={`country-${index}`}>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countriesData.map((country) => (
                      <SelectItem
                        key={country}
                        value={country}
                        disabled={countryPreferences.includes(country) && countryPreferences[index] !== country}
                      >
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

            {countryPreferences.length > 0 && countryPreferences.length < 3 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please select all 3 country preferences
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleConfirmCountries}
              className="w-full"
              disabled={countryPreferences.length !== 3}
            >
              Confirm Selection
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
