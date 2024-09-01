export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  frontendUrl: process.env.FRONTEND_URL,
  xsrf: {
    secret: process.env.XSRF_SECRET,
  },
});
