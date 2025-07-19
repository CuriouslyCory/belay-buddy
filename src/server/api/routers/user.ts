import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
	createIfNotExists: protectedProcedure
		.input(
			z.object({
				clerkId: z.string().min(1),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const user = await ctx.db.user.findUnique({
				where: { clerkId: input.clerkId },
			});
			if (user) return user;

			const clerkUser = await currentUser();

			console.log("clerkUser", clerkUser);

			if (!clerkUser || !clerkUser?.username) return null;

			return ctx.db.user.create({
				data: {
					clerkId: clerkUser.id,
					email: clerkUser.emailAddresses[0]?.emailAddress,
					name:
						clerkUser.fullName ??
						`${clerkUser.firstName} ${clerkUser.lastName}`,
					username: clerkUser.username,
					imageUrl: clerkUser.imageUrl,
				},
			});
		}),

	getById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			return ctx.db.user.findUnique({ where: { id: input.id } });
		}),

	getByClerkId: publicProcedure
		.input(z.object({ clerkId: z.string() }))
		.query(async ({ ctx, input }) => {
			return ctx.db.user.findUnique({ where: { clerkId: input.clerkId } });
		}),
});
