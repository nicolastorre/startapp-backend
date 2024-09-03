export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  frontendUrl: process.env.FRONTEND_URL,
  xsrf: {
    secret: process.env.XSRF_SECRET,
  },
});
