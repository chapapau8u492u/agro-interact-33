import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Mic, 
  MicOff,
  Play,
  Pause,
  Volume2,
  Languages,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-farm.jpg";

export default function HeroSection() {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const navigate = useNavigate();
  const { toast } = useToast();

  const languages = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi"];

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Voice Assistant Activated",
        description: "Listening for your commands...",
      });
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        toast({
          title: "Voice Command Received",
          description: "Processing your request...",
        });
      }, 3000);
    } else {
      toast({
        title: "Voice Assistant Stopped",
        description: "Voice recognition disabled.",
      });
    }
  };

  const toggleLanguage = () => {
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setCurrentLanguage(languages[nextIndex]);
    toast({
      title: "Language Changed",
      description: `Switched to ${languages[nextIndex]}`,
    });
  };

  const startDemo = () => {
    setIsPlaying(true);
    toast({
      title: "Demo Started",
      description: "Showcasing platform features...",
    });
    setTimeout(() => {
      setIsPlaying(false);
      navigate("/disease-detection");
    }, 2000);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern farming landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Sparkles className="w-3 h-3 mr-1" />
                Smart India Hackathon 2024
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Empowering Farmers with
                <span className="block text-primary-glow">AI Technology</span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Revolutionizing agriculture through AI-powered disease detection, 
                smart weather monitoring, and intelligent farming solutions. Your digital farming companion.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="xl" 
                variant="hero" 
                onClick={startDemo}
                className="group"
              >
                {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {isPlaying ? "Demo Running..." : "Start Demo"}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="xl" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={() => navigate("/disease-detection")}
              >
                Try Disease Detection
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-white/80">Farmers Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-white/80">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-white/80">AI Support</div>
              </div>
            </div>
          </div>

          {/* Voice Interface Card */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md bg-white/95 backdrop-blur shadow-2xl">
              <CardContent className="p-8 space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Voice Assistant</h3>
                  <p className="text-muted-foreground text-sm">
                    Speak in your preferred language
                  </p>
                </div>

                {/* Voice Controls */}
                <div className="flex flex-col items-center space-y-4">
                  {/* Microphone Button */}
                  <button
                    onClick={handleVoiceToggle}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isListening 
                        ? "bg-gradient-primary shadow-glow animate-pulse" 
                        : "bg-muted hover:bg-accent"
                    }`}
                  >
                    {isListening ? (
                      <MicOff className="w-8 h-8 text-white" />
                    ) : (
                      <Mic className="w-8 h-8 text-primary" />
                    )}
                    
                    {/* Listening Animation */}
                    {isListening && (
                      <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
                    )}
                  </button>

                  <p className="text-sm text-center">
                    {isListening ? "Listening..." : "Tap to speak"}
                  </p>
                </div>

                {/* Language Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Language:</span>
                    <Badge variant="outline">{currentLanguage}</Badge>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={toggleLanguage}
                    className="w-full"
                  >
                    <Languages className="w-4 h-4 mr-2" />
                    Switch Language
                  </Button>
                </div>

                {/* Voice Features */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Voice Commands:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• "Detect crop disease"</li>
                    <li>• "Check weather forecast"</li>
                    <li>• "Find machinery rental"</li>
                    <li>• "Show government schemes"</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}