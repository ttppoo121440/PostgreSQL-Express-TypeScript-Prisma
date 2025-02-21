import request from 'supertest';
import express, { Application } from 'express';
import { describe, it, beforeAll, afterAll, beforeEach } from '@jest/globals';
import Router from '../src/routers/index';
import prisma from '../src/prisma';
import errorHandler from '../src/utils/errorHandler';

const app: Application = express();
app.use(express.json());
app.use('/v1/api', Router);
app.use(errorHandler);

describe('Credit Package API', () => {
  beforeAll(async () => {
    // 清空資料庫中的 creditPackage 資料表
    await prisma.creditPackage.deleteMany();
  });

  afterAll(async () => {
    // 關閉 Prisma 連接
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // 每個測試前清空資料庫中的 creditPackage 資料表
    await prisma.creditPackage.deleteMany();
  });

  /**
   * 測試 POST /v1/api/credit-package
   */
  describe('POST /v1/api/credit-package', () => {
    it('新增一筆credit package資料', async () => {
      const res = await request(app).post('/v1/api/credit-package').send({
        name: '7堂組合包方案',
        credit_amount: 7,
        price: 1400,
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.name).toBe('7堂組合包方案');
    });

    it('應該回傳 400，因為缺少必填欄位', async () => {
      const res = await request(app).post('/v1/api/credit-package').send({
        name: 'VIP 套餐',
      });
      expect(res.status).toBe(400);
      console.log('POST /v1/api/credit-package', res.body);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('credit_amount 為必填');
    });
  });

  /**
   * 測試 GET /v1/api/credit-package
   */
  describe('GET /v1/api/credit-package', () => {
    it('讀取清單', async () => {
      const res = await request(app).get('/v1/api/credit-package');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
});
