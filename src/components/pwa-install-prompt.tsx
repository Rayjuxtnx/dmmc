"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PwaInstallPrompt = () => {
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      
      // Don't show the prompt if the app is already installed
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return;
      }

      const promptEvent = event as any;

      const handleInstallClick = () => {
        promptEvent.prompt();
        // The user choice is handled by the browser, we don't need to do anything here.
        // The toast will be dismissed automatically by the user clicking the action.
      };

      toast({
        title: "Install the DMMC App",
        description: "Get a better experience by installing our app on your device.",
        action: (
          <Button variant="outline" size="sm" onClick={handleInstallClick}>
            <Download className="mr-2 h-4 w-4" />
            Install
          </Button>
        ),
        duration: 30000, // Keep it on screen for 30 seconds
      });
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, [toast]);

  return null; // This component doesn't render anything itself
};
