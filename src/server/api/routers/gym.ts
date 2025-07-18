import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { userRouter } from "./user";
import { TRPCError } from "@trpc/server";

export const gymRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zip: z.string().optional(),
        country: z.string().optional(),
        phone: z.string().optional(),
        website: z.string().url().optional().or(z.literal("")),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const caller = userRouter.createCaller(ctx);
      const user = await caller.createIfNotExists({
        clerkId: ctx.userId,
      });

      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }

      console.log("user", user);
      console.log("ctx.userId", ctx.userId);

      return ctx.db.gym.create({
        data: {
          name: input.name,
          slug: input.slug,
          address: input.address || null,
          city: input.city || null,
          state: input.state || null,
          zip: input.zip || null,
          country: input.country || null,
          phone: input.phone || null,
          website: input.website || null,
          memberCount: 0,
          createdById: user.id,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.gym.findMany();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.gym.findUnique({ where: { id: input.id } });
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.gym.findUnique({ where: { slug: input.slug } });
    }),

  checkIn: protectedProcedure
    .input(z.object({ gymId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const caller = userRouter.createCaller(ctx);
      const user = await caller.createIfNotExists({
        clerkId: ctx.userId,
      });

      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }

      // Check if the user is already registered to this gym
      const existingMembership = await ctx.db.gym.findFirst({
        where: {
          id: input.gymId,
          members: {
            some: {
              id: user.id,
            },
          },
        },
      });

      if (!existingMembership) {
        await ctx.db.gym.update({
          where: { id: input.gymId },
          data: {
            memberCount: { increment: 1 },
            members: { connect: { id: user.id } },
          },
        });
      }

      // Update the user's last checked in date
      await ctx.db.user.update({
        where: { id: user.id },
        data: { lastCheckedIn: new Date() },
      });

      return {
        success: true,
        message: "User checked in successfully",
      };
    }),

  getMembers: publicProcedure
    .input(z.object({ gymId: z.string() }))
    .query(async ({ ctx, input }) => {
      const gym = await ctx.db.gym.findUnique({
        where: { id: input.gymId },
        include: { members: { orderBy: { lastCheckedIn: "desc" } } },
      });

      if (!gym) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Gym not found",
        });
      }

      return gym.members;
    }),
});
