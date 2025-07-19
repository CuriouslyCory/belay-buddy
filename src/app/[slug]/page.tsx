import { HydrateClient, api } from "~/trpc/server";
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
			<main className="flex flex-col items-center justify-center gap-4">
				<h1 className="font-bold text-2xl">{gym?.name}</h1>
				<CheckIn gymId={gym.id} />
				<MemberList gymId={gym.id} />
			</main>
		</HydrateClient>
	);
}
