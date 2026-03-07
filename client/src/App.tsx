import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { flushPendingSection, getPendingSection } from "@/lib/section-navigation";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

const AboutPage = lazy(() => import("@/pages/about"));
const DownloadPage = lazy(() => import("@/pages/download"));
const PrivacyPage = lazy(() => import("@/pages/privacy"));
const TermsPage = lazy(() => import("@/pages/terms"));
const ReturnsPage = lazy(() => import("@/pages/returns"));
const ShippingPage = lazy(() => import("@/pages/shipping"));
const JoinSellerPage = lazy(() => import("@/pages/join-seller"));

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (location !== "/") {
      window.scrollTo(0, 0);
      return;
    }

    if (!getPendingSection()) {
      window.scrollTo(0, 0);
      return;
    }

    let frameId = 0;
    let attempts = 0;

    const tryScroll = () => {
      if (flushPendingSection()) return;
      attempts += 1;
      if (attempts < 90) {
        frameId = window.requestAnimationFrame(tryScroll);
      }
    };

    frameId = window.requestAnimationFrame(tryScroll);
    return () => window.cancelAnimationFrame(frameId);
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={AboutPage} />
          <Route path="/download" component={DownloadPage} />
          <Route path="/privacy" component={PrivacyPage} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/returns" component={ReturnsPage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/join/buyer" component={DownloadPage} />
          <Route path="/join/seller" component={JoinSellerPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function RouteFallback() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <span className="text-sm text-white/50">Loading...</span>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
