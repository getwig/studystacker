import { query } from './_generated/server';

export const getUser = query(async (ctx) => {
  const userIdentity = await ctx.auth.getUserIdentity();

  return userIdentity;
});
