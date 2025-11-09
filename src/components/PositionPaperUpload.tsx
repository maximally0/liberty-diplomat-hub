import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle, Clock, MessageSquare, Star } from "lucide-react";
import { mockPositionPapers, PositionPaper } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PositionPaperUploadProps {
  isChair?: boolean;
}

export const PositionPaperUpload = ({ isChair = false }: PositionPaperUploadProps) => {
  const [papers, setPapers] = useState<PositionPaper[]>(mockPositionPapers);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedPaper, setSelectedPaper] = useState<PositionPaper | null>(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          const newPaper: PositionPaper = {
            id: `pp${papers.length + 1}`,
            delegateId: 'd1',
            delegateName: 'Alex Rivera',
            munId: '1',
            committee: 'UNSC',
            country: 'United Kingdom',
            fileName: file.name,
            status: 'Submitted',
            uploadDate: new Date().toISOString().split('T')[0],
          };
          
          setPapers([...papers, newPaper]);
          
          // Show confetti for first upload
          if (papers.length === 0) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
          }
          
          toast({
            title: "Upload Successful",
            description: "Your position paper has been submitted for review.",
          });
          
          return 0;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleSubmitFeedback = () => {
    if (selectedPaper) {
      const updatedPapers = papers.map(p =>
        p.id === selectedPaper.id
          ? { ...p, status: 'Feedback Received' as const, feedback, rating }
          : p
      );
      setPapers(updatedPapers);
      toast({
        title: "Feedback Submitted",
        description: `Feedback sent to ${selectedPaper.delegateName}`,
      });
      setSelectedPaper(null);
      setFeedback("");
      setRating(0);
    }
  };

  const getStatusIcon = (status: PositionPaper['status']) => {
    switch (status) {
      case 'Draft':
        return <Clock className="h-4 w-4" />;
      case 'Submitted':
        return <FileText className="h-4 w-4" />;
      case 'Under Review':
        return <MessageSquare className="h-4 w-4" />;
      case 'Feedback Received':
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: PositionPaper['status']) => {
    switch (status) {
      case 'Draft':
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
      case 'Submitted':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-300';
      case 'Under Review':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300';
      case 'Feedback Received':
        return 'bg-green-500/20 text-green-700 dark:text-green-300';
    }
  };

  return (
    <div className="space-y-6">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      {!isChair && (
        <Card className="p-6 border-2 border-dashed border-primary/30 bg-primary/5">
          <div className="text-center">
            <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Upload Position Paper</h3>
            <p className="text-sm text-muted-foreground mb-4">
              PDF only, maximum 10MB
            </p>
            {uploading ? (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            ) : (
              <label htmlFor="file-upload">
                <Button className="gap-2" asChild>
                  <span>
                    <Upload className="h-4 w-4" />
                    Choose File
                  </span>
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </Card>
      )}

      <Card className="p-6">
        <h3 className="font-semibold mb-4">
          {isChair ? 'Submissions to Review' : 'Your Submissions'}
        </h3>
        
        {papers.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {isChair 
                ? 'No submissions yet'
                : 'Upload your first position paper to get started'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="font-medium">{paper.fileName}</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>{paper.committee} • {paper.country}</div>
                      {isChair && <div>Delegate: {paper.delegateName}</div>}
                      <div>Uploaded: {new Date(paper.uploadDate).toLocaleDateString()}</div>
                    </div>
                    {paper.feedback && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">Chair Feedback</span>
                          {paper.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-accent text-accent" />
                              <span className="text-sm font-medium">{paper.rating}/5</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm">{paper.feedback}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={`gap-1 ${getStatusColor(paper.status)}`}>
                      {getStatusIcon(paper.status)}
                      {paper.status}
                    </Badge>
                    {isChair && paper.status === 'Submitted' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedPaper(paper)}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Give Feedback
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Provide Feedback</DialogTitle>
                            <DialogDescription>
                              Share your evaluation of {paper.delegateName}'s position paper
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Rating
                              </label>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="transition-transform hover:scale-110"
                                  >
                                    <Star
                                      className={`h-6 w-6 ${
                                        star <= rating
                                          ? 'fill-accent text-accent'
                                          : 'text-muted-foreground'
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Comments
                              </label>
                              <Textarea
                                placeholder="Provide constructive feedback..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                rows={4}
                              />
                            </div>
                            <Button 
                              onClick={handleSubmitFeedback}
                              disabled={!feedback || rating === 0}
                              className="w-full"
                            >
                              Submit Feedback
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
