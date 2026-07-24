import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import AppShell from "@/components/layout/AppShell";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/app/Home";
import Weather from "./pages/app/Weather";
import Soil from "./pages/app/Soil";
import CropPlanner from "./pages/app/CropPlanner";
import Disease from "./pages/app/Disease";
import AI from "./pages/app/AI";
import Market from "./pages/app/Market";
import Tasks from "./pages/app/Tasks";
import Accounting from "./pages/app/Accounting";
import Inventory from "./pages/app/Inventory";
import Schemes from "./pages/app/Schemes";
import Community from "./pages/app/Community";
import Sensors from "./pages/app/Sensors";
import Farms from "./pages/app/Farms";
import Notifications from "./pages/app/Notifications";
import Settings from "./pages/app/Settings";
import Profile from "./pages/app/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/app" element={<AppShell />}>
              <Route index element={<Home />} />
              <Route path="weather" element={<Weather />} />
              <Route path="soil" element={<Soil />} />
              <Route path="crops" element={<CropPlanner />} />
              <Route path="disease" element={<Disease />} />
              <Route path="ai" element={<AI />} />
              <Route path="market" element={<Market />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="accounting" element={<Accounting />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="schemes" element={<Schemes />} />
              <Route path="community" element={<Community />} />
              <Route path="sensors" element={<Sensors />} />
              <Route path="farms" element={<Farms />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/dashboard" element={<Navigate to="/app" replace />} />
            <Route path="/weather" element={<Navigate to="/app/weather" replace />} />
            <Route path="/soil-health" element={<Navigate to="/app/soil" replace />} />
            <Route path="/soil-analysis" element={<Navigate to="/app/soil" replace />} />
            <Route path="/disease-detection" element={<Navigate to="/app/disease" replace />} />
            <Route path="/accounting" element={<Navigate to="/app/accounting" replace />} />
            <Route path="/profile" element={<Navigate to="/app/profile" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
