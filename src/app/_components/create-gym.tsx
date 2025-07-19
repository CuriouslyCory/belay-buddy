"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";

import { api } from "~/trpc/react";
import { Button } from "./ui/button";

// Validation schema
const gymSchema = z.object({
	name: z.string().min(1, "Gym name is required"),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	country: z.string().optional(),
	phone: z.string().optional(),
	website: z
		.string()
		.url("Please enter a valid URL")
		.optional()
		.or(z.literal("")),
});

type GymFormData = z.infer<typeof gymSchema>;

export function CreateGym() {
	const [isOpen, setIsOpen] = useState(false);
	const utils = api.useUtils();
	const createGym = api.gym.create.useMutation({
		onSuccess: async () => {
			await utils.gym.invalidate();
			form.reset();
		},
	});

	const form = useForm({
		defaultValues: {
			name: "",
			address: "",
			city: "",
			state: "",
			zip: "",
			country: "",
			phone: "",
			website: "",
		} as GymFormData,
		onSubmit: async ({ value }) => {
			// Validate the form data
			const result = gymSchema.safeParse(value);
			if (!result.success) {
				// Handle validation errors if needed
				console.error("Validation errors:", result.error.errors);
				return;
			}

			// Create slug from name
			const slug = value.name.toLowerCase().replace(/ /g, "-");

			createGym.mutate({
				name: value.name,
				slug,
				address: value.address || undefined,
				city: value.city || undefined,
				state: value.state || undefined,
				zip: value.zip || undefined,
				country: value.country || undefined,
				phone: value.phone || undefined,
				website: value.website || undefined,
			});
		},
	});

	return (
		<div className="w-full max-w-xs">
			{!isOpen && (
				<div className="flex justify-center">
					<Button onClick={() => setIsOpen(true)}>Create Gym</Button>
				</div>
			)}
			{isOpen && (
				<div className="flex flex-col gap-2">
					<Button onClick={() => setIsOpen(false)}>Close Form</Button>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className="flex flex-col gap-2"
					>
						<form.Field name="name">
							{(field) => (
								<div>
									<input
										type="text"
										placeholder="Gym Name"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										className="w-full rounded-full bg-white/10 px-4 py-2 text-white placeholder:text-white/60"
									/>
									{field.state.meta.errors.length > 0 && (
										<div className="mt-1 text-red-400 text-sm">
											{field.state.meta.errors[0]}
										</div>
									)}
								</div>
							)}
						</form.Field>

						<form.Field name="address">
							{(field) => (
								<div>
									<input
										type="text"
										placeholder="Street Address (optional)"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										className="w-full rounded-full bg-white/10 px-4 py-2 text-white placeholder:text-white/60"
									/>
									{field.state.meta.errors.length > 0 && (
										<div className="mt-1 text-red-400 text-sm">
											{field.state.meta.errors[0]}
										</div>
									)}
								</div>
							)}
						</form.Field>

						<form.Field name="city">
							{(field) => (
								<div>
									<input
										type="text"
										placeholder="City (optional)"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										className="w-full rounded-full bg-white/10 px-4 py-2 text-white placeholder:text-white/60"
									/>
									{field.state.meta.errors.length > 0 && (
										<div className="mt-1 text-red-400 text-sm">
											{field.state.meta.errors[0]}
										</div>
									)}
								</div>
							)}
						</form.Field>

						<div className="flex gap-2">
							<form.Field name="state">
								{(field) => (
									<div className="flex-1">
										<input
											type="text"
											placeholder="State (optional)"
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											className="w-full rounded-full bg-white/10 px-4 py-2 text-white placeholder:text-white/60"
										/>
										{field.state.meta.errors.length > 0 && (
											<div className="mt-1 text-red-400 text-sm">
												{field.state.meta.errors[0]}
											</div>
										)}
									</div>
								)}
							</form.Field>

							<form.Field name="zip">
								{(field) => (
									<div className="flex-1">
										<input
											type="text"
											placeholder="ZIP (optional)"
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											className="w-full rounded-full bg-white/10 px-4 py-2 text-white placeholder:text-white/60"
										/>
										{field.state.meta.errors.length > 0 && (
											<div className="mt-1 text-red-400 text-sm">
												{field.state.meta.errors[0]}
											</div>
										)}
									</div>
								)}
							</form.Field>
						</div>

						<form.Field name="country">
							{(field) => (
								<div>
									<input
										type="text"
										placeholder="Country (optional)"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										className="w-full rounded-full bg-white/10 px-4 py-2 text-white placeholder:text-white/60"
									/>
									{field.state.meta.errors.length > 0 && (
										<div className="mt-1 text-red-400 text-sm">
											{field.state.meta.errors[0]}
										</div>
									)}
								</div>
							)}
						</form.Field>

						<form.Field name="phone">
							{(field) => (
								<div>
									<input
										type="tel"
										placeholder="Phone (optional)"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										className="w-full rounded-full bg-white/10 px-4 py-2 text-white placeholder:text-white/60"
									/>
									{field.state.meta.errors.length > 0 && (
										<div className="mt-1 text-red-400 text-sm">
											{field.state.meta.errors[0]}
										</div>
									)}
								</div>
							)}
						</form.Field>

						<form.Field name="website">
							{(field) => (
								<div>
									<input
										type="url"
										placeholder="Website (optional)"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										className="w-full rounded-full bg-white/10 px-4 py-2 text-white placeholder:text-white/60"
									/>
									{field.state.meta.errors.length > 0 && (
										<div className="mt-1 text-red-400 text-sm">
											{field.state.meta.errors[0]}
										</div>
									)}
								</div>
							)}
						</form.Field>

						<button
							type="submit"
							className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 disabled:opacity-50"
							disabled={createGym.isPending || form.state.isSubmitting}
						>
							{createGym.isPending || form.state.isSubmitting
								? "Submitting..."
								: "Submit"}
						</button>
					</form>
				</div>
			)}
		</div>
	);
}
