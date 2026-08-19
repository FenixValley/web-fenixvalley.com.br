export type SitePageCta = {
  label: string;
  href: string;
  external?: boolean;
};

export type SitePage = {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  sections: { title: string; body: string }[];
  ctas: SitePageCta[];
};

const whatsappUrl = "https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX";

export const sitePages: SitePage[] = [
  {
    slug: "sobre",
    title: "Sobre o Fênix Valley",
    kicker: "Quem somos",
    description:
      "O Fênix Valley é o movimento que conecta pessoas, ideias, instituições e oportunidades para transformar Betim em um polo de inovação, tecnologia e empreendedorismo.",
    sections: [
      {
        title: "Propósito",
        body: "Transformar Betim em um polo de inovação, tecnologia e empreendedorismo, construindo uma economia local mais diversa, tecnológica e colaborativa."
      },
      {
        title: "Missão",
        body: "Conectar pessoas, organizações e oportunidades para estimular o surgimento e o crescimento de negócios inovadores na cidade e na região."
      },
      {
        title: "Visão",
        body: "Tornar Betim referência regional em tecnologia aplicada, startups e desenvolvimento sustentável — uma cidade que renasce pela inovação."
      }
    ],
    ctas: [
      { label: "Conheça o ecossistema", href: "/ecossistema" },
      { label: "Faça parte", href: "/#participar" }
    ]
  },
  {
    slug: "ecossistema",
    title: "O ecossistema",
    kicker: "Como nos organizamos",
    description:
      "A força de Betim precisa circular entre quem cria, aprende, investe e executa. O ecossistema organiza essa rede em pilares e em um mapa vivo de atores.",
    sections: [
      {
        title: "Pilares",
        body: "Empreendedorismo, tecnologia, educação, conexões e impacto local: frentes práticas que transformam talento local em negócios, produtos, empregos e soluções para a cidade."
      },
      {
        title: "Mapa vivo",
        body: "Startups, universidades, empresas, hubs, espaços e poder público aparecem no mapa do ecossistema, com filtros por tipo e cadastro aberto a novas organizações."
      }
    ],
    ctas: [
      { label: "Abrir o mapa do ecossistema", href: "/mapa" },
      { label: "Ver os pilares na home", href: "/#ecossistema" }
    ]
  },
  {
    slug: "empresas",
    title: "Empresas e indústrias",
    kicker: "Inovação corporativa",
    description:
      "Aproximamos empresas, indústrias e grandes organizações de startups, pesquisadores e talentos locais para resolver desafios reais.",
    sections: [
      {
        title: "Inovação aberta",
        body: "Sua empresa traz um desafio — automação, logística, eficiência energética, ESG, indústria 4.0 — e o ecossistema responde com pilotos, provas de conceito e parcerias."
      },
      {
        title: "Acesso a talentos",
        body: "A residência tecnológica e os programas estudantis formam profissionais com experiência prática em projetos reais, prontos para o mercado da região."
      }
    ],
    ctas: [
      { label: "Conhecer a inovação aberta", href: "/programas/inovacao-aberta" },
      { label: "Falar com a coordenação", href: "/contato" }
    ]
  },
  {
    slug: "conteudos",
    title: "Conteúdos",
    kicker: "Aprender com quem constrói",
    description:
      "Notícias, guias, trilhas e histórias dão continuidade à comunidade entre eventos, programas e conexões presenciais.",
    sections: [
      {
        title: "Trilhas de conteúdo",
        body: "Empreendedorismo na prática, tecnologia aplicada e histórias do ecossistema: as trilhas organizam o conteúdo para cada momento da jornada."
      },
      {
        title: "Em construção",
        body: "O blog com notícias, entrevistas, cases e materiais educativos está no roadmap. Por enquanto, as atualizações circulam na home e na comunidade."
      }
    ],
    ctas: [
      { label: "Ver atualizações na home", href: "/#conteudo" },
      { label: "Entrar na comunidade", href: whatsappUrl, external: true }
    ]
  },
  {
    slug: "comunidade",
    title: "Comunidade",
    kicker: "Pessoas antes de tudo",
    description:
      "A comunidade Fênix Valley reúne quem acredita que Betim pode construir uma nova economia baseada em tecnologia, inovação e colaboração.",
    sections: [
      {
        title: "Código de colaboração",
        body: "Respeito, foco em Betim e divulgações alinhadas ao propósito do movimento. Spam, conteúdo ofensivo e autopromoção sem contexto ficam de fora."
      },
      {
        title: "Onde estamos",
        body: "O ponto de encontro digital é o grupo oficial no WhatsApp; os encontros presenciais acontecem nos espaços parceiros e aparecem na agenda."
      }
    ],
    ctas: [
      { label: "Entrar no grupo do WhatsApp", href: whatsappUrl, external: true },
      { label: "Ser voluntário(a)", href: "/voluntarie-se" }
    ]
  },
  {
    slug: "parceiros",
    title: "Parceiros",
    kicker: "Quem sustenta o movimento",
    description:
      "Instituições de ensino, empresas, poder público e organizações de apoio dão legitimidade e força ao Fênix Valley.",
    sections: [
      {
        title: "Categorias de apoio",
        body: "Apoio institucional, tecnológico, acadêmico, empresarial e financeiro — cada parceiro contribui com o que tem de melhor: espaços, mentores, desafios, bolsas ou patrocínio."
      },
      {
        title: "Vitrine de parceiros",
        body: "Os parceiros aparecem na home e, conforme o portal evolui, terão páginas próprias com sua contribuição para o ecossistema."
      }
    ],
    ctas: [
      { label: "Seja um parceiro", href: "/seja-parceiro" },
      { label: "Ver parceiros na home", href: "/#conteudo" }
    ]
  },
  {
    slug: "impacto",
    title: "Impacto",
    kicker: "Transparência",
    description:
      "O Fênix Valley se compromete a divulgar apenas indicadores validados — sem números inflados ou métricas de vaidade.",
    sections: [
      {
        title: "O que vamos medir",
        body: "Startups e organizações no mapa, voluntários ativos, inscrições e turmas dos programas, eventos realizados e conexões geradas — tudo a partir dos dados reais do portal."
      },
      {
        title: "Relatórios",
        body: "Relatórios periódicos de impacto, com depoimentos e cases, serão publicados aqui conforme o movimento gera resultados mensuráveis."
      }
    ],
    ctas: [
      { label: "Acompanhar o ecossistema", href: "/mapa" },
      { label: "Fazer parte", href: "/#participar" }
    ]
  },
  {
    slug: "seja-parceiro",
    title: "Seja um parceiro",
    kicker: "Apoie o movimento",
    description:
      "Sua organização pode acelerar o renascimento de Betim pela inovação: com espaços, mentoria, desafios, tecnologia ou patrocínio.",
    sections: [
      {
        title: "Formas de apoiar",
        body: "Ceder espaços para encontros e turmas, oferecer mentores e especialistas, publicar desafios de inovação aberta, patrocinar eventos e programas ou disponibilizar tecnologia e bolsas."
      },
      {
        title: "Benefícios",
        body: "Conexão direta com startups e talentos da região, presença na vitrine de parceiros, participação nas bancas e demo days e protagonismo na construção do ecossistema."
      },
      {
        title: "Como começar",
        body: "Envie uma mensagem para a coordenação contando como sua organização quer contribuir. Retornamos com uma proposta de parceria adequada ao seu momento."
      }
    ],
    ctas: [
      { label: "Falar com a coordenação", href: "/contato" },
      { label: "Conhecer a inovação aberta", href: "/programas/inovacao-aberta" }
    ]
  },
  {
    slug: "contato",
    title: "Contato",
    kicker: "Fale com o Fênix Valley",
    description:
      "Dúvidas, parcerias, imprensa, eventos ou vontade de participar: estes são os canais oficiais da coordenação.",
    sections: [
      {
        title: "E-mail",
        body: "Escreva para contato@fenixvalley.com.br — respondemos o quanto antes, inclusive pedidos relacionados a dados pessoais (LGPD)."
      },
      {
        title: "Comunidade no WhatsApp",
        body: "Para conversar com a comunidade, divulgar iniciativas alinhadas ao propósito e acompanhar a agenda, entre no grupo oficial."
      },
      {
        title: "Cadastros",
        body: "Para entrar no movimento use o formulário Faça Parte; para aparecer no mapa, cadastre sua organização; para apoiar na operação, voluntarie-se."
      }
    ],
    ctas: [
      { label: "contato@fenixvalley.com.br", href: "mailto:contato@fenixvalley.com.br", external: true },
      { label: "Grupo no WhatsApp", href: whatsappUrl, external: true },
      { label: "Faça parte", href: "/faca-parte" }
    ]
  }
];

export function getSitePage(slug: string): SitePage | undefined {
  return sitePages.find((page) => page.slug === slug);
}
