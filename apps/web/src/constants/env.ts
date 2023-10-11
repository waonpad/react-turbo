import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {},
  clientPrefix: 'VITE_',
  client: {
    VITE_APP_ENV: z.enum(['development', 'production', 'test']),
    VITE_API_URL: z.string(),
    VITE_APP_NAME: z.string(),
    VITE_HOST_URL: z.string(),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
