import { z } from 'zod';
import { creditPackageSchema } from '.';

export type creditPackageType = z.infer<typeof creditPackageSchema>;
