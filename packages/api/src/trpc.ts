import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import { auth } from "./auth";
import { prisma } from "@meskot/db";
import type { RequestEvent } from "@sveltejs/kit"

interface Session {
    user: {
        id: string
    }
}

interface CreateContextOptions {
    session: Session | null;
}

export const createInnerTRPCContext = (opts: CreateContextOptions) => {
    return {
        session: opts.session,
        prisma,
    };
};

// eslint-disable-next-line @typescript-eslint/require-await
export async function createContext(event: RequestEvent) {
    try {
        const session = auth.verify(event.request)
        return createInnerTRPCContext({ session });
    } catch {
        return createInnerTRPCContext({ session: null });
    }
}

const t = initTRPC.context<typeof createContext>().create({
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        };
    },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.session?.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            // infers the `session` as non-nullable
            session: { ...ctx.session, user: ctx.session.user },
        },
    });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);