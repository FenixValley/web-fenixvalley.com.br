import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(3, "Informe seu nome completo."),
  email: z.string().email("Informe um e-mail válido."),
  profile: z.string().min(2, "Escolha seu perfil."),
  objective: z.string().min(10, "Conte em uma frase como quer participar.")
});

export type LeadInput = z.infer<typeof leadSchema>;
