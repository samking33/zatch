import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CustomCursor } from "@/components/ui/custom-cursor";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AboutPage from "@/pages/about";
import DownloadPage from "@/pages/download";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";
import ReturnsPage from "@/pages/returns";
import ShippingPage from "@/pages/shipping";
import JoinBuyerPage from "@/pages/join-buyer";
import JoinSellerPage from "@/pages/join-seller";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/download" component={DownloadPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/returns" component={ReturnsPage} />
      <Route path="/shipping" component={ShippingPage} />
      <Route path="/join/buyer" component={JoinBuyerPage} />
      <Route path="/join/seller" component={JoinSellerPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CustomCursor />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
