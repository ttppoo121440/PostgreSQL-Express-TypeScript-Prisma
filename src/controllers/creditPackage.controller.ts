import { NextFunction, Request, Response } from 'express';
import handleErrorAsync from '../middleware/handleErrorAsync';
import { Success, appError, delSuccess } from '../utils/appResponse';
import logger from '../utils/logger';

import { ZodError } from 'zod';
import creditPackageModel from '../models/creditPackage.model';

const getAsyncPublicCreditPackage = handleErrorAsync(async (req: Request, res: Response) => {
  const creditPackages = await creditPackageModel.getAll();
  logger.info(`creditRouter GET: ${req.path}`);
  Success(res, creditPackages);
});

const createAsyncCreditPackage = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, credit_amount, price } = req.body;
    const existingPackage = await creditPackageModel.findByName(name);
    if (existingPackage) {
      return appError(`資料重複`, next, 409);
    }

    logger.info(`creditRouter POST: ${req.path}`);

    const newCreditPackage = await creditPackageModel.create({ name, credit_amount, price });

    Success(res, newCreditPackage, 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return appError(`欄位未填寫正確`, next);
    }
    return next(error);
  }
});

/**
 * 更新 CreditPackage
 */
const updateAsyncCreditPackage = handleErrorAsync(async (req: Request, res: Response) => {
  logger.info(`creditRouter PUT: ${req.path}`);
  await Success(res, { message: 'Update logic not yet implemented.' });
});

const deleteAsyncCreditPackage = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { creditPackageId } = req.params;
  const existingPackage = await creditPackageModel.checkId(creditPackageId);

  if (!existingPackage) {
    return appError(`ID錯誤`, next, 400);
  }

  await creditPackageModel.delete(creditPackageId);
  logger.info(`creditRouter DELETE: ${req.path}`);

  delSuccess(res);
});

/**
 * （管理員用）
 */
const getAdminCreditPackages = (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: [] });
};

/**
 * CreditPackage Controller 物件。
 */
const creditPackageController = {
  getAsyncPublicCreditPackage,
  createAsyncCreditPackage,
  updateAsyncCreditPackage,
  deleteAsyncCreditPackage,
  getAdminCreditPackages,
};

export default creditPackageController;
