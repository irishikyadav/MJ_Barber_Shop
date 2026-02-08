import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, date, time, price, duration } = body

    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const shopOwnerEmail = process.env.SHOP_OWNER_EMAIL

    // Email to shop owner
    if (shopOwnerEmail) {
      await resend.emails.send({
        from: "MJ's Barber Shop <onboarding@resend.dev>",
        to: shopOwnerEmail,
        subject: `New Booking Request - ${name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #f5f0e8; padding: 0;">
            <div style="background: #1a1612; padding: 24px 32px;">
              <h1 style="color: #d4a853; margin: 0; font-size: 24px;">New Booking Request</h1>
            </div>
            <div style="padding: 32px;">
              <p style="color: #4a4035; font-size: 16px; margin-bottom: 24px;">
                A new booking request has been submitted through the website.
              </p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 16px; background: #ebe5d9; font-weight: bold; color: #1a1612; width: 140px;">Customer</td>
                  <td style="padding: 12px 16px; background: #ebe5d9; color: #1a1612;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-weight: bold; color: #1a1612;">Email</td>
                  <td style="padding: 12px 16px; color: #1a1612;"><a href="mailto:${email}" style="color: #d4a853;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; background: #ebe5d9; font-weight: bold; color: #1a1612;">Phone</td>
                  <td style="padding: 12px 16px; background: #ebe5d9; color: #1a1612;"><a href="tel:${phone}" style="color: #d4a853;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-weight: bold; color: #1a1612;">Service</td>
                  <td style="padding: 12px 16px; color: #1a1612;">${service} (${price})</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; background: #ebe5d9; font-weight: bold; color: #1a1612;">Duration</td>
                  <td style="padding: 12px 16px; background: #ebe5d9; color: #1a1612;">${duration}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-weight: bold; color: #1a1612;">Date</td>
                  <td style="padding: 12px 16px; color: #1a1612;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; background: #ebe5d9; font-weight: bold; color: #1a1612;">Time</td>
                  <td style="padding: 12px 16px; background: #ebe5d9; color: #1a1612;">${time}</td>
                </tr>
              </table>
              <p style="color: #8a8070; font-size: 13px; margin-top: 24px;">
                Please confirm this appointment by contacting the customer.
              </p>
            </div>
            <div style="background: #1a1612; padding: 16px 32px; text-align: center;">
              <p style="color: #8a8070; font-size: 12px; margin: 0;">MJ's Barber Shop &bull; Old County Hotel, Napier</p>
            </div>
          </div>
        `,
      })
    }

    // Confirmation email to customer
    await resend.emails.send({
      from: "MJ's Barber Shop <onboarding@resend.dev>",
      to: email,
      subject: `Booking Confirmation - MJ's Barber Shop`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #f5f0e8; padding: 0;">
          <div style="background: #1a1612; padding: 24px 32px;">
            <h1 style="color: #d4a853; margin: 0; font-size: 24px;">MJ's Barber Shop</h1>
            <p style="color: #c4b99a; margin: 4px 0 0; font-size: 14px;">Booking Confirmation</p>
          </div>
          <div style="padding: 32px;">
            <p style="color: #1a1612; font-size: 18px; font-weight: bold; margin-bottom: 4px;">
              Hi ${name},
            </p>
            <p style="color: #4a4035; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
              Thank you for your booking request. Here are your appointment details:
            </p>
            <div style="background: #ebe5d9; padding: 24px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a1612; font-size: 14px; width: 100px;">Service</td>
                  <td style="padding: 8px 0; color: #1a1612; font-size: 14px;">${service}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a1612; font-size: 14px;">Price</td>
                  <td style="padding: 8px 0; color: #d4a853; font-weight: bold; font-size: 14px;">${price}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a1612; font-size: 14px;">Duration</td>
                  <td style="padding: 8px 0; color: #1a1612; font-size: 14px;">${duration}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a1612; font-size: 14px;">Date</td>
                  <td style="padding: 8px 0; color: #1a1612; font-size: 14px;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a1612; font-size: 14px;">Time</td>
                  <td style="padding: 8px 0; color: #1a1612; font-size: 14px;">${time}</td>
                </tr>
              </table>
            </div>
            <div style="background: #1a1612; padding: 20px; text-align: center; margin-bottom: 24px;">
              <p style="color: #f5f0e8; font-size: 14px; margin: 0 0 8px;">Need to change or cancel?</p>
              <a href="tel:068354580" style="color: #d4a853; font-size: 18px; font-weight: bold; text-decoration: none;">
                Call 06 835 4580
              </a>
            </div>
            <div style="border-top: 1px solid #d5cdbf; padding-top: 16px;">
              <p style="color: #8a8070; font-size: 13px; line-height: 1.5; margin: 0;">
                <strong style="color: #4a4035;">Location:</strong> Old County Hotel, 212 Emerson Street, Napier 4110<br/>
                <strong style="color: #4a4035;">Hours:</strong> Mon-Fri 8am-5:30pm &bull; Sat 8am-3pm &bull; Sun Closed
              </p>
            </div>
          </div>
          <div style="background: #1a1612; padding: 16px 32px; text-align: center;">
            <p style="color: #8a8070; font-size: 12px; margin: 0;">MJ's Barber Shop &bull; Napier, New Zealand</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Booking email error:", error)
    return NextResponse.json(
      { error: "Failed to send booking confirmation" },
      { status: 500 }
    )
  }
}
