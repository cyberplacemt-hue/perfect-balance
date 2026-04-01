import { Router, type IRouter } from "express";
import { SubmitContactBody } from "@workspace/api-zod";
import nodemailer from "nodemailer";

const router: IRouter = Router();

function createTransport() {
  const host = process.env.MAIL_SMTP_HOST ?? "smtp.mail.ru";
  const port = parseInt(process.env.MAIL_SMTP_PORT ?? "465", 10);
  const user = process.env.MAIL_SMTP_USER;
  const pass = process.env.MAIL_SMTP_PASS;

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: { user, pass: pass.replace(/\s/g, "") },
  });
}

async function sendContactEmail(data: any): Promise<void> {
  const transport = createTransport();
  if (!transport) {
    console.warn("MAIL_SMTP_USER or MAIL_SMTP_PASS not set — contact email not sent");
    return;
  }

  const now = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
  const user = process.env.MAIL_SMTP_USER!;

  const text = `
Новая заявка с сайта БУЛАТ («Свяжитесь с нами»)
Дата и время: ${now} (МСК)

Имя: ${data.name}
Телефон: ${data.phone}
Email: ${data.email || "не указан"}
Тип клиента: ${data.clientType || "не указан"}
Сообщение: ${data.message}
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"/><title>Новая заявка</title></head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:Arial,sans-serif;color:#e0e0e0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:40px auto;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:8px;overflow:hidden;">
    <tr>
      <td style="background:#111;padding:20px 28px;border-bottom:2px solid #c8a84b;">
        <span style="font-size:20px;font-weight:bold;color:#c8a84b;letter-spacing:2px;">БУЛАТ</span>
        <span style="font-size:13px;color:#999;margin-left:14px;">Новая заявка с сайта</span>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 28px;">
        <p style="margin:0 0 18px;color:#999;font-size:13px;">Дата и время: ${now} (МСК)</p>

        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2a2a2a;border-radius:6px;overflow:hidden;">
          <tr style="background:#111;">
            <td colspan="2" style="padding:10px 12px;color:#c8a84b;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Данные заявки</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#999;font-size:13px;width:38%;">Имя</td>
            <td style="padding:8px 12px;font-size:13px;">${data.name}</td>
          </tr>
          <tr style="background:#111;">
            <td style="padding:8px 12px;color:#999;font-size:13px;">Телефон</td>
            <td style="padding:8px 12px;font-size:13px;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#999;font-size:13px;">Email</td>
            <td style="padding:8px 12px;font-size:13px;">${data.email || "<em style='color:#555'>не указан</em>"}</td>
          </tr>
          <tr style="background:#111;">
            <td style="padding:8px 12px;color:#999;font-size:13px;">Тип клиента</td>
            <td style="padding:8px 12px;font-size:13px;">${data.clientType || "<em style='color:#555'>не указан</em>"}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#999;font-size:13px;vertical-align:top;">Сообщение</td>
            <td style="padding:8px 12px;font-size:13px;line-height:1.5;">${data.message.replace(/\n/g, "<br>")}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 28px;border-top:1px solid #2a2a2a;text-align:center;color:#555;font-size:12px;">
        БУЛАТ · podkovamsk@mail.ru
      </td>
    </tr>
  </table>
</body>
</html>`;

  await transport.sendMail({
    from: `"БУЛАТ" <${user}>`,
    to: user,
    subject: `Новая заявка с сайта — ${data.name}`,
    text,
    html,
  });
}

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  req.log.info({ contact: parsed.data }, "New contact form submission");

  sendContactEmail(parsed.data).catch((err) =>
    console.error("Contact email send failed:", err)
  );

  res.json({
    message: "Ваше сообщение получено. Мы свяжемся с вами в ближайшее время!",
  });
});

export default router;
