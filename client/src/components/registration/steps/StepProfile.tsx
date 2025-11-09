import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ProfileCaptureModal } from "../ProfileCaptureModal";
import eventsData from "@/data/events.json";

interface StepProfileProps {
  profile: any;
  munId: string;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function StepProfile({ profile, munId, onNext, onBack }: StepProfileProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(profile);

  const event = eventsData.find((e) => e.id === munId);

  const handleEditProfile = (updatedProfile: any) => {
    setCurrentProfile(updatedProfile);
    setShowEditModal(false);
  };

  const handleNext = () => {
    onNext({ profile: currentProfile });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Confirm Your Profile</h3>
        <p className="text-sm text-gray-600">
          Review your profile information before proceeding with registration
        </p>
      </div>

      {event && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h4 className="font-semibold mb-2">Event Details</h4>
          <div className="text-sm space-y-1">
            <p><span className="font-medium">Event:</span> {event.title}</p>
            <p><span className="font-medium">Host:</span> {event.host}</p>
            <p><span className="font-medium">Date:</span> {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
            <p><span className="font-medium">Registration Fee:</span> ${event.fee} {event.currency}</p>
            <p><span className="font-medium">Registration Closes:</span> {new Date(event.registrationClose).toLocaleDateString()}</p>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-semibold">Your Profile</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEditModal(true)}
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">{currentProfile?.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{currentProfile?.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Country</p>
            <p className="font-medium">{currentProfile?.country}</p>
          </div>
          <div>
            <p className="text-gray-500">City</p>
            <p className="font-medium">{currentProfile?.city}</p>
          </div>
          <div>
            <p className="text-gray-500">Institution</p>
            <p className="font-medium">{currentProfile?.institution}</p>
          </div>
          <div>
            <p className="text-gray-500">Grade/Year</p>
            <p className="font-medium">{currentProfile?.grade}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500">Bio</p>
            <p className="font-medium">{currentProfile?.bio}</p>
          </div>
          <div>
            <p className="text-gray-500">Experience Level</p>
            <p className="font-medium">{currentProfile?.experience}</p>
          </div>
        </div>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button onClick={handleNext}>
          Next: Select Committee
        </Button>
      </div>

      {showEditModal && (
        <ProfileCaptureModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditProfile}
          initialData={currentProfile}
        />
      )}
    </div>
  );
}
