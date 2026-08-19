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
    slug: "termos",
    title: "Termos de uso",
    kicker: "Regras do portal",
    description:
      "Condições de uso do portal do Fênix Valley, responsabilidades de quem publica conteúdo e limites de responsabilidade do movimento.",
    sections: [
      {
        title: "Uso do portal",
        body: "O portal é aberto e gratuito. Ao navegar, cadastrar uma organização, enviar um evento, um desafio ou uma proposta, você concorda com estes termos e com o código de conduta do movimento."
      },
      {
        title: "Conteúdo enviado por terceiros",
        body: "Quem envia é responsável pela veracidade das informações e por ter autorização para publicá-las. A curadoria pode recusar, editar ou remover conteúdo fora do propósito do movimento, sem aviso prévio."
      },
      {
        title: "Conexões entre participantes",
        body: "O Fênix Valley aproxima empresas, startups, instituições e talentos, mas não é parte dos contratos, negociações ou resultados dessas conexões. Acordos firmados entre participantes são de responsabilidade deles."
      },
      {
        title: "Disponibilidade e mudanças",
        body: "O portal pode passar por manutenções e evoluções. Alterações relevantes nestes termos são publicadas nesta página, com a data da revisão."
      }
    ],
    ctas: [
      { label: "Ver a governança do movimento", href: "/governanca" },
      { label: "Falar com a coordenação", href: "/contato" }
    ]
  },
  {
    slug: "cookies",
    title: "Política de cookies",
    kicker: "O que guardamos no seu navegador",
    description:
      "O portal usa o mínimo necessário de armazenamento local para funcionar. Não há rastreamento publicitário nem venda de dados de navegação.",
    sections: [
      {
        title: "Preferências de interface",
        body: "A escolha entre tema escuro e claro fica salva no seu próprio navegador (localStorage), apenas para que o site abra do jeito que você prefere. Esse dado não sai do seu dispositivo."
      },
      {
        title: "Sessão do painel administrativo",
        body: "Gestores autenticados recebem um cookie de sessão necessário para manter o login do painel. Sair do painel apaga o cookie do navegador; o token de sessão em si tem validade de 30 dias. Ele não é usado para rastrear navegação no site público."
      },
      {
        title: "Sem rastreadores de terceiros",
        body: "Não usamos cookies de publicidade nem perfis de comportamento. Serviços externos acionados a partir do site, como mapas e vídeos incorporados, seguem as próprias políticas dos seus provedores."
      },
      {
        title: "Como limpar",
        body: "Você pode apagar o armazenamento local e os cookies deste site a qualquer momento pelas configurações do navegador, sem perder acesso a nenhuma funcionalidade pública."
      }
    ],
    ctas: [
      { label: "Ler a política de privacidade", href: "/privacidade" },
      { label: "Ver a governança", href: "/governanca" }
    ]
  },
  {
    slug: "codigo-de-conduta",
    title: "Código de conduta",
    kicker: "Como convivemos",
    description:
      "O que se espera de quem participa dos canais, eventos e programas do Fênix Valley — e o que fazer quando algo sai do combinado.",
    sections: [
      {
        title: "Princípios",
        body: "Respeito às pessoas, foco no desenvolvimento de Betim e da região, colaboração acima da disputa e generosidade com quem está começando. Todo mundo é bem-vindo, independentemente de origem, gênero, raça, religião, orientação sexual ou deficiência."
      },
      {
        title: "Não é tolerado",
        body: "Assédio, discriminação, ataque pessoal, discurso de ódio, spam, autopromoção sem contexto, uso indevido de dados de outros participantes e divulgação de conteúdo ilegal ou desalinhado ao propósito do movimento."
      },
      {
        title: "Nos eventos e programas",
        body: "As mesmas regras valem nos encontros presenciais, nas turmas dos programas e nos espaços dos parceiros. A organização pode encerrar a participação de quem descumprir o código."
      },
      {
        title: "Como relatar",
        body: "Relatos podem ser enviados à coordenação pelos canais oficiais de contato. Cada caso é tratado com confidencialidade e respondido pela coordenação junto ao comitê de curadoria."
      }
    ],
    ctas: [
      { label: "Falar com a coordenação", href: "/contato" },
      { label: "Ver a governança", href: "/governanca" }
    ]
  },
  {
    slug: "politica-de-conteudo",
    title: "Política de publicação de conteúdos",
    kicker: "Critérios de curadoria",
    description:
      "O que entra no portal, como a curadoria avalia cada envio e por que alguns conteúdos são recusados.",
    sections: [
      {
        title: "O que publicamos",
        body: "Organizações do ecossistema, eventos, oportunidades, desafios de inovação aberta, trilhas de capacitação e parcerias com relação direta com Betim e região."
      },
      {
        title: "Como avaliamos",
        body: "A curadoria confere se o conteúdo é verdadeiro, está completo, tem responsável identificável e é coerente com o propósito do movimento. Cadastros entram como pendentes e só aparecem publicamente após aprovação."
      },
      {
        title: "O que é recusado",
        body: "Propaganda sem conexão com o ecossistema, conteúdo enganoso, esquemas de pirâmide ou promessa de retorno financeiro, dados de terceiros sem autorização e qualquer material que viole o código de conduta."
      },
      {
        title: "Dados de contato",
        body: "E-mails e telefones enviados nos formulários servem para a curadoria e para as conexões do movimento. Contatos de empresas que publicam desafios não são exibidos publicamente: as propostas chegam pelo próprio portal."
      }
    ],
    ctas: [
      { label: "Ler o código de conduta", href: "/codigo-de-conduta" },
      { label: "Ler a política de privacidade", href: "/privacidade" }
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
