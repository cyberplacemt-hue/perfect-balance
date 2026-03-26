import { Router, type IRouter } from "express";
import { SubmitContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  req.log.info({ contact: parsed.data }, "New contact form submission");

  res.json({
    message: "Ваше сообщение получено. Мы свяжемся с вами в ближайшее время!",
  });
});

export default router;
