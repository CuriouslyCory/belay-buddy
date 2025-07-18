"use client";

import { api } from "~/trpc/react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function CheckIn({ gymId }: { gymId: string }) {
  const { isSignedIn } = useAuth();
  const { mutate: checkIn } = api.gym.checkIn.useMutation({
    onSuccess: () => {
      const utils = api.useUtils();
      toast.success("Checked in successfully");
      utils.gym.getMembers.invalidate();
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
      <Button onClick={handleCheckIn}>Check In</Button>
    </div>
  );
}
