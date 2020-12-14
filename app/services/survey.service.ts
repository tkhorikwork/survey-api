import Survey from "../models/Survey";
import Question from "../models/Question";
import { ObjectId } from "mongodb";

export const fetchSurveys = async (): Promise<any> => {
  const aggregateQuery = [
    {
      $match: {
        $and: [{ active: true }],
      },
    },
    {
      $lookup: {
        from: "users",
        let: { survey_user: "$createdBy" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$_id", "$$survey_user"] }, { active: true }],
              },
            },
          },
        ],
        as: "createdBy",
      },
    },
    { $unwind: "$createdBy" },
  ];

  return await Survey.aggregate(aggregateQuery);
};

export const fetchSurveyById = async (id: number): Promise<any> => {
  const aggregateQuery = [
    {
      $match: {
        $and: [{ active: true, _id: id }],
      },
    },
    {
      $lookup: {
        from: "users",
        let: { survey_user: "$createdBy" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$_id", "$$survey_user"] }, { active: true }],
              },
            },
          },
        ],
        as: "createdBy",
      },
    },
    { $unwind: "$createdBy" },
  ];

  return await Survey.aggregate(aggregateQuery);
};

export const updateSurveyById = async (id: number, payload: { [key: string]: any }): Promise<any> => {
  const { questions = [], ...rest } = payload;
  // TODO
};

export const removeSurveyById = async (id: number): Promise<any> =>
  await Survey.findByIdAndUpdate({ _id: id }, { active: false }, { new: true });

export const createSurvey = async (payload: { [key: string]: any }): Promise<any> => {
  const { questions = [], ...rest } = payload;

  const newSurvey = new Survey(rest);
  newSurvey._id = new ObjectId();
  newSurvey.createdBy = new ObjectId(newSurvey.createdBy);

  const createdSurveys = await newSurvey.save();

  if (questions && questions.length) {
    await Promise.all(
      questions.map(async (question: { [key: string]: any }) => {
        question._id = new ObjectId();
        question.createdBy = new ObjectId(question.createdBy);

        const newQuestion = new Question(question);
        return await newQuestion.save();
      }),
    );
  }

  return await fetchSurveyById(createdSurveys._id);
};
