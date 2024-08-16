import { SmtpConfigSchema } from './schema/smtp-config.schema';

export function getSMTPConfiguration() {
  const data = SmtpConfigSchema.parse({
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    host: process.env.NEXT_PUBLIC_EMAIL_HOST,
    port: Number(process.env.NEXT_PUBLIC_EMAIL_PORT),
    secure: process.env.NEXT_PUBLIC_EMAIL_TLS !== 'false',
  });


  return {
    host: data.host,
    port: data.port,
    secure: data.secure,
    auth: {
      user: data.user,
      pass: data.pass,
    },
  };
}
