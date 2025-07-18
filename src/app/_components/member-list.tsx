"use client";

import { api } from "~/trpc/react";

export function MemberList({ gymId }: { gymId: string }) {
  const { data: members, isPending } = api.gym.getMembers.useQuery({
    gymId,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Members</h2>
      {!isPending && members?.length === 0 && <div>No members found</div>}
      {members?.map((member) => (
        <div key={member.id}>
          {member.name} {member.lastCheckedIn?.toLocaleDateString()}
        </div>
      ))}
    </div>
  );
}
