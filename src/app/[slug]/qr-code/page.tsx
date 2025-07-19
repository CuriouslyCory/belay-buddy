import { QRCodeSVG } from "qrcode.react";
import { HydrateClient, api } from "~/trpc/server";

export default async function QRCodePage({
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
			<div className="flex flex-col items-center justify-center">
				<h1 className="font-bold text-2xl">{gym?.name}</h1>

				<QRCodeSVG
					value={`https://belaybuddy.com/${gym.slug}`}
					size={200}
					level="H"
				/>
			</div>
		</HydrateClient>
	);
}
