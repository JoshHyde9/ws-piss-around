import type { App } from "../../../apps/server/src";

import { treaty } from "@elysiajs/eden";

export const { api } = treaty<App>("http://localhost:3000");
