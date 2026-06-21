export type Program = {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  description: string;
  audience: string;
  criteria: string[];
  steps: string[];
  calendar: string;
};

export const programsCatalog: Program[] = [
  {
    slug: "pre-aceleracao",
    title: "Pré-aceleração",
    tag: "Ideação",
    summary: "Da ideia ao problema validado, com pesquisa, modelo de negócio, MVP e pitch inicial.",
    description:
      "Ciclo de formação prática para quem tem uma ideia ou projeto em estágio inicial. O programa acompanha a jornada de validação: entender o problema, conversar com clientes reais, desenhar o modelo de negócio, construir um MVP enxuto e se preparar para o primeiro pitch.",
    audience: "Empreendedores em estágio de ideia, estudantes e times recém-formados de Betim e região.",
    criteria: [
      "Time com pelo menos uma pessoa dedicada ao projeto",
      "Disposição para participar dos encontros presenciais em Betim",
      "Problema com conexão real com a cidade ou região"
    ],
    steps: ["Mapear", "Validar", "Conectar", "Acelerar"],
    calendar: "As turmas são divulgadas em chamadas abertas na agenda do ecossistema."
  },
  {
    slug: "aceleracao",
    title: "Aceleração",
    tag: "Tração",
    summary: "Para startups com MVP no mercado que buscam tração, clientes e preparação para investimento.",
    description:
      "Programa para startups que já validaram o problema e têm produto em operação. Foco em crescimento: métricas, canais de venda, precificação, governança e preparação para conversas com investidores e clientes corporativos.",
    audience: "Startups com MVP lançado e primeiros usuários ou clientes.",
    criteria: [
      "Produto em operação com usuários reais",
      "Time dedicado integralmente ou em transição",
      "Abertura para mentoria e acompanhamento de métricas"
    ],
    steps: ["Diagnosticar", "Estruturar", "Crescer", "Conectar capital"],
    calendar: "As turmas são divulgadas em chamadas abertas na agenda do ecossistema."
  },
  {
    slug: "incubacao",
    title: "Incubação",
    tag: "Estruturação",
    summary: "Acompanhamento de longo prazo para transformar projetos validados em negócios estruturados.",
    description:
      "Jornada de estruturação para projetos que validaram a ideia e precisam virar empresa: formalização, finanças, operação, primeiros contratos e conexão com espaços e parceiros do ecossistema.",
    audience: "Projetos validados na pré-aceleração ou negócios locais em formalização.",
    criteria: [
      "Projeto com validação inicial demonstrável",
      "Compromisso com o plano de desenvolvimento acordado",
      "Participação ativa na comunidade"
    ],
    steps: ["Formalizar", "Operar", "Vender", "Sustentar"],
    calendar: "Entrada por chamadas específicas, conforme capacidade dos espaços parceiros."
  },
  {
    slug: "inovacao-aberta",
    title: "Inovação aberta",
    tag: "Empresas",
    summary: "Empresas publicam desafios reais e conectam startups, pesquisadores e talentos.",
    description:
      "Ponte entre empresas e indústrias da região e quem constrói soluções. As organizações trazem desafios reais — automação, logística, eficiência energética, ESG, indústria 4.0 — e o ecossistema responde com pilotos, provas de conceito e parcerias.",
    audience: "Empresas e indústrias com desafios de inovação; startups e pesquisadores com soluções aplicáveis.",
    criteria: [
      "Desafio com patrocinador interno na empresa",
      "Disponibilidade para rodar piloto ou prova de conceito",
      "Compromisso de retorno aos participantes"
    ],
    steps: ["Publicar desafio", "Conectar soluções", "Pilotar", "Escalar"],
    calendar: "Desafios são publicados conforme demanda das empresas parceiras."
  },
  {
    slug: "residencia-tecnologica",
    title: "Residência tecnológica",
    tag: "Talentos",
    summary: "Estudantes e profissionais aplicam tecnologia em projetos práticos da cidade.",
    description:
      "Programa de imersão prática: times multidisciplinares de estudantes e profissionais em transição trabalham em projetos reais de tecnologia para a cidade e organizações locais, com mentoria técnica e de carreira.",
    audience: "Estudantes de tecnologia, recém-formados e profissionais em transição de carreira.",
    criteria: [
      "Disponibilidade mínima semanal para o projeto",
      "Interesse em atuar em time multidisciplinar",
      "Compromisso com a entrega final do ciclo"
    ],
    steps: ["Formar times", "Imergir", "Construir", "Apresentar"],
    calendar: "Ciclos alinhados ao calendário acadêmico das instituições parceiras."
  },
  {
    slug: "programas-estudantis",
    title: "Programas para estudantes",
    tag: "Educação",
    summary: "Trilhas, hackathons e desafios para aproximar estudantes do ecossistema de inovação.",
    description:
      "Porta de entrada para estudantes do ensino técnico e superior: trilhas de capacitação (da ideia ao MVP, programação, negócios, pitch), hackathons, visitas e conexão com estágios e oportunidades do ecossistema.",
    audience: "Estudantes de escolas técnicas e universidades de Betim e região.",
    criteria: [
      "Estar matriculado(a) em instituição de ensino",
      "Curiosidade e vontade de construir projetos",
      "Sem pré-requisito técnico"
    ],
    steps: ["Despertar", "Capacitar", "Praticar", "Conectar"],
    calendar: "Atividades contínuas, divulgadas na agenda e nas instituições parceiras."
  }
];

export function getProgram(slug: string): Program | undefined {
  return programsCatalog.find((program) => program.slug === slug);
}
