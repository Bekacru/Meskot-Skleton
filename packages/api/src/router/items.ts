import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
    all:publicProcedure.query(async({ctx})=>{
        return await ctx.prisma.items.findMany()
    }),
    byId: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.items.findFirst({
                where: {
                    id: input.id
                }
            })
        }),
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                qty: z.number(),
                price: z.number(),
            }),
        )
        .mutation(async({ ctx, input }) => {
            console.log(input, "input")
            return await ctx.prisma.items.create({
                data: {
                    ...input
                }
            })
        }),
});