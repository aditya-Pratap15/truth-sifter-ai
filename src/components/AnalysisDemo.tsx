
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react";

export const AnalysisDemo = () => {
  const [content, setContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sampleTexts = [
    "Scientists have discovered that drinking water helps maintain proper hydration levels in the human body.",
    "BREAKING: Aliens have landed in downtown New York and are demanding to speak to our leader immediately!",
    "The stock market experienced a 2% increase today following positive economic indicators and employment data."
  ];

  const analyzeContent = async () => {
    if (!content.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate analysis result based on content
    const mockResult = {
      credibilityScore: Math.floor(Math.random() * 100),
      sources: Math.floor(Math.random() * 5) + 1,
      flags: [],
      category: "General News"
    };

    // Add flags based on content analysis
    if (content.toLowerCase().includes("breaking") || content.toLowerCase().includes("!")) {
      mockResult.credibilityScore = Math.max(20, mockResult.credibilityScore - 30);
      mockResult.flags.push("Sensational language detected");
    }
    
    if (content.toLowerCase().includes("alien") || content.toLowerCase().includes("ufo")) {
      mockResult.credibilityScore = Math.max(10, mockResult.credibilityScore - 50);
      mockResult.flags.push("Extraordinary claims without evidence");
    }

    setResult(mockResult);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 40) return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Analysis</CardTitle>
          <CardDescription>
            Paste any text content below to see our AI credibility analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste the text content you want to analyze..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px]"
          />
          
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Try these samples:</span>
            {sampleTexts.map((sample, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setContent(sample)}
                className="text-xs"
              >
                Sample {index + 1}
              </Button>
            ))}
          </div>
          
          <Button 
            onClick={analyzeContent} 
            disabled={!content.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Content...
              </>
            ) : (
              "Analyze Content"
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getScoreIcon(result.credibilityScore)}
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Credibility Score</span>
                <span className={`text-2xl font-bold ${getScoreColor(result.credibilityScore)}`}>
                  {result.credibilityScore}%
                </span>
              </div>
              <Progress value={result.credibilityScore} className="h-3" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Source Verification</h4>
                <p className="text-sm text-gray-600">
                  Cross-referenced with {result.sources} trusted sources
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Content Category</h4>
                <Badge variant="secondary">{result.category}</Badge>
              </div>
            </div>

            {result.flags.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-yellow-700">Detection Flags</h4>
                <div className="space-y-2">
                  {result.flags.map((flag: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 rounded-md">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-gray-500 border-t pt-4">
              Analysis completed in 2.3 seconds • Powered by FakeBuster AI
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
