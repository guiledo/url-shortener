import { z } from 'zod';

export const shortenUrlSchema = z.object({
  body: z.object({
    url: z.string().url({ message: "Invalid URL format" }),
  }),
});

export type ShortenUrlInput = z.infer<typeof shortenUrlSchema>['body'];
