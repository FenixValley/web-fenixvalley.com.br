import type { Metadata } from "next";
import Link from "next/link";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";

export const metadata: Metadata = {
  title: "Política de Privacidade | Fênix Valley",
  description:
    "Como o portal Fênix Valley coleta, usa e protege os dados pessoais enviados nos formulários da comunidade, em conformidade com a LGPD."
};

const sections = [
  {
    title: "1. Quais dados coletamos",
    body: "Coletamos apenas os dados que você informa voluntariamente nos formulários do portal: nome, e-mail, telefone (opcional), perfil de participação, área de atuação, disponibilidade e mensagens de texto livre (objetivo ou motivação). No cadastro de organizações para o mapa, coletamos dados institucionais públicos: nome, tipo, segmento, bairro, descrição, site e localização aproximada."
  },
  {
    title: "2. Para que usamos",
    body: "Os dados são usados exclusivamente para operar a comunidade Fênix Valley: entrar em contato sobre sua inscrição, moderar e publicar cadastros aprovados no mapa do ecossistema e organizar ações de voluntariado. Não vendemos nem compartilhamos dados pessoais com terceiros para fins comerciais."
  },
  {
    title: "3. Consentimento",
    body: "Todo envio de formulário exige ação ativa sua. No formulário de voluntariado, o consentimento para uso dos dados é registrado por checkbox obrigatório. Cadastros de organização passam por curadoria antes de qualquer publicação."
  },
  {
    title: "4. Onde os dados ficam",
    body: "Os dados são armazenados em banco de dados gerenciado na infraestrutura da Cloudflare, com acesso restrito aos gestores autenticados da comunidade. As alterações administrativas são registradas em trilha de auditoria."
  },
  {
    title: "5. Seus direitos (LGPD)",
    body: "Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar a qualquer momento a confirmação, o acesso, a correção ou a exclusão dos seus dados pessoais. Basta enviar um e-mail para contato@fenixvalley.com.br com o pedido — responderemos no menor prazo possível."
  },
  {
    title: "6. Cookies",
    body: "O site público não usa cookies de rastreamento ou publicidade. A área administrativa usa um único cookie de sessão, essencial para autenticação dos gestores. A preferência de tema (claro/escuro) é guardada localmente no seu navegador."
  }
];

export default function PrivacyPage() {
  return (
    <EditorialShell>
      <PageHeader
        kicker="Privacidade e LGPD"
        title="Política de Privacidade"
        lede="Transparência faz parte do código de colaboração do Fênix Valley. Esta página explica o que coletamos, por quê, e como exercer seus direitos."
      />

      <section className="relative mx-auto w-full max-w-[820px] px-6 py-16 sm:px-10 sm:py-20">
        <div className="space-y-10">
          {sections.map((section, index) => (
            <EditorialReveal key={section.title} delay={index * 0.06}>
              <article className="space-y-3">
                <h2 className="font-display text-xl font-semibold" style={{ color: "var(--fx-ink)" }}>
                  {section.title}
                </h2>
                <p className="font-body text-[15px] leading-[1.7]" style={{ color: "var(--fx-muted)" }}>
                  {section.body}
                </p>
              </article>
            </EditorialReveal>
          ))}
        </div>

        <EditorialReveal delay={0.2}>
          <p className="mt-12 font-body text-[15px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
            Dúvidas? Escreva para{" "}
            <Link
              href="mailto:contato@fenixvalley.com.br"
              className="underline-offset-4 transition-colors hover:underline"
              style={{ color: "var(--fx-accent)" }}
            >
              contato@fenixvalley.com.br
            </Link>
            .
          </p>
        </EditorialReveal>
      </section>
    </EditorialShell>
  );
}
