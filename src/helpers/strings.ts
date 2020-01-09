export const toUpperSnakeCase = (s: string) =>
  s.replace(/(([a-z])([A-Z]))/g, ([a, b]) => `${a}_${b}`).toUpperCase();
