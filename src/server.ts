import express, { Request, Response } from "express";
import sequelize from "./config/database";
import History from "./models/History";

const app = express();
app.use(express.json());

sequelize.sync().then(() => {
  console.log("Database synced");
});

app.post("/history", async (req: Request, res: Response) => {
  const { action, shopId, plu, date } = req.body;
  try {
    const history = await History.create({ action, shopId, plu, date });
    res.status(201).json(history);
  } catch (err: unknown | any) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/history", async (req: Request, res: Response) => {
  const {
    shopId,
    plu,
    action,
    dateFrom,
    dateTo,
    page = 1,
    limit = 10,
  } = req.query;

  const where: any = {};
  if (shopId) where.shopId = shopId;
  if (plu) where.plu = plu;
  if (action) where.action = action;
  if (dateFrom) where.date = { $gte: new Date(dateFrom as string) };
  if (dateTo) where.date = { ...where.date, $lte: new Date(dateTo as string) };

  const offset = (Number(page) - 1) * Number(limit);

  try {
    const history = await History.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
    });
    res.json({
      data: history.rows,
      total: history.count,
      page: Number(page),
      totalPages: Math.ceil(history.count / Number(limit)),
    });
  } catch (err: unknown | any) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`History service is running on port ${PORT}`);
});
