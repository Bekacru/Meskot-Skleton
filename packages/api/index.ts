import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { Router } from "./src/root";

export { router, type Router } from "./src/root";
export { createContext } from "./src/trpc";

export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;