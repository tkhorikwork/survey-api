import { ParameterizedContext } from "koa";
import { createSurvey, fetchSurveys, removeSurveyById, fetchSurveyById, updateSurveyById } from "../services";

export const addNewSurvey = async (ctx: ParameterizedContext) => {
  const { body } = ctx.request;

  const survey = await createSurvey(body);
  ctx.ok(survey);
};

export const fetchAllSurveys = async (ctx: ParameterizedContext) => {
  const survey = await fetchSurveys();
  ctx.ok(survey);
};

export const removeSurvey = async (ctx: ParameterizedContext) => {
  const removedSurvey = await removeSurveyById(ctx.params.id);
  ctx.ok(removedSurvey);
};

export const getSurveyById = async (ctx: ParameterizedContext) => {
  const removedSurvey = await fetchSurveyById(ctx.params.id);
  ctx.ok(removedSurvey);
};

export const updateSurvay = async (ctx: ParameterizedContext) => {
  const { body } = ctx.request;

  const updatedSurvey = await updateSurveyById(ctx.params.id, body);
  ctx.ok(updatedSurvey);
};
