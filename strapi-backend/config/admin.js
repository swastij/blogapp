module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'dd6fa4e212a1330994e54ce8b62fc2f2'),
  },
});
