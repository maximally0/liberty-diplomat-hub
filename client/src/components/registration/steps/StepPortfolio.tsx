import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, X, FileText, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import committeesData from "@/data/committees.json";

interface StepPortfolioProps {
  committeeId: string;
  portfolioText?: string;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function StepPortfolio({
  committeeId,
  portfolioText: initialText = "",
  onNext,
  onBack,
}: StepPortfolioProps) {
  const [portfolioText, setPortfolioText] = useState(initialText);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const committee = committeesData.find((c) => c.id === committeeId);
  const charCount = portfolioText.length;
  const minChars = 300;
  const maxChars = 500;
  const isValid = charCount >= minChars && charCount <= maxChars;

  const handleFileChange = async (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    setIsUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFile(selectedFile);
    setIsUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleNext = () => {
    if (isValid) {
      onNext({
        portfolioText,
        portfolioFile: file,
      });
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem(
      `draft_${committeeId}`,
      JSON.stringify({ portfolioText, fileName: file?.name })
    );
    alert("Draft saved! You can continue later.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Committee Portfolio</h3>
        <p className="text-sm text-gray-600">
          Submit your committee pitch and optional position paper
        </p>
      </div>

      {committee && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold">{committee.name}</h4>
            {committee.requiresPaper && (
              <Badge variant="destructive">Position Paper Required</Badge>
            )}
          </div>
          <p className="text-sm text-gray-600">{committee.agenda}</p>
        </Card>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="portfolio">
            Committee Pitch / Position Summary *
          </Label>
          <p className="text-xs text-gray-500">
            Summarize your approach to this committee in 3–4 sentences (300–500 characters)
          </p>
          <Textarea
            id="portfolio"
            value={portfolioText}
            onChange={(e) => setPortfolioText(e.target.value)}
            placeholder="I will push for equitable climate finance by..."
            className="min-h-[150px]"
          />
          <div className="flex justify-between text-xs">
            <span
              className={
                charCount < minChars
                  ? "text-red-600"
                  : charCount > maxChars
                  ? "text-red-600"
                  : "text-green-600"
              }
            >
              {charCount} / {minChars}–{maxChars} characters
            </span>
            {!isValid && charCount > 0 && (
              <span className="text-red-600">
                {charCount < minChars
                  ? `${minChars - charCount} more needed`
                  : `${charCount - maxChars} over limit`}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>
            Position Paper {committee?.requiresPaper && "*"}
            {!committee?.requiresPaper && " (Optional)"}
          </Label>
          <p className="text-xs text-gray-500">
            Max 10MB PDF. Prefer 1–2 pages.
          </p>

          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop your position paper here, or
              </p>
              <label htmlFor="file-upload">
                <Button variant="outline" size="sm" asChild>
                  <span>
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Browse Files"
                    )}
                  </span>
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                className="hidden"
              />
            </div>
          ) : (
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-red-600" />
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}
        </div>

        {committee?.requiresPaper && !file && (
          <Alert variant="destructive">
            <AlertDescription>
              This committee requires a position paper. Please upload a PDF document.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <div>
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button variant="ghost" onClick={handleSaveDraft} className="ml-2">
            Save Draft
          </Button>
        </div>
        <Button
          onClick={handleNext}
          disabled={!isValid || (committee?.requiresPaper && !file)}
        >
          Next: Payment
        </Button>
      </div>
    </div>
  );
}
