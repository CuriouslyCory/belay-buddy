import { HydrateClient, api } from "~/trpc/server";
import { CreateGym } from "./_components/create-gym";
import { GymList } from "./_components/gym-list";

export default async function Home() {
	void api.gym.getAll.prefetch();

	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col items-center gap-12 px-4">
				<GymList />

				<CreateGym />
			</main>
		</HydrateClient>
	);
}
