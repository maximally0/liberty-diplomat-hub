import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Download, Eye, Filter } from "lucide-react";
import { mockCertificates, Certificate } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export const CertificateVault = () => {
  const [certificates] = useState<Certificate[]>(mockCertificates);
  const [filterAward, setFilterAward] = useState<string>("all");

  const filteredCertificates = certificates.filter(cert =>
    filterAward === "all" ? true : cert.award === filterAward
  );

  const getAwardColor = (award: string) => {
    if (award.includes('Best')) return 'bg-accent/20 text-accent border-accent/50';
    if (award.includes('Outstanding')) return 'bg-primary/20 text-primary border-primary/50';
    return 'bg-secondary/20 text-secondary-foreground border-secondary/50';
  };

  const getTemplateStyle = (template: Certificate['template']) => {
    switch (template) {
      case 'gold-leaf':
        return 'bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-950 dark:to-yellow-900 border-accent';
      case 'modern':
        return 'bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-950 dark:to-cyan-900 border-primary';
      case 'classic':
        return 'bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900 dark:to-slate-800 border-border';
    }
  };

  const handleDownload = (cert: Certificate) => {
    toast({
      title: "Certificate Downloaded",
      description: `${cert.munName} - ${cert.award}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-2xl font-bold">Certificate Vault</h2>
          <p className="text-sm text-muted-foreground">
            {certificates.length} certificates earned
          </p>
        </div>
        <Select value={filterAward} onValueChange={setFilterAward}>
          <SelectTrigger className="w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by award" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Awards</SelectItem>
            <SelectItem value="Best Delegate">Best Delegate</SelectItem>
            <SelectItem value="Outstanding Delegate">Outstanding Delegate</SelectItem>
            <SelectItem value="High Commendation">High Commendation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Certificate Grid */}
      {filteredCertificates.length === 0 ? (
        <Card className="p-12 text-center">
          <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            No certificates yet. Keep debating, recognition awaits!
          </p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCertificates.map((cert) => (
            <Card key={cert.id} className="overflow-hidden">
              <div className={`p-8 border-2 ${getTemplateStyle(cert.template)}`}>
                <div className="text-center space-y-4">
                  <div className="text-5xl">🏆</div>
                  <div>
                    <Badge className={`mb-2 ${getAwardColor(cert.award)}`}>
                      {cert.award}
                    </Badge>
                    <h3 className="font-display text-xl font-bold">
                      {cert.delegateName}
                    </h3>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="font-medium">{cert.munName}</div>
                    <div className="text-muted-foreground">
                      {cert.committee} • {new Date(cert.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-card flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Certificate Preview</DialogTitle>
                    </DialogHeader>
                    <div className={`p-12 border-4 rounded-lg ${getTemplateStyle(cert.template)}`}>
                      <div className="text-center space-y-6">
                        <div className="text-7xl">🏆</div>
                        <div>
                          <h2 className="font-display text-3xl font-bold mb-2">
                            Certificate of Achievement
                          </h2>
                          <p className="text-lg">This certifies that</p>
                        </div>
                        <div>
                          <h3 className="font-display text-4xl font-bold mb-2">
                            {cert.delegateName}
                          </h3>
                          <p className="text-lg">has been awarded</p>
                        </div>
                        <div>
                          <Badge className={`text-lg py-2 px-4 ${getAwardColor(cert.award)}`}>
                            {cert.award}
                          </Badge>
                        </div>
                        <div className="text-lg space-y-2">
                          <p>in the <strong>{cert.committee}</strong></p>
                          <p>at <strong>{cert.munName}</strong></p>
                          <p className="text-muted-foreground">
                            {new Date(cert.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => handleDownload(cert)}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
