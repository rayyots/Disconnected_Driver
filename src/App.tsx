
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RideProvider } from "@/contexts/RideContext";

// Pages
import HomePage from "./pages/HomePage";
import EarningsPage from "./pages/EarningsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

// Auth and AuthPage are now removed

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        {/* AuthProvider and all auth routes removed */}
        <Routes>
          <Route path="/" element={
            <RideProvider>
              <HomePage />
            </RideProvider>
          } />
          <Route path="/earnings" element={
            <RideProvider>
              <EarningsPage />
            </RideProvider>
          } />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/auth" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
