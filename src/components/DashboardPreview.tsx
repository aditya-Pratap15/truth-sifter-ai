
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, AlertTriangle, CheckCircle, Activity } from "lucide-react";

export const DashboardPreview = () => {
  const trendingTopics = [
    { topic: "Climate Change", flagged: 23, verified: 87, trend: "up" },
    { topic: "Election News", flagged: 45, verified: 12, trend: "up" },
    { topic: "Health Information", flagged: 12, verified: 156, trend: "down" },
    { topic: "Technology", flagged: 8, verified: 203, trend: "stable" }
  ];

  const recentAnalyses = [
    { content: "Scientists announce breakthrough in renewable energy...", score: 89, time: "2 min ago" },
    { content: "SHOCKING: Celebrity reveals secret that doctors hate...", score: 15, time: "5 min ago" },
    { content: "Local weather forecast shows rain expected tomorrow...", score: 95, time: "8 min ago" },
    { content: "Breaking: Unverified claims about market crash...", score: 32, time: "12 min ago" }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "down": return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Trending Misinformation Topics
          </CardTitle>
          <CardDescription>
            Most flagged topics in the last 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{topic.topic}</span>
                    {getTrendIcon(topic.trend)}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="destructive" className="text-xs">
                      {topic.flagged} flagged
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {topic.verified} verified
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={(topic.flagged / (topic.flagged + topic.verified)) * 100} 
                  className="h-2" 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Recent Analyses
          </CardTitle>
          <CardDescription>
            Latest content analyzed by FakeBuster AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAnalyses.map((analysis, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm text-gray-700 flex-1 pr-4">
                    {analysis.content}
                  </p>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-lg font-bold ${getScoreColor(analysis.score)}`}>
                      {analysis.score}%
                    </span>
                    <span className="text-xs text-gray-500">{analysis.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {analysis.score >= 70 ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-xs text-gray-600">
                    {analysis.score >= 70 ? "Verified content" : "Potentially misleading"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
