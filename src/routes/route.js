import {
  addJob,
  fetchJob,
  addCandidate,
  fetchCandidate,
  register,
  login,
  loginRequired
} from "../controllers/controller.js";

export const routes = (app) => {
  app
    .route("/api/job")
    .get((req, res, next) => {
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, fetchJob)
    .post(loginRequired, addJob);

  app
    .route("/api/candidate")
    .get((req, res, next) => {
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, fetchCandidate)
    .post(loginRequired, addCandidate);

  app.route('/auth/register')
    .post(register);
  app.route('/auth/login')
    .post(login);
};


