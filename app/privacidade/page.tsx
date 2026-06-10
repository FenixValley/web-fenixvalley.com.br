import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

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
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative max-w-3xl space-y-10">
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">
                Privacidade e LGPD
              </p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                Política de Privacidade
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Transparência faz parte do código de colaboração do Fênix Valley. Esta página explica
                o que coletamos, por quê, e como exercer seus direitos.
              </p>
            </div>
            <div className="space-y-8">
              {sections.map((section) => (
                <article key={section.title} className="space-y-2">
                  <h2 className="font-[var(--font-space)] text-xl font-bold text-white">{section.title}</h2>
                  <p className="text-sm leading-7 text-slate-300">{section.body}</p>
                </article>
              ))}
            </div>
            <p className="text-sm leading-6 text-slate-400">
              Dúvidas? Escreva para{" "}
              <Link href="mailto:contato@fenixvalley.com.br" className="text-orange-300 hover:text-orange-200">
                contato@fenixvalley.com.br
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
