import * as Router from "koa-joi-router";

import {
  addNewSurvey,
  fetchAllSurveys,
  removeSurvey,
  getSurveyById,
  updateSurvay,
} from "../controllers/survey.controller";

const survey = Router();
survey.prefix("/surveys");

survey.route({
  method: "post",
  path: "/",
  meta: {},
  validate: {
    // TODO
  },
  handler: addNewSurvey,
});

survey.route({
  method: "get",
  path: "/",
  meta: {},
  validate: {
    // TODO
  },
  handler: fetchAllSurveys,
});

survey.route({
  method: "delete",
  path: "/:id",
  meta: {},
  validate: {
    // TODO
  },
  handler: removeSurvey,
});

survey.route({
  method: "get",
  path: "/:id",
  meta: {},
  validate: {
    // TODO
  },
  handler: getSurveyById,
});

survey.route({
  method: "put",
  path: "/:id",
  meta: {},
  validate: {
    // TODO
  },
  handler: updateSurvay,
});

export default () => survey;
