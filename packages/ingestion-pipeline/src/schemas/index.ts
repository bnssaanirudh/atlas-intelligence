import { z } from 'zod';

export const StartupSchema = z.object({
  schemaVersion: z.string(),
  recordType: z.literal('STARTUP'),
  source: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
  content: z.object({
    entityName: z.string(),
    data: z.object({
      employeeCount: z.number().int().optional(),
    }),
  }),
  collectedAt: z.string().datetime(), // ISO-8601
});

export const ProductSchema = z.object({
  schemaVersion: z.string(),
  recordType: z.literal('PRODUCT'),
  source: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
  content: z.object({
    startupName: z.string(),
    pricingModel: z.enum(['FREE', 'FREEMIUM', 'PAID', 'ENTERPRISE']),
  }),
  collectedAt: z.string().datetime(), // ISO-8601
});

export const ResearchPaperSchema = z.object({
  schemaVersion: z.string(),
  recordType: z.literal('RESEARCH_PAPER'),
  content: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    paper_url: z.string().url(),
    github_url: z.string().url().optional(),
    github_stars: z.number().int().optional(),
    published_date: z.string().datetime(), // ISO-8601
  }),
});

export const JobSchema = z.object({
  schemaVersion: z.string(),
  recordType: z.literal('JOB'),
  content: z.object({
    company: z.string(),
    date: z.string().datetime(), // ISO-8601
    is_remote: z.boolean(),
    role_family: z.string(),
  }),
});

export type Startup = z.infer<typeof StartupSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ResearchPaper = z.infer<typeof ResearchPaperSchema>;
export type Job = z.infer<typeof JobSchema>;
