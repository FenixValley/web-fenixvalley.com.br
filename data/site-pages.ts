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
    slug: "startups",
    title: "Startups",
    kicker: "Para quem constrói",
    description:
      "O portal é vitrine das startups e dos empreendedores de Betim e região: presença no mapa, conexão com programas e acesso a oportunidades.",
    sections: [
      {
        title: "Apareça no mapa",
        body: "Cadastre sua startup no mapa do ecossistema para ser encontrada por empresas, investidores, mentores e talentos. O cadastro passa por curadoria antes da publicação."
      },
      {
        title: "Evolua com os programas",
        body: "Da pré-aceleração à aceleração, os programas dão ritmo à jornada: validação, tração, conexões com mercado e preparação para investimento."
      },
      {
        title: "Catálogo completo",
        body: "Um catálogo de startups com filtros por segmento, estágio e tecnologia está no roadmap do portal e será construído sobre os cadastros aprovados do mapa."
      }
    ],
    ctas: [
      { label: "Cadastrar startup no mapa", href: "/mapa" },
      { label: "Conhecer os programas", href: "/programas" }
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
    slug: "universidades",
    title: "Universidades e escolas técnicas",
    kicker: "Educação e pesquisa",
    description:
      "Universidades, escolas técnicas e estudantes conectados a oportunidades reais de inovação, pesquisa aplicada e mercado.",
    sections: [
      {
        title: "Instituições parceiras",
        body: "Instituições de ensino participam do mapa do ecossistema, conectam laboratórios e pesquisadores a desafios de empresas e levam seus estudantes aos programas."
      },
      {
        title: "Para estudantes",
        body: "Trilhas de capacitação, hackathons, residência tecnológica e conexão com estágios e vagas: a porta de entrada dos estudantes para o ecossistema."
      }
    ],
    ctas: [
      { label: "Programas para estudantes", href: "/programas/programas-estudantis" },
      { label: "Residência tecnológica", href: "/programas/residencia-tecnologica" }
    ]
  },
  {
    slug: "mentores",
    title: "Mentores",
    kicker: "Quem ajuda a construir",
    description:
      "Mentores e mentoras compartilham experiência com empreendedores, startups e estudantes em formação — uma das contribuições mais valiosas para o ecossistema.",
    sections: [
      {
        title: "Como funciona",
        body: "Mentorias acontecem dentro dos programas (pré-aceleração, aceleração, residência) e em encontros da comunidade, com temas que vão de produto e vendas a carreira e gestão."
      },
      {
        title: "Seja mentor(a)",
        body: "Profissionais com experiência em tecnologia, negócios, marketing, finanças ou gestão podem se voluntariar para mentorar. A coordenação faz a curadoria e a conexão com os projetos."
      }
    ],
    ctas: [
      { label: "Quero ser mentor(a)", href: "/voluntarie-se" },
      { label: "Entrar na comunidade", href: whatsappUrl, external: true }
    ]
  },
  {
    slug: "investidores",
    title: "Investidores",
    kicker: "Capital para a nova economia",
    description:
      "Conectamos investidores-anjo, fundos e veículos de investimento às startups de Betim e região que estão construindo negócios com tração.",
    sections: [
      {
        title: "Acesso ao dealflow",
        body: "Os programas de aceleração e os demo days aproximam investidores de startups preparadas, com métricas organizadas e teses claras."
      },
      {
        title: "Participe",
        body: "Investidores interessados em acompanhar o ecossistema podem entrar em contato com a coordenação para participar de bancas, demo days e conexões diretas."
      }
    ],
    ctas: [
      { label: "Falar com a coordenação", href: "/contato" },
      { label: "Ver oportunidades", href: "/oportunidades" }
    ]
  },
  {
    slug: "espacos",
    title: "Espaços de inovação",
    kicker: "Onde as coisas acontecem",
    description:
      "Coworkings, laboratórios, hubs e espaços públicos e privados que recebem os encontros, programas e projetos do ecossistema.",
    sections: [
      {
        title: "No mapa",
        body: "Os espaços de inovação de Betim aparecem no mapa do ecossistema com tipo, localização e descrição — e novos espaços podem se cadastrar."
      },
      {
        title: "Ceda seu espaço",
        body: "Organizações que queiram receber eventos, mentorias ou turmas de programas podem oferecer seus espaços à comunidade pelo formulário de contato."
      }
    ],
    ctas: [
      { label: "Ver espaços no mapa", href: "/mapa" },
      { label: "Oferecer um espaço", href: "/contato" }
    ]
  },
  {
    slug: "eventos",
    title: "Eventos",
    kicker: "Agenda do ecossistema",
    description:
      "Meetups, palestras, workshops, hackathons e demo days mantêm a comunidade viva e conectada ao longo do ano.",
    sections: [
      {
        title: "Agenda aberta",
        body: "Os próximos encontros, mentorias e chamadas aparecem na agenda de oportunidades do portal e são divulgados na comunidade do WhatsApp."
      },
      {
        title: "Divulgue seu evento",
        body: "Organizadores podem divulgar eventos alinhados ao propósito do movimento. A agenda completa com calendário, inscrição e filtros está no roadmap do portal."
      }
    ],
    ctas: [
      { label: "Ver a agenda aberta", href: "/oportunidades" },
      { label: "Divulgar um evento", href: "/contato" }
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
