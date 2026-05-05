"use server";

import { contactSchema, type ContactFormState } from "@/lib/schemas";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContact(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // 1. Parse raw form data
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  // 2. Validate with Zod
  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
    };
  }

  // 3. Send email via Resend
  try {
    const { data } = result;

    await resend.emails.send({
      from: `Portfolio Contact <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
      to: [process.env.CONTACT_EMAIL || "your-email@example.com"],
      subject: `[Portfolio] ${data.subject}`,
      replyTo: data.email,
      text: `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
      `.trim(),
      html: `
        <div style="font-family: monospace; background: #030014; color: #e8e8ff; padding: 2rem; border-radius: 12px;">
          <h2 style="color: #00f0ff; margin-bottom: 1.5rem;">📡 New Signal Received</h2>
          <div style="border-left: 2px solid #00f0ff; padding-left: 1rem; margin-bottom: 1rem;">
            <p><strong style="color: #8888aa;">Name:</strong> ${data.name}</p>
            <p><strong style="color: #8888aa;">Email:</strong> ${data.email}</p>
            <p><strong style="color: #8888aa;">Subject:</strong> ${data.subject}</p>
          </div>
          <div style="background: rgba(0,240,255,0.05); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
            <p style="color: #8888aa; margin-bottom: 0.5rem;">Message:</p>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
      `.trim(),
    });

    return {
      success: true,
      errors: null,
      message: "Signal transmitted successfully! I'll respond soon.",
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      errors: null,
      message: "Transmission failed. Please try again later.",
    };
  }
}
