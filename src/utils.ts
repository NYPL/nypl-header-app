// This is used just for the app's environment value, either
// qa or production. This function is needed to get around jest
// throwing an error trying to load a cjs module (and this syntax
// is also Vite-specific).
export const getEnvVar = (key: string) => {
  return import.meta.env[key];
};
