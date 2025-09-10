import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Document } from "@/types/purchase-order";
import { FileText, Download, Eye, Upload } from "lucide-react";

interface DocumentsSectionProps {
  documents: Document[];
  onViewDocument?: (doc: Document) => void;
  onDownloadDocument?: (doc: Document) => void;
  onUploadDocument?: () => void;
}

const documentTypeLabels = {
  'commercial-invoice': 'Fattura Commerciale',
  'packing-list': 'Lista Imballaggio',
  'proforma-invoice': 'Fattura Proforma',
  'bill-of-lading': 'Polizza di Carico',
  'other': 'Altro Documento'
};

const documentTypeColors = {
  'commercial-invoice': 'bg-blue-100 text-blue-800',
  'packing-list': 'bg-green-100 text-green-800',
  'proforma-invoice': 'bg-purple-100 text-purple-800',
  'bill-of-lading': 'bg-orange-100 text-orange-800',
  'other': 'bg-gray-100 text-gray-800'
};

export function DocumentsSection({ 
  documents, 
  onViewDocument, 
  onDownloadDocument, 
  onUploadDocument 
}: DocumentsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Documenti</CardTitle>
          {onUploadDocument && (
            <Button onClick={onUploadDocument} size="sm" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Carica
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {documents.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nessun documento caricato</p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-card-foreground truncate">
                        {doc.name}
                      </p>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${documentTypeColors[doc.type]}`}
                      >
                        {documentTypeLabels[doc.type]}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>
                        Caricato il {doc.uploadedAt.toLocaleDateString('it-IT')}
                      </span>
                      {doc.size && (
                        <span>{doc.size}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 ml-3">
                  {onViewDocument && (
                    <Button
                      onClick={() => onViewDocument(doc)}
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {onDownloadDocument && (
                    <Button
                      onClick={() => onDownloadDocument(doc)}
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}