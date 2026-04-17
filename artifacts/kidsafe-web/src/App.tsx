import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import Browse from "@/pages/Browse";
import Dashboard from "@/pages/Dashboard";
import FilmDetail from "@/pages/FilmDetail";
import BookDetail from "@/pages/BookDetail";
import PlaceDetail from "@/pages/PlaceDetail";
import ActivityDetail from "@/pages/ActivityDetail";
import Community from "@/pages/Community";
import ThreadDetail from "@/pages/ThreadDetail";
import Assistant from "@/pages/Assistant";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import About from "@/pages/About";

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();
  const minimalChrome = location === "/login" || location === "/signup" || location.startsWith("/assistant");

  return (
    <div className="flex min-h-screen flex-col">
      {!minimalChrome && <TopNav />}
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/browse" component={Browse} />
          <Route path="/film/:id" component={FilmDetail} />
          <Route path="/book/:id" component={BookDetail} />
          <Route path="/place/:id" component={PlaceDetail} />
          <Route path="/activity/:id" component={ActivityDetail} />
          <Route path="/community" component={Community} />
          <Route path="/community/:id" component={ThreadDetail} />
          <Route path="/assistant" component={Assistant} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {!minimalChrome && <Footer />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
