import { Router } from 'express';
import creditPackageController from '../../controllers/creditPackage.controller';
import { validateData } from '../../middleware/validateRequest';
import { creditPackageSchema, delParams } from '../../schema/creditPackageSchema';

const creditPackageRouter = Router();
/**
 * GET /
 * 取得所有 CreditPackage
 */
creditPackageRouter.get('/', creditPackageController.getAsyncPublicCreditPackage);
/**
 * POST /
 * 新增一筆 CreditPackage 資料。
 */
creditPackageRouter.post(
  '/',
  validateData(creditPackageSchema, 'body'),
  creditPackageController.createAsyncCreditPackage,
);
/**
 * DELETE /
 * 刪除指定 ID 的 CreditPackage
 */
creditPackageRouter.delete(
  '/:creditPackageId',
  validateData(delParams, 'params'),
  creditPackageController.deleteAsyncCreditPackage,
);

export default creditPackageRouter;
