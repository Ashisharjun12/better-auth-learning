
import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable  ('users', {
  id: uuid('id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  avatar: text('avatar'),
  passwordHash: text('password_hash'),
  googleId: text('google_id').unique(),
  githubId: text('github_id').unique(),
  provider: text('provider'), // 'google', 'github', 'email'
  emailVerified: boolean('email_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});