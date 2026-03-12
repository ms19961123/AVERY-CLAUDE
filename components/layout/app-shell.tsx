"use client";

import { FamilyProvider, useFamily } from "@/lib/family-context";
import { Navbar } from "@/components/layout/navbar";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";

function AppContent({ children }: { children: React.ReactNode }) {
  const { isOnboarded, completeOnboarding } = useFamily();

  if (!isOnboarded) {
    return (
      <OnboardingFlow
        onComplete={completeOnboarding}
        onSkip={() =>
          completeOnboarding({
            completed: true,
            familyName: "The Johnsons",
            parentName: "Sarah",
            children: [],
            planningStyle: "balanced",
            preferredDowntimeHours: 2,
            travelBufferMinutes: 15,
            maxActivitiesPerDay: 3,
          })
        }
      />
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 lg:py-8">
        {children}
      </main>
    </>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <FamilyProvider>
      <AppContent>{children}</AppContent>
    </FamilyProvider>
  );
}
