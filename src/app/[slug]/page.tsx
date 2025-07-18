import { api, HydrateClient } from "~/trpc/server";
import { CheckIn } from "../_components/check-in";
import { MemberList } from "../_components/member-list";

export default async function GymPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const gym = await api.gym.getBySlug({ slug });

  if (!gym) {
    return <div>Gym not found</div>;
  }

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{gym?.name}</h1>
        <CheckIn gymId={gym.id} />
        <MemberList gymId={gym.id} />
      </div>
    </HydrateClient>
  );
}
