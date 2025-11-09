import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import countries from "@/data/countries.json";
import institutions from "@/data/institutions.json";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  country: z.string().min(1, "Please select a country"),
  city: z.string().min(1, "City is required"),
  institution: z.string().min(1, "Institution is required"),
  grade: z.string().min(1, "Grade/Year is required"),
  phone: z.string().optional(),
  bio: z.string().min(10, "Bio must be at least 10 characters").max(200, "Bio must be less than 200 characters"),
  experience: z.enum(["Beginner", "Intermediate", "Advanced"]),
  acceptCodeOfConduct: z.boolean().refine((val) => val === true, {
    message: "You must accept the code of conduct",
  }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileCaptureModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileFormData) => void;
  initialData?: Partial<ProfileFormData>;
}

export function ProfileCaptureModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: ProfileCaptureModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [institutionSearch, setInstitutionSearch] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData || {
      experience: "Beginner",
      acceptCodeOfConduct: false,
    },
  });

  const filteredInstitutions = institutions.filter((inst) =>
    inst.toLowerCase().includes(institutionSearch.toLowerCase())
  );

  const onFormSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    onSubmit(data);
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Your Profile</DialogTitle>
          <DialogDescription>
            Complete your profile to register for MUN events. All fields are required unless marked optional.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                onValueChange={(value) => setValue("country", value)}
                defaultValue={initialData?.country}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-sm text-red-500">{errors.country.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                {...register("city")}
                placeholder="Enter your city"
              />
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution/School</Label>
              <Select
                onValueChange={(value) => setValue("institution", value)}
                defaultValue={initialData?.institution}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select or search institution" />
                </SelectTrigger>
                <SelectContent>
                  <div className="px-2 pb-2">
                    <Input
                      placeholder="Search institutions..."
                      value={institutionSearch}
                      onChange={(e) => setInstitutionSearch(e.target.value)}
                      className="h-8"
                    />
                  </div>
                  {filteredInstitutions.map((inst) => (
                    <SelectItem key={inst} value={inst}>
                      {inst}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.institution && (
                <p className="text-sm text-red-500">{errors.institution.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Grade/Year</Label>
              <Input
                id="grade"
                {...register("grade")}
                placeholder="e.g., 11th Grade"
              />
              {errors.grade && (
                <p className="text-sm text-red-500">{errors.grade.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (optional)</Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="+1-555-0123"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Short Bio</Label>
            <Textarea
              id="bio"
              {...register("bio")}
              placeholder="Tell us about yourself in 1-2 lines..."
              className="h-20"
            />
            <p className="text-xs text-gray-500">10-200 characters</p>
            {errors.bio && (
              <p className="text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Experience Level</Label>
            <RadioGroup
              onValueChange={(value) => setValue("experience", value as "Beginner" | "Intermediate" | "Advanced")}
              defaultValue={initialData?.experience || "Beginner"}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Beginner" id="beginner" />
                <Label htmlFor="beginner" className="font-normal cursor-pointer">
                  Beginner - First time or limited MUN experience
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Intermediate" id="intermediate" />
                <Label htmlFor="intermediate" className="font-normal cursor-pointer">
                  Intermediate - Attended 2-5 MUN conferences
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Advanced" id="advanced" />
                <Label htmlFor="advanced" className="font-normal cursor-pointer">
                  Advanced - Extensive MUN experience or chair/director
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="accept"
              onCheckedChange={(checked) =>
                setValue("acceptCodeOfConduct", checked as boolean)
              }
              defaultChecked={initialData?.acceptCodeOfConduct}
            />
            <label htmlFor="accept" className="text-sm cursor-pointer">
              I accept the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                code of conduct
              </a>{" "}
              and agree to follow all conference rules
            </label>
          </div>
          {errors.acceptCodeOfConduct && (
            <p className="text-sm text-red-500">{errors.acceptCodeOfConduct.message}</p>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save & Continue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
