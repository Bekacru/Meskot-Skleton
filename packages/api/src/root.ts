import { authRouter } from "./router/auth";
import { itemRouter } from "./router/items";
import { createTRPCRouter } from "./trpc";

export const router = createTRPCRouter({
    auth: authRouter,
    item: itemRouter,
});

// export type definition of API
export type Router = typeof router;