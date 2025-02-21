import { NextFunction, Request, Response } from 'express';
import handleErrorAsync from '../middleware/handleErrorAsync';

import logger from '../utils/logger';

import { Success, appError } from '../utils/appResponse';
import skillModel from '../models/skill.model';

const getSkillList = handleErrorAsync(async (req: Request, res: Response) => {
  const skillList = await skillModel.getAll();
  logger.info(`skillList GET"${req.path}`);
  Success(res, skillList);
});

const createSkill = handleErrorAsync(async (req: Request, res: Response) => {
  const { name } = req.body;
  logger.info(`skillList POST"${req.path}`);

  const newSkill = await skillModel.create(name);

  Success(res, newSkill, 201);
});

const deleteSkillById = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  logger.info(`Skill DELETE:${req.path}`);
  const existSkill = await skillModel.findById(id);
  if (!existSkill) {
    return next(appError(`找不到 ID 為 ${id} 的 Skill資料`, next, 400));
  }

  await skillModel.delete(id);
  Success(res, '', 200);
});

const SkillController = {
  getSkillList,
  createSkill,
  deleteSkillById,
};

export default SkillController;
