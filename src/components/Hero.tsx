
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, CheckCircle } from "lucide-react";

export const Hero = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                🚀 AI-Powered Fact Checking
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Stop Fake News
                <span className="text-blue-600"> Before It Spreads</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                FakeBuster AI uses advanced artificial intelligence to detect misinformation in real-time, 
                cross-reference with trusted sources, and protect you from fake news across all social media platforms.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg">
                <Shield className="mr-2 h-5 w-5" />
                Install Extension
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                <Zap className="mr-2 h-5 w-5" />
                Try Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">Works on all major platforms</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">Real-time analysis</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Live Analysis</h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    ✓ Verified
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      "New study shows that drinking water helps with hydration"
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Credibility Score</span>
                      <span className="text-lg font-bold text-green-600">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    ✓ Cross-referenced with 3 trusted sources<br/>
                    ✓ No misleading language detected<br/>
                    ✓ Factually accurate
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -z-10 top-4 left-4 w-full h-full bg-blue-100 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
