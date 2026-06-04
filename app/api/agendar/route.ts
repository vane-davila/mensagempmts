import { Resend } from "resend"

export async function POST(req: Request) {
  try {
    const { date } = await req.json()

    if (!date || typeof date !== "string") {
      return Response.json({ error: "Data inválida." }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.NOTIFY_EMAIL

    if (!apiKey || !to) {
      return Response.json(
        { error: "Configuração de e-mail ausente." },
        { status: 500 },
      )
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: "Agendamento <onboarding@resend.dev>",
      to,
      subject: "💗 Ele agendou a visita!",
      html: `
        <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 24px; background: #fff5f5; border-radius: 16px; color: #5a1f24;">
          <h1 style="font-size: 22px; margin: 0 0 12px;">Ele marcou o dia! 💗</h1>
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
            Boa notícia: ele escolheu o dia para vir te ver.
          </p>
          <div style="background: #ffe0e3; border-radius: 12px; padding: 16px; text-align: center; font-size: 18px; font-weight: bold; text-transform: capitalize;">
            ${date}
          </div>
          <p style="font-size: 14px; line-height: 1.6; margin: 16px 0 0; color: #8a4a4f;">
            Já pode começar a se arrumar. 😊
          </p>
        </div>
      `,
    })

    return Response.json({ ok: true })
  } catch (err) {
    console.log("[v0] erro ao enviar e-mail:", err)
    return Response.json({ error: "Falha ao enviar e-mail." }, { status: 500 })
  }
}
