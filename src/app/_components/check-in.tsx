"use client";

import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";

// Simple CSS spinner component
function Spinner() {
	return (
		<div className="h-4 w-4 animate-spin rounded-full border-current border-b-2" />
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
