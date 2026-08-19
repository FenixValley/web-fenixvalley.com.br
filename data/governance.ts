export type GovernanceBody = {
  title: string;
  role: string;
  responsibilities: string[];
};

export type GovernancePolicy = {
  title: string;
  description: string;
  href: string;
};

/**
 * Estrutura de governança do movimento. A composição nominal (nomes de quem ocupa cada
 * instância) é publicada pela coordenação conforme cada colegiado é formalizado — aqui
 * ficam apenas os papéis e responsabilidades já acordados.
 */
export const governanceBodies: GovernanceBody[] = [
  {
    title: "Coordenação executiva",
    role: "Conduz o dia a dia do movimento",
    responsibilities: [
      "Executar a agenda de programas, eventos e chamadas do ecossistema.",
      "Fazer a curadoria de cadastros, desafios, oportunidades e parcerias publicados no portal.",
      "Responder pelos canais oficiais e pelos pedidos relacionados a dados pessoais."
    ]
  },
  {
    title: "Conselho consultivo",
    role: "Orienta as prioridades de médio prazo",
    responsibilities: [
      "Recomendar frentes prioritárias para o ecossistema de Betim e região.",
      "Avaliar os resultados apurados e a coerência entre discurso e prática do movimento.",
      "Indicar conexões institucionais com poder público, academia e iniciativa privada."
    ]
  },
  {
    title: "Comitê de curadoria",
    role: "Zela pelo que entra no portal",
    responsibilities: [
      "Aprovar ou recusar organizações, eventos, desafios e oportunidades submetidos.",
      "Aplicar o código de conduta em casos de conteúdo fora do propósito do movimento.",
      "Revisar indicadores antes da publicação na página de impacto."
    ]
  },
  {
    title: "Voluntariado",
    role: "Sustenta a operação",
    responsibilities: [
      "Apoiar produção de eventos, comunicação, tecnologia e relacionamento com a comunidade.",
      "Levar demandas da base para a coordenação.",
      "Participar das frentes de trabalho abertas a cada ciclo."
    ]
  }
];

export const governancePolicies: GovernancePolicy[] = [
  {
    title: "Política de privacidade e LGPD",
    description:
      "Quais dados o portal coleta, por que coleta, por quanto tempo guarda e como exercer os direitos previstos na LGPD.",
    href: "/privacidade"
  },
  {
    title: "Termos de uso",
    description:
      "Regras de uso do portal, responsabilidades de quem publica conteúdo e limites de responsabilidade do movimento.",
    href: "/termos"
  },
  {
    title: "Política de cookies",
    description: "O que o site guarda no navegador e para quê — sem rastreamento publicitário.",
    href: "/cookies"
  },
  {
    title: "Código de conduta",
    description:
      "O comportamento esperado nos canais, eventos e programas do movimento, e como relatar uma violação.",
    href: "/codigo-de-conduta"
  },
  {
    title: "Política de publicação de conteúdos",
    description:
      "Critérios de curadoria para cadastros, eventos, desafios, oportunidades e parcerias publicados no portal.",
    href: "/politica-de-conteudo"
  }
];

export const accountabilityCommitments: string[] = [
  "Publicar na página de impacto apenas indicadores apurados, com fonte e período declarados.",
  "Registrar cada parceria e patrocínio na vitrine pública de parceiros, com a contribuição descrita.",
  "Manter o histórico de moderação do portal auditável pela coordenação.",
  "Divulgar relatórios periódicos de atividades e resultados a cada ciclo fechado."
];
