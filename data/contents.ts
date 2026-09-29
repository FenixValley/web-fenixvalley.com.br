export type ContentCategory = "Notícia" | "Artigo" | "Case" | "Guia" | "Edital";

export interface ContentArticle {
  slug: string;
  title: string;
  kicker: string;
  category: ContentCategory;
  summary: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: string;
  tags: string[];
  sections: {
    heading?: string;
    body: string;
  }[];
}

export const contentArticles: ContentArticle[] = [
  {
    slug: "como-abrir-uma-startup-em-betim",
    title: "Guia Prático: Como Começar uma Startup em Betim",
    kicker: "Passo a passo",
    category: "Guia",
    summary:
      "Passo a passo detalhado para fundadores que querem transformar ideias em negócios de tecnologia escaláveis aproveitando o ecossistema local.",
    author: {
      name: "Coordenação Fênix Valley",
      role: "Núcleo de Empreendedorismo"
    },
    publishedAt: "2026-08-15",
    readTime: "5 min",
    tags: ["Empreendedorismo", "Comece Aqui", "Validação", "Betim"],
    sections: [
      {
        heading: "1. Identificando dores industriais e urbanas",
        body: "Betim concentra um dos maiores parques industriais da América Latina, além de desafios em logística, mobilidade urbana e sustentabilidade. As melhores startups locais nascem da observação próxima de processos industriais, frotas comerciais e demandas de serviços da comunidade."
      },
      {
        heading: "2. Validação ágil com MVP",
        body: "Antes de escrever milhares de linhas de código ou investir em maquinário pesado, converse com pelo menos dez potenciais clientes na cidade. Construa um Produto Mínimo Viável (MVP) focado em resolver uma dor imediata e meça se as pessoas estão dispostas a usar ou pagar pela solução."
      },
      {
        heading: "3. Conexão com os programas e mentores locais",
        body: "Utilize o ecossistema do Fênix Valley para encontrar mentores experientes, participar de meetups e se inscrever nos programas de pré-aceleração e inovação aberta disponíveis no portal."
      }
    ]
  },
  {
    slug: "case-eficiencia-energetica-industria-40",
    title: "Case de Sucesso: Redução de 22% no Consumo Energético com Sensores IoT",
    kicker: "Inovação Aplicada",
    category: "Case",
    summary:
      "Como uma startup de Betim conectou hardware IoT com aprendizado de máquina para otimizar o consumo térmico em plantas industriais da região.",
    author: {
      name: "Danilo Ribeiro",
      role: "Inovação Corporativa"
    },
    publishedAt: "2026-07-28",
    readTime: "4 min",
    tags: ["Indústria 4.0", "IoT", "ESG", "Eficiência Energética"],
    sections: [
      {
        heading: "O Desafio",
        body: "Fornos e compressores industriais operavam com monitoramento periódico manual, dificultando a detecção prévia de anomalias térmicas e gerando picos desnecessários na conta de demanda de energia elétrica."
      },
      {
        heading: "A Solução Desenvolvida",
        body: "Foi instalada uma malha de telemetria sem fio não intrusiva acoplada a um dashboard em tempo real. Algoritmos de detecção de anomalias alertam a equipe de manutenção preditiva minutos antes de sobrecargas."
      },
      {
        heading: "Resultados Alcançados",
        body: "Nos primeiros seis meses de operação contínua, a fábrica registrou queda de 22% no consumo energético das linhas monitoradas e evitou duas paradas não programadas que custariam centenas de milhares de reais."
      }
    ]
  },
  {
    slug: "marco-legal-das-startups-oportunidades-municipais",
    title: "Marco Legal das Startups e as Oportunidades em Contratações Públicas",
    kicker: "Regulação e Negócios",
    category: "Artigo",
    summary:
      "Entenda como o CPSI (Contrato Público para Solução Inovadora) permite que prefeituras e órgãos públicos contratem testes e soluções de tecnologia.",
    author: {
      name: "Comitê de Governança",
      role: "Fênix Valley"
    },
    publishedAt: "2026-06-12",
    readTime: "6 min",
    tags: ["GovTech", "Marco Legal", "CPSI", "Setor Público"],
    sections: [
      {
        heading: "O que é o CPSI?",
        body: "O Marco Legal das Startups (Lei Complementar nº 182/2021) criou a modalidade de licitação especial para inovação, permitindo a contratação de testes de soluções mesmo antes de estarem totalmente prontas no mercado."
      },
      {
        heading: "Vantagens para quem empreende em Betim",
        body: "Startups locais ganham a chance de validar tecnologias diretamente com secretarias municipais e autarquias, gerando primeiros clientes de referência com segurança jurídica e transparência."
      }
    ]
  },
  {
    slug: "abertas-inscricoes-edital-desenvolvimento-tecnologico",
    title: "Abertas as Chamadas para Projetos de Inteligência Artificial e Automação",
    kicker: "Oportunidade",
    category: "Edital",
    summary:
      "Edital municipal e de fundações de fomento abre inscrições com subsídio para projetos colaborativos entre universidades locais e empresas.",
    author: {
      name: "Redação Portal",
      role: "Notícias & Oportunidades"
    },
    publishedAt: "2026-09-01",
    readTime: "3 min",
    tags: ["Editais", "Fomento", "Pesquisa Aplicada", "Inteligência Artificial"],
    sections: [
      {
        heading: "Objetivo da Chamada",
        body: "Incentivar projetos práticos de inovação desenvolvidos em conjunto por grupos de pesquisa de Betim e startups/empresas instaladas no município."
      },
      {
        heading: "Quem pode participar",
        body: "Equipes vinculadas a universidades ou escolas técnicas locais com plano de trabalho focado em automação, IA, logística ou transição energética."
      }
    ]
  },
  {
    slug: "panorama-do-ecossistema-de-betim-2026",
    title: "Panorama 2026: A Evolução do Ecossistema Fênix Valley",
    kicker: "Notícias",
    category: "Notícia",
    summary:
      "Crescimento de 45% nos cadastros de novos atores, dezenas de desafios de inovação aberta e fortalecimento das conexões entre academia e indústria.",
    author: {
      name: "Redação Fênix Valley",
      role: "Comunicação"
    },
    publishedAt: "2026-08-30",
    readTime: "4 min",
    tags: ["Ecossistema", "Betim", "Inovação", "Resultados"],
    sections: [
      {
        heading: "Balanço do Movimento",
        body: "O portal consolidou mais de 50 organizações ativas no mapa vivo, cobrindo startups, mentores, universidades, espaços e investidores em diversos bairros de Betim."
      },
      {
        heading: "Próximos Passos",
        body: "Para o próximo ciclo, a ênfase será em ampliar os desafios de inovação aberta corporativa e incentivar residências tecnológicas com estudantes universitários."
      }
    ]
  }
];

export function getContentArticle(slug: string): ContentArticle | undefined {
  return contentArticles.find((article) => article.slug === slug);
}
