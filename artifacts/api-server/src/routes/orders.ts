import { Router, type IRouter } from "express";
import { CreateOrderBody } from "@workspace/api-zod";
import { randomUUID } from "crypto";

const router: IRouter = Router();

router.post("/order", async (req, res): Promise<void> => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const orderId = randomUUID().slice(0, 8).toUpperCase();

  req.log.info(
    { orderId, order: parsed.data },
    "New order received"
  );

  res.status(201).json({
    orderId,
    message: `Заказ #${orderId} принят. Мы свяжемся с вами в ближайшее время.`,
  });
});

export default router;
