import { HydrateClient, api } from "~/trpc/server";
import { GymList } from "./_components/gym-list";
import { CreateGym } from "./_components/create-gym";

export default async function Home() {
  void api.gym.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="font-extrabold text-5xl tracking-tight sm:text-[5rem]">
            Belay <span className="text-[hsl(280,100%,70%)]">Buddy</span>
          </h1>

          <GymList />

          <CreateGym />
        </div>
      </main>
    </HydrateClient>
  );
}
