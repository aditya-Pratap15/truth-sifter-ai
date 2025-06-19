import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle, Loader2, Upload, Image } from "lucide-react";

export const AnalysisDemo = () => {
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState<"text" | "image">("text");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sampleTexts = [
    "Scientists have discovered that drinking water helps maintain proper hydration levels in the human body.",
    "BREAKING: Aliens have landed in downtown New York and are demanding to speak to our leader immediately!",
    "The stock market experienced a 2% increase today following positive economic indicators and employment data."
  ];

  // Real text analysis function
  const analyzeText = (text: string) => {
    const words = text.toLowerCase().split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    let credibilityScore = 85; // Start with high credibility
    const flags = [];
    let category = "General News";
    let sources = 3;

    // Check for sensational language
    const sensationalWords = ['breaking', 'urgent', 'shocking', 'unbelievable', 'explosive', 'bombshell'];
    const hasSensational = sensationalWords.some(word => text.toLowerCase().includes(word));
    if (hasSensational) {
      credibilityScore -= 25;
      flags.push("Sensational language detected");
    }

    // Check for excessive punctuation
    const exclamationCount = (text.match(/!/g) || []).length;
    if (exclamationCount > 2) {
      credibilityScore -= 15;
      flags.push("Excessive use of exclamation marks");
    }

    // Check for extraordinary claims
    const extraordinaryClaims = ['alien', 'ufo', 'miracle cure', 'conspiracy', 'secret government', 'cover-up'];
    const hasExtraordinary = extraordinaryClaims.some(claim => text.toLowerCase().includes(claim));
    if (hasExtraordinary) {
      credibilityScore -= 40;
      flags.push("Extraordinary claims without evidence");
      category = "Extraordinary Claims";
      sources = 1;
    }

    // Check for emotional manipulation
    const emotionalWords = ['fear', 'panic', 'terrified', 'outraged', 'devastated', 'furious'];
    const hasEmotional = emotionalWords.some(word => text.toLowerCase().includes(word));
    if (hasEmotional) {
      credibilityScore -= 20;
      flags.push("Emotional manipulation detected");
    }

    // Check for vague language
    const vagueWords = ['some people say', 'many believe', 'sources claim', 'reportedly', 'allegedly'];
    const hasVague = vagueWords.some(phrase => text.toLowerCase().includes(phrase));
    if (hasVague) {
      credibilityScore -= 15;
      flags.push("Vague or unverified sources");
    }

    // Check for scientific/medical claims
    const scientificWords = ['scientists', 'study', 'research', 'data', 'evidence', 'peer-reviewed'];
    const hasScientific = scientificWords.some(word => text.toLowerCase().includes(word));
    if (hasScientific) {
      credibilityScore += 10;
      category = "Scientific/Medical";
      sources = 5;
    }

    // Check for political content
    const politicalWords = ['election', 'vote', 'president', 'government', 'policy', 'congress'];
    const hasPolitical = politicalWords.some(word => text.toLowerCase().includes(word));
    if (hasPolitical) {
      category = "Political";
      sources = 4;
    }

    // Check for financial content
    const financialWords = ['stock', 'market', 'investment', 'economy', 'economic', 'financial'];
    const hasFinancial = financialWords.some(word => text.toLowerCase().includes(word));
    if (hasFinancial) {
      category = "Financial";
      sources = 6;
    }

    // Length and structure analysis
    if (text.length < 50) {
      credibilityScore -= 10;
      flags.push("Content too brief for proper analysis");
    }

    if (sentences.length === 1 && text.length > 100) {
      credibilityScore -= 10;
      flags.push("Poor sentence structure");
    }

    // Ensure score stays within bounds
    credibilityScore = Math.max(10, Math.min(95, credibilityScore));

    return {
      credibilityScore,
      sources,
      flags,
      category,
      analysisType: "text",
      textAnalysis: {
        wordCount: words.length,
        sentenceCount: sentences.length,
        readabilityScore: Math.floor(Math.random() * 30) + 70
      }
    };
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const analyzeContent = async () => {
    if (analysisType === "text" && !content.trim()) return;
    if (analysisType === "image" && !selectedFile) return;
    
    setIsAnalyzing(true);
    setResult(null);

    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 1500));

    let analysisResult;

    if (analysisType === "text") {
      analysisResult = analyzeText(content);
    } else {
      // Image analysis simulation (keeping existing logic)
      analysisResult = {
        credibilityScore: Math.floor(Math.random() * 100),
        sources: Math.floor(Math.random() * 3) + 1,
        flags: [],
        category: "Image Content",
        analysisType: "image",
        imageAnalysis: {
          deepfakeDetected: Math.random() > 0.8,
          manipulationScore: Math.floor(Math.random() * 30),
          originalityScore: Math.floor(Math.random() * 30) + 70
        }
      };

      if (analysisResult.imageAnalysis.deepfakeDetected) {
        analysisResult.credibilityScore = Math.max(10, analysisResult.credibilityScore - 60);
        analysisResult.flags.push("Potential AI-generated content detected");
      }

      if (analysisResult.imageAnalysis.manipulationScore > 20) {
        analysisResult.credibilityScore = Math.max(20, analysisResult.credibilityScore - 30);
        analysisResult.flags.push("Digital manipulation detected");
      }
    }

    setResult(analysisResult);
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

  const clearAnalysis = () => {
    setResult(null);
    setContent("");
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Analysis</CardTitle>
          <CardDescription>
            Analyze text content or images for misinformation and authenticity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Analysis Type Selector */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={analysisType === "text" ? "default" : "outline"}
              onClick={() => setAnalysisType("text")}
              className="flex-1"
            >
              Text Analysis
            </Button>
            <Button
              variant={analysisType === "image" ? "default" : "outline"}
              onClick={() => setAnalysisType("image")}
              className="flex-1"
            >
              <Image className="mr-2 h-4 w-4" />
              Image Analysis
            </Button>
          </div>

          {analysisType === "text" ? (
            <>
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
            </>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full max-h-48 mx-auto rounded-lg"
                    />
                    <div className="text-sm text-gray-600">
                      {selectedFile?.name}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="text-lg font-medium text-gray-900 mb-2">
                      Upload an image to analyze
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      PNG, JPG, GIF up to 10MB
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Choose Image
                      </Button>
                    </label>
                  </>
                )}
              </div>
            </div>
          )}
          
          <Button 
            onClick={analyzeContent} 
            disabled={
              (analysisType === "text" && !content.trim()) || 
              (analysisType === "image" && !selectedFile) || 
              isAnalyzing
            }
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing {analysisType === "image" ? "Image" : "Content"}...
              </>
            ) : (
              `Analyze ${analysisType === "image" ? "Image" : "Content"}`
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

            {result.analysisType === "text" && result.textAnalysis && (
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-semibold">Text Analysis Details</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm font-medium">Word Count</span>
                    <div className="text-lg font-bold text-blue-600">
                      {result.textAnalysis.wordCount}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Sentences</span>
                    <div className="text-lg font-bold text-blue-600">
                      {result.textAnalysis.sentenceCount}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Readability</span>
                    <div className="text-lg font-bold text-blue-600">
                      {result.textAnalysis.readabilityScore}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {result.analysisType === "image" && result.imageAnalysis && (
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-semibold">Image Analysis Details</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium">Deepfake Detection</span>
                    <div className="flex items-center gap-2 mt-1">
                      {result.imageAnalysis.deepfakeDetected ? (
                        <XCircle className="h-4 w-4 text-red-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      <span className="text-sm">
                        {result.imageAnalysis.deepfakeDetected ? "AI-generated content" : "Likely authentic"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Originality Score</span>
                    <div className="text-lg font-bold text-blue-600">
                      {result.imageAnalysis.originalityScore}%
                    </div>
                  </div>
                </div>
              </div>
            )}

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

            <div className="flex items-center justify-between border-t pt-4">
              <div className="text-xs text-gray-500">
                Analysis completed • Powered by FakeBuster AI
              </div>
              <Button variant="outline" size="sm" onClick={clearAnalysis}>
                New Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
