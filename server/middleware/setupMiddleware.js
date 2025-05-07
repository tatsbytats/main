// middleware/setupMiddleware.js
module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // Remove CORS from here if added in server.js
};