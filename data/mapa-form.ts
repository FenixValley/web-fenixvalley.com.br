// Estrutura do Google Form "Mapeamento do Ecossistema de Inovação - Fênix Valley".
// Gerado a partir do FB_PUBLIC_LOAD_DATA_ do formulário. As strings de opção e os
// entry IDs precisam bater EXATAMENTE com o Google Forms para o envio ser aceito.
// Fonte: https://forms.gle/3bbnDRFjp1xTLLxB8

export const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfqMwyn3eU0F0c4-sSS6w_-783YQxas50xODkeepPfD4qwF_g/formResponse";

// Campo (radio) que define qual seção de perfil condicional aparece.
export const ROLE_FIELD = "entry.770153556" as const;

export type MapaFieldType = "short" | "paragraph" | "radio" | "checkbox";

export type MapaField = {
  entry: string;
  label: string;
  type: MapaFieldType;
  required: boolean;
  options: string[];
};

export type MapaSection = {
  title: string;
  /** Quando definido, a seção só aparece se ROLE_FIELD tiver este valor. */
  showWhenRole: string | null;
  fields: MapaField[];
};

export const MAPA_FORM_SECTIONS: MapaSection[] = [
  {
    title: "Identificação geral",
    showWhenRole: null,
    fields: [
      {
        entry: "entry.1055976553",
        label: "Nome da Organização / Iniciativa / Startup",
        type: "short",
        required: true,
        options: [],
      },
      {
        entry: "entry.2058581867",
        label: "CNPJ",
        type: "short",
        required: false,
        options: [],
      },
      {
        entry: "entry.1262487244",
        label: "Ano de Fundação / Início das Atividades",
        type: "short",
        required: true,
        options: [],
      },
      {
        entry: "entry.790459441",
        label: "Website ou Link Principal (LinkedIn/Instagram)",
        type: "short",
        required: true,
        options: [],
      },
      {
        entry: "entry.737370097",
        label: "Qual é a base principal de atuação geográfica da sua organização?",
        type: "radio",
        required: true,
        options: [
          "Betim / MG",
          "Contagem / MG",
          "Atuação Híbrida (Estrutura ou operações em ambas as cidades)",
          "Outra cidade da Região Metropolitana (mas com interesse direto no Fênix Valley)",
          "Outra cidade em Minas Gerais (mas com interesse direto no Fênix Valley)",
          "Outra cidade do Brasil (mas com interesse direto no Fênix Valley)"
        ],
      },
      {
        entry: "entry.968719683",
        label: "Nome Completo do Respondente",
        type: "short",
        required: true,
        options: [],
      },
      {
        entry: "entry.909496786",
        label: "Cargo / Função na Organização",
        type: "short",
        required: true,
        options: [],
      },
      {
        entry: "entry.297433105",
        label: "WhatsApp para Contato Direto",
        type: "short",
        required: true,
        options: [],
      },
      {
        entry: "entry.770153556",
        label: "Qual o papel principal da sua organização no ecossistema Fênix Valley?",
        type: "radio",
        required: true,
        options: [
          "Startup ou Empresa de Base Tecnológica/Científica",
          "Instituição de Ensino / Academia (Universidades, Escolas Técnicas, Faculdades)",
          "Grande Empresa / Indústria (Potencial cliente ou parceira de inovação)",
          "Investidor (Anjo, Fundo de VC, Sindicato de Investimento)",
          "Instituição de Apoio / Governo (Sebrae, Hubs, Incubadoras, Setor Público)",
          "Terceiro Setor (ONGs, Associações sem fins lucrativos, Fundações de Desenvolvimento Social)"
        ],
      },
    ],
  },
  {
    title: "Perfil: Startup ou Empresa de Base Tecnológica/Científica",
    showWhenRole: "Startup ou Empresa de Base Tecnológica/Científica",
    fields: [
      {
        entry: "entry.23537568",
        label: "Fase Atual da Startup",
        type: "radio",
        required: true,
        options: [
          "Ideação (Validando o problema, desenhando a solução)",
          "Validação / MVP (Construindo ou testando o produto com os primeiros usuários)",
          "Tração (Produto pronto, clientes recorrentes e gerando receita consistente)",
          "Escala (Crescimento acelerado de receita e equipe, buscando novos mercados)"
        ],
      },
      {
        entry: "entry.391379685",
        label: "Modelo de Negócio Principal",
        type: "radio",
        required: true,
        options: [
          "B2B (Vende para outras empresas)",
          "B2C (Vende direto para o consumidor final)",
          "B2B2C (Vende para empresas que atendem o consumidor final)",
          "B2G / GovTech (Vende ou desenvolve soluções para o Governo/Setor Público)",
          "Marketplace / Plataforma de Intermediação"
        ],
      },
      {
        entry: "entry.1038353122",
        label: "Vertical Principal de Atuação (Segmento)",
        type: "radio",
        required: true,
        options: [
          "IndTech / AutoTech (Soluções para Indústria, Manufatura e Automação)",
          "LogTech / Supply Chain (Logística, Frota e Transportes)",
          "FinTech / InsurTech / DeFi (Serviços Financeiros, Crédito e Seguros)",
          "EdTech (Educação, Treinamentos e Lifelong Learning)",
          "HealthTech / BioTech (Saúde, Medicina, Bem-estar e Biotecnologia)",
          "Construtech / PropTech (Construção Civil, Engenharia e Imobiliário)",
          "AgroTech / FoodTech (Agronegócio, Cadeia Alimentar e Biocombustíveis)",
          "RetailTech / E-commerce (Varejo, Trade Marketing e Soluções de Consumo)",
          "CleanTech / EnergyTech / ClimateTech (Energias Renováveis, Sustentabilidade e ESG)",
          "GovTech / LegalTech (Soluções para Gestão Pública, Jurídica e Compliance)",
          "HRTech (Recrutamento, Seleção, DHO e Gestão de Pessoas)",
          "MarTech / AdTech (Marketing, Vendas, Growth e Comunicação)",
          "SocialTech / ImpactTech (Soluções de Impacto Social Direto e Terceiro Setor)",
          "DeepTech (Hard Science, Nanotecnologia, Computação Quântica, Eletrônica Pesada)",
          "Outra Vertical não listada"
        ],
      },
      {
        entry: "entry.475029946",
        label: "Tecnologia Base (Core Tech)",
        type: "checkbox",
        required: true,
        options: [
          "Inteligência Artificial / Machine Learning / Computação Visual",
          "Internet das Coisas (IoT) / Hardware Integrado / Sensores",
          "Blockchain / Web3 / Criptografia Avançada",
          "Cloud Computing / Arquitetura SaaS Tradicional",
          "Big Data / Data Science / Analytics",
          "Desenvolvimento Web / Mobile Tradicional (Sem IA/DeepTech)",
          "No-code / Low-code"
        ],
      },
      {
        entry: "entry.1001866792",
        label: "Tamanho Atual do Time (Fundadores + Colaboradores)",
        type: "radio",
        required: true,
        options: [
          "Apenas os fundadores (1 a 3 pessoas)",
          "Time pequeno (4 a 10 pessoas)",
          "Time em crescimento (11 a 30 pessoas)",
          "Time consolidado (Mais de 30 pessoas)"
        ],
      },
      {
        entry: "entry.1011453703",
        label: "Histórico de Captura de Recursos",
        type: "checkbox",
        required: true,
        options: [
          "Bootstrapped (Recursos próprios dos fundadores e reinvestimento de receita)",
          "Investimento Anjo / Pré-Seed (Capital de pessoas físicas)",
          "Venture Capital (Fundos de investimento institucionais Seed, Series A, etc.)",
          "Subsídios Públicos / Editais de Fomento (Fapemig, Finep, Embrapii, Sebrae, etc.)"
        ],
      },
      {
        entry: "entry.1392799699",
        label: "Qual o maior gargalo atual para o crescimento da sua startup?",
        type: "radio",
        required: true,
        options: [
          "Acesso a Capital / Investimento de Risco",
          "Acesso a Clientes / Vendas Corporativas (Especialmente no polo industrial)",
          "Contratação e Retenção de Talentos Técnicos (Devs, Engenheiros, Data Science)",
          "Desenvolvimento de Produto / Validação tecnológica / Escalar a Infraestrutura",
          "Burocracia / Linhas de Crédito Tradicionais / Barreiras Fiscais"
        ],
      },
    ],
  },
  {
    title: "Perfil: Instituição de Ensino / Academia",
    showWhenRole: "Instituição de Ensino / Academia (Universidades, Escolas Técnicas, Faculdades)",
    fields: [
      {
        entry: "entry.1073755616",
        label: "Iniciativas de Inovação Ativas na Instituição",
        type: "checkbox",
        required: false,
        options: [
          "Possuímos Incubadora ou Aceleradora de empresas de base tecnológica",
          "Possuímos Núcleo de Inovação Tecnológica (NIT) / Gestão de Patentes e PI",
          "Possuímos Empresas Juniores ativas focadas em tecnologia/engenharia/negócios",
          "Possuímos Laboratórios de Pesquisa abertos a parcerias de Co-Desenvolvimento com indústrias",
          "Nenhuma das opções acima"
        ],
      },
      {
        entry: "entry.468398757",
        label: "Quais os principais cursos focados em tecnologia, engenharia e negócios que a instituição oferece no eixo Betim-Contagem?",
        type: "paragraph",
        required: false,
        options: [],
      },
      {
        entry: "entry.216568614",
        label: "Como a instituição avalia o cenário atual de transferência de tecnologia para o mercado local e o que poderia melhorar?",
        type: "paragraph",
        required: false,
        options: [],
      },
    ],
  },
  {
    title: "Perfil: Grande Empresa / Indústria (Corporate)",
    showWhenRole: "Grande Empresa / Indústria (Potencial cliente ou parceira de inovação)",
    fields: [
      {
        entry: "entry.1588739375",
        label: "Nível atual de relacionamento com Startups (Inovação Aberta)",
        type: "radio",
        required: true,
        options: [
          "Não temos relacionamento e não está no planejamento estratégico atual",
          "Não temos hoje, mas temos forte interesse em começar a nos conectar com startups de Betim/Contagem",
          "Já realizamos conexões pontuais (Desafios abertos, contratação de startups como fornecedoras, PoCs)",
          "Possuímos um programa estruturado de inovação aberta / Hub interno de inovação",
          "Possuímos estrutura de Corporate Venture Capital (CVC) para investir e comprar participação em startups"
        ],
      },
      {
        entry: "entry.1621719619",
        label: "Quais as principais dores operacionais, industriais ou logísticas que a sua empresa possui hoje e que poderiam ser resolvidas por startups de tecnologia?",
        type: "paragraph",
        required: false,
        options: [],
      },
    ],
  },
  {
    title: "Perfil: Investidor (Anjo, VC, Sindicato, Fundo)",
    showWhenRole: "Investidor (Anjo, Fundo de VC, Sindicato de Investimento)",
    fields: [
      {
        entry: "entry.451922716",
        label: "Perfil Principal de Investimento",
        type: "radio",
        required: true,
        options: [
          "Investidor Anjo Individual",
          "Grupo/Rede de Anjos ou Sindicato de Investimento",
          "Fundo de Venture Capital (Seed / Early Stage)",
          "Fundo de Private Equity / Corporate Venture Capital"
        ],
      },
      {
        entry: "entry.1228751198",
        label: "Ticket Médio de Investimento por Startup (Faixa de valores em R$)",
        type: "short",
        required: false,
        options: [],
      },
      {
        entry: "entry.865909718",
        label: "Quais setores ou verticais tecnológicas estão na tese de investimento atual do seu fundo?",
        type: "checkbox",
        required: true,
        options: [
          "IndTech / AutoTech (Soluções para Indústria, Manufatura e Automação)",
          "LogTech / Supply Chain (Logística, Frota e Transportes)",
          "FinTech / InsurTech / DeFi (Serviços Financeiros e Crédito)",
          "EdTech (Educação e Treinamentos)",
          "HealthTech / BioTech (Saúde, Medicina e Biotecnologia)",
          "Construtech / PropTech (Construção Civil e Imobiliário)",
          "AgroTech / FoodTech (Agronegócio e Cadeia Alimentar)",
          "RetailTech / E-commerce (Varejo e Soluções de Consumo)",
          "CleanTech / EnergyTech / ClimateTech (Energias Renováveis e ESG)",
          "GovTech / LegalTech (Gestão Pública e Compliance)",
          "HRTech / MarTech (Recursos Humanos, Marketing e Vendas)",
          "SocialTech / ImpactTech (Projetos de Impacto Social e Terceiro Setor)",
          "DeepTech (Hard Science, Hardware, Nanotecnologia e Eletrônica Pesada)",
          "Agnóstico (Não temos preferência por setor, avaliamos o potencial do negócio de forma geral)"
        ],
      },
    ],
  },
  {
    title: "Perfil: Instituição de Apoio, Hub ou Setor Público",
    showWhenRole: "Instituição de Apoio / Governo (Sebrae, Hubs, Incubadoras, Setor Público)",
    fields: [
      {
        entry: "entry.1331424962",
        label: "Serviços e Apoios oferecidos gratuitamente ou subsidiados para o ecossistema:",
        type: "checkbox",
        required: true,
        options: [
          "Programas de Mentoria e Capacitação de Empreendedores",
          "Espaço físico de Coworking / Estações de Trabalho / Salas de Reunião Gratuitas",
          "Editais de Subsídio Financeiro, Bolsas de Inovação ou Fomento Direto",
          "Eventos de Networking, Rodadas de Negócios e Conexões Comerciais",
          "Suporte de Infraestrutura Urbana / Sandbox Regulatório (Testes de tecnologias nas cidades)"
        ],
      },
      {
        entry: "entry.1336948291",
        label: "Descreva as principais iniciativas que sua organização está executando ou planeja executar para o Fênix Valley nos próximos 12 meses.",
        type: "paragraph",
        required: false,
        options: [],
      },
    ],
  },
  {
    title: "Perfil: Terceiro Setor (ONGs, Associações e Inovação Social)",
    showWhenRole: "Terceiro Setor (ONGs, Associações sem fins lucrativos, Fundações de Desenvolvimento Social)",
    fields: [
      {
        entry: "entry.622003962",
        label: "Área Principal de Atuação da Instituição:",
        type: "checkbox",
        required: true,
        options: [
          "Capacitação Profissional / Inclusão Produtiva / Educação Digital",
          "Assistência Social / Combate à Vulnerabilidade",
          "Preservação Ambiental / Economia Circular / Projetos de Sustentabilidade",
          "Fomento ao Empreendedorismo de Impacto Social / Negócios de Periferia",
          "Cultura, Arte e Desenvolvimento Comunitário Local"
        ],
      },
      {
        entry: "entry.671092858",
        label: "Qual o nível de digitalização ou uso de tecnologia nos projetos da sua instituição hoje?",
        type: "radio",
        required: true,
        options: [
          "Baixo: Nossas operações são majoritariamente analógicas e manuais",
          "Médio: Usamos ferramentas básicas na nuvem (planilhas, redes sociais, formulários)",
          "Alto: Desenvolvemos plataformas próprias, usamos automações avançadas ou dados estruturados"
        ],
      },
      {
        entry: "entry.243208174",
        label: "A sua instituição possui interesse em co-desenvolver projetos de impacto social (SocialTech) com startups de tecnologia de Betim/Contagem?",
        type: "radio",
        required: true,
        options: [
          "Sim, queremos conectar nossos desafios sociais com a capacidade tecnológica de startups",
          "Temos interesse, mas não sabemos como essa conexão funciona na prática",
          "No momento não é o nosso foco institucional"
        ],
      },
    ],
  },
  {
    title: "Conexão Fênix Valley & Matriz de Parcerias",
    showWhenRole: null,
    fields: [
      {
        entry: "entry.407092408",
        label: "Mapeamento de Ativos (GIVE): O que sua organização pode COMPARTILHAR ativamente para acelerar a comunidade de Betim e Contagem?",
        type: "checkbox",
        required: true,
        options: [
          "Mentoria Estratégica (Doação de horas de executivos, diretores ou fundadores experientes para orientar novos negócios)",
          "Infraestrutura Física (Cessão temporária e gratuita de salas de reunião, auditórios ou pátios para a realização de meetups da comunidade)",
          "Inovação Aberta Prática (Disponibilizar desafios de negócios e dados simulados para startups desenharem projetos-piloto / PoCs)",
          "Pontes de Mercado / Conexões (Facilitar a abertura de canais comerciais com grandes redes de compras corporativas)",
          "Vulnerabilidade Industrial (Trazer problemas industriais reais e complexos para serem debatidos de forma aberta em painéis e rodas de inovação)",
          "Patrocínio e Fomento Capital (Apoio financeiro direto para viabilizar prêmios, hackathons e a manutenção de iniciativas comunitárias)"
        ],
      },
      {
        entry: "entry.1223165753",
        label: "Necessidades Estratégicas (TAKE): O que sua organização mais precisa ABSORVER do Fênix Valley no momento atual?",
        type: "checkbox",
        required: true,
        options: [
          "Acesso a talentos qualificados (Desenvolvedores, engenheiros, especialistas de produto, SDRs)",
          "Oportunidades de novos clientes / Contratos comerciais de inovação com grandes indústrias da região",
          "Acesso a Smart Capital / Investidores anjo ou fundos institucionais alinhados à nossa fase",
          "Benchmarking Técnico (Aprender boas práticas de engenharia, cultura ágil e gestão com outras empresas da comunidade)",
          "Visibilidade Institucional e posicionamento de marca associado à tecnologia e inovação no estado",
          "Parcerias de P&D (Aproximação com centros de pesquisa e laboratórios acadêmicos para criar novas tecnologias)"
        ],
      },
      {
        entry: "entry.1010829310",
        label: "Na sua visão de liderança, qual deve ser a prioridade número 1 do Fênix Valley para fazer o ecossistema de Betim e Contagem decolar juntos?",
        type: "paragraph",
        required: true,
        options: [],
      },
    ],
  },
];
