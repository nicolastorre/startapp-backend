export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port:
      (process.env.DATABASE_PORT && parseInt(process.env.DATABASE_PORT, 10)) ||
      5432,
  },
});
