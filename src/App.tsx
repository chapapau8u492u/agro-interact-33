import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import HomePage from "./pages/HomePage";
import DiseaseDetection from "./pages/DiseaseDetection";

import Weather from "./pages/Weather";
import MachineryMarketplace from "./pages/MachineryMarketplace";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import UserProfile from "./pages/UserProfile";
import KisanBazaar from "./pages/KisanBazaar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
              
              <Route path="/weather" element={<Weather />} />
              <Route path="/machinery" element={<MachineryMarketplace />} />
              <Route path="/schemes" element={<GovernmentSchemes />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/bazaar" element={<KisanBazaar />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
