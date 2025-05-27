
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Eye, TrendingUp, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Hero } from "@/components/Hero";
import { AnalysisDemo } from "@/components/AnalysisDemo";
import { FeatureCard } from "@/components/FeatureCard";
import { DashboardPreview } from "@/components/DashboardPreview";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "AI-Powered Analysis",
      description: "Advanced NLP models analyze text for misinformation patterns and credibility signals."
    },
    {
      icon: Eye,
      title: "Deepfake Detection",
      description: "Detects AI-generated images and videos using cutting-edge detection algorithms."
    },
    {
      icon: Zap,
      title: "Real-Time Scanning",
      description: "Instant analysis of social media posts as you browse Twitter, Facebook, and Reddit."
    },
    {
      icon: TrendingUp,
      title: "Trending Analysis",
      description: "Track misinformation trends and see what topics are being flagged most frequently."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">FakeBuster AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Demo</Button>
            <Button variant="ghost">Dashboard</Button>
            <Button>Get Extension</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful AI Detection Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive misinformation detection using advanced AI, fact-checking APIs, and real-time analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Try the AI Analysis
            </h2>
            <p className="text-xl text-gray-600">
              Paste any text or social media content to see our AI credibility analysis in action
            </p>
          </div>
          
          <AnalysisDemo />
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Misinformation Trends Dashboard
            </h2>
            <p className="text-xl text-gray-600">
              Track trending misinformation topics and see real-time analysis results
            </p>
          </div>
          
          <DashboardPreview />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Fight Misinformation?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Install the FakeBuster AI browser extension and start protecting yourself from fake news today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg">
              Install Chrome Extension
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 text-lg">
              View Web Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-xl font-bold">FakeBuster AI</span>
              </div>
              <p className="text-gray-400">
                Fighting misinformation with advanced AI technology and real-time fact-checking.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Browser Extension</li>
                <li>Web Dashboard</li>
                <li>API Access</li>
                <li>Enterprise</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Support</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FakeBuster AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
