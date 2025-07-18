"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { api } from "~/trpc/react";

export function GymList() {
  const { data: gyms, isPending } = api.gym.getAll.useQuery();

  if (isPending) return <div>Loading...</div>;

  if (!gyms) return <div>No gyms found</div>;

  return (
    <div className="w-full max-w-xs">
      <h2 className="text-2xl font-bold">Gyms</h2>
      {gyms.map((gym) => (
        <div key={gym.id}>
          <Link className="flex items-center gap-2" href={`/${gym.slug}`}>
            {gym.name}
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}
