import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Sprout, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, register, loading } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('login');
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    language: 'hindi',
    farmSize: 0,
    crops: [] as string[]
  });

  const demoAccounts = [
    {
      name: 'राम शर्मा (Maharashtra Farmer)',
      email: 'ram@farmer.com',
      language: 'Hindi',
      crops: ['Rice', 'Wheat', 'Sugarcane']
    },
    {
      name: 'Priya Nair (Kerala Farmer)',
      email: 'priya@farmer.com',
      language: 'Malayalam',
      crops: ['Coconut', 'Pepper', 'Cardamom']
    },
    {
      name: 'Harpreet Singh (Punjab Farmer)',
      email: 'harpreet@farmer.com',
      language: 'Punjabi',
      crops: ['Wheat', 'Rice', 'Cotton']
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }

    const success = await login(loginForm.email, loginForm.password);
    
    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome back to Farmer Connect!",
      });
      onClose();
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Try one of the demo accounts.",
        variant: "destructive"
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const success = await register(registerForm);
    
    if (success) {
      toast({
        title: "Registration Successful",
        description: "Welcome to Farmer Connect!",
      });
      onClose();
    } else {
      toast({
        title: "Registration Failed",
        description: "An account with this email already exists.",
        variant: "destructive"
      });
    }
  };

  const handleDemoLogin = (email: string) => {
    setLoginForm({ email, password: 'farmer123' });
    setActiveTab('login');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Sprout className="h-6 w-6 text-primary" />
            <span>Farmer Connect</span>
          </CardTitle>
          <CardDescription>
            Join our agricultural community platform
          </CardDescription>
          <Button 
            variant="ghost" 
            size="sm"
            className="absolute top-2 right-2"
            onClick={onClose}
          >
            ✕
          </Button>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>

              {/* Demo Accounts */}
              <div className="mt-6">
                <p className="text-sm font-medium mb-3 text-center">Demo Accounts (Password: farmer123)</p>
                <div className="space-y-2">
                  {demoAccounts.map((account, index) => (
                    <div 
                      key={index}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                      onClick={() => handleDemoLogin(account.email)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{account.name}</p>
                          <p className="text-xs text-muted-foreground">{account.email}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {account.language}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {account.crops.slice(0, 2).map((crop, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="register-name">Full Name *</Label>
                    <Input
                      id="register-name"
                      placeholder="Your name"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-phone">Phone</Label>
                    <Input
                      id="register-phone"
                      placeholder="Mobile number"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="register-email">Email *</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="register-password">Password *</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Create a password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="register-location">Location</Label>
                    <Input
                      id="register-location"
                      placeholder="City, State"
                      value={registerForm.location}
                      onChange={(e) => setRegisterForm({...registerForm, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-farmsize">Farm Size (acres)</Label>
                    <Input
                      id="register-farmsize"
                      type="number"
                      placeholder="0"
                      value={registerForm.farmSize}
                      onChange={(e) => setRegisterForm({...registerForm, farmSize: Number(e.target.value)})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="register-language">Preferred Language</Label>
                  <Select 
                    value={registerForm.language} 
                    onValueChange={(value) => setRegisterForm({...registerForm, language: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindi">Hindi (हिंदी)</SelectItem>
                      <SelectItem value="marathi">Marathi (मराठी)</SelectItem>
                      <SelectItem value="malayalam">Malayalam (മലയാളം)</SelectItem>
                      <SelectItem value="punjabi">Punjabi (ਪੰਜਾਬੀ)</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}