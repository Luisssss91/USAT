import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            {/* Placeholder routes for other sections */}
            <Route path="/academic" element={<div className="p-6 text-center text-muted-foreground">Academic section coming soon...</div>} />
            <Route path="/hr" element={<div className="p-6 text-center text-muted-foreground">HR section coming soon...</div>} />
            <Route path="/examinations" element={<div className="p-6 text-center text-muted-foreground">Examinations section coming soon...</div>} />
            <Route path="/communication" element={<div className="p-6 text-center text-muted-foreground">Communication section coming soon...</div>} />
            <Route path="/reports" element={<div className="p-6 text-center text-muted-foreground">Reports section coming soon...</div>} />
            <Route path="/fees" element={<div className="p-6 text-center text-muted-foreground">Fees section coming soon...</div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
