export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  frontendUrl: process.env.FRONTEND_URL,
});
