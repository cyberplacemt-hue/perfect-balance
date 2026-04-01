import { Router, type IRouter } from "express";
import { CreateOrderBody } from "@workspace/api-zod";
import { randomUUID } from "crypto";
import nodemailer from "nodemailer";

const router: IRouter = Router();

function createTransport() {
  const host = process.env.MAIL_SMTP_HOST ?? "smtp.mail.ru";
  const port = parseInt(process.env.MAIL_SMTP_PORT ?? "465", 10);
  const user = process.env.MAIL_SMTP_USER;
  const pass = process.env.MAIL_SMTP_PASS;

  if (!user || !pass) return null;

  const cleanPass = pass.replace(/\s/g, "");

  return nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: { user, pass: cleanPass },
  });
}

async function sendOrderEmail(orderId: string, data: any): Promise<void> {
  const transport = createTransport();
  if (!transport) {
    console.warn("MAIL_SMTP_USER or MAIL_SMTP_PASS not set — email not sent");
    return;
  }

  const now = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

  const itemsText = (data.items ?? [])
    .map((item: any) =>
      `  • ${item.name} × ${item.qty} = ${(item.price * item.qty).toLocaleString("ru-RU")} ₽`
    )
    .join("\n");

  const itemsHtml = (data.items ?? [])
    .map(
      (item: any) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;">${item.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;text-align:center;">${item.qty}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;text-align:right;">${(item.price * item.qty).toLocaleString("ru-RU")} ₽</td>
        </tr>`
    )
    .join("");

  const text = `
Новый заказ с сайта БУЛАТ
Заказ #${orderId}
Дата и время: ${now} (МСК)

КОНТАКТНЫЕ ДАННЫЕ
ФИО: ${data.name}
Телефон: ${data.phone}
Email: ${data.email}
Город: ${data.city}
Адрес: ${data.address}
Транспортная компания: ${data.transportCompany}

СОСТАВ ЗАКАЗА
${itemsText}

Итого: ${(data.total ?? 0).toLocaleString("ru-RU")} ₽
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"/><title>Новый заказ</title></head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:Arial,sans-serif;color:#e0e0e0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:8px;overflow:hidden;">
    <tr>
      <td style="background:#111;padding:24px 32px;border-bottom:2px solid #c8a84b;">
        <span style="font-size:22px;font-weight:bold;color:#c8a84b;letter-spacing:2px;">БУЛАТ</span>
        <span style="font-size:14px;color:#999;margin-left:16px;">Новый заказ с сайта</span>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 32px;">
        <p style="margin:0 0 4px;color:#c8a84b;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Заказ #${orderId}</p>
        <p style="margin:0 0 24px;color:#999;font-size:13px;">Дата и время: ${now} (МСК)</p>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid #2a2a2a;border-radius:6px;overflow:hidden;">
          <tr style="background:#111;">
            <td colspan="2" style="padding:10px 12px;color:#c8a84b;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Контактные данные</td>
          </tr>
          <tr><td style="padding:8px 12px;color:#999;font-size:13px;width:42%;">ФИО</td><td style="padding:8px 12px;font-size:13px;">${data.name}</td></tr>
          <tr style="background:#111;"><td style="padding:8px 12px;color:#999;font-size:13px;">Телефон</td><td style="padding:8px 12px;font-size:13px;">${data.phone}</td></tr>
          <tr><td style="padding:8px 12px;color:#999;font-size:13px;">Email</td><td style="padding:8px 12px;font-size:13px;">${data.email}</td></tr>
          <tr style="background:#111;"><td style="padding:8px 12px;color:#999;font-size:13px;">Город</td><td style="padding:8px 12px;font-size:13px;">${data.city}</td></tr>
          <tr><td style="padding:8px 12px;color:#999;font-size:13px;">Адрес</td><td style="padding:8px 12px;font-size:13px;">${data.address}</td></tr>
          <tr style="background:#111;"><td style="padding:8px 12px;color:#999;font-size:13px;">Транспортная компания</td><td style="padding:8px 12px;font-size:13px;">${data.transportCompany}</td></tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2a2a2a;border-radius:6px;overflow:hidden;">
          <tr style="background:#111;">
            <th style="padding:10px 12px;color:#c8a84b;font-size:12px;text-transform:uppercase;letter-spacing:1px;text-align:left;">Товар</th>
            <th style="padding:10px 12px;color:#c8a84b;font-size:12px;text-align:center;">Кол-во</th>
            <th style="padding:10px 12px;color:#c8a84b;font-size:12px;text-align:right;">Сумма</th>
          </tr>
          ${itemsHtml}
          <tr style="background:#111;">
            <td colspan="2" style="padding:12px;font-weight:bold;font-size:15px;color:#fff;">Итого:</td>
            <td style="padding:12px;font-weight:bold;font-size:15px;color:#c8a84b;text-align:right;">${(data.total ?? 0).toLocaleString("ru-RU")} ₽</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px;border-top:1px solid #2a2a2a;text-align:center;color:#555;font-size:12px;">
        БУЛАТ · podkovamsk@mail.ru
      </td>
    </tr>
  </table>
</body>
</html>`;

  const user = process.env.MAIL_SMTP_USER!;

  await transport.sendMail({
    from: `"БУЛАТ" <${user}>`,
    to: user,
    subject: `Новый заказ с сайта #${orderId}`,
    text,
    html,
  });
}

router.post("/order", async (req, res): Promise<void> => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const orderId = randomUUID().slice(0, 8).toUpperCase();

  req.log.info({ orderId, order: parsed.data }, "New order received");

  sendOrderEmail(orderId, parsed.data).catch((err) =>
    console.error("Email send failed:", err)
  );

  res.status(201).json({
    orderId,
    message: `Заказ #${orderId} принят. Мы свяжемся с вами в ближайшее время.`,
  });
});

export default router;
