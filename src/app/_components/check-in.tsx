"use client";

import { api } from "~/trpc/react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { toast } from "sonner";

// Simple CSS spinner component
function Spinner() {
  return (
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
  );
}

export function CheckIn({ gymId }: { gymId: string }) {
  const { isSignedIn } = useAuth();
  const utils = api.useUtils();
  const { mutate: checkIn, isPending } = api.gym.checkIn.useMutation({
    onSuccess: () => {
      toast.success("Checked in successfully");
      utils.gym.getMembers.invalidate();
    },
    onError: () => {
      toast.error("Failed to check in");
    },
  });

  if (!isSignedIn) {
    return <div>Please sign in to check in</div>;
  }

  const handleCheckIn = () => {
    checkIn({ gymId });
  };

  return (
    <div>
      <Button onClick={handleCheckIn} disabled={isPending}>
        {isPending ? (
          <>
            <Spinner />
            Checking in...
          </>
        ) : (
          "Check In"
        )}
      </Button>
    </div>
  );
}
