import {
  BadgeDollarSign,
  BookOpen,
  Building2,
  Factory,
  GraduationCap,
  Handshake,
  Lightbulb,
  MapPinned,
  Newspaper,
  Rocket,
  Sprout,
  UsersRound
} from "lucide-react";

export const pillars = [
  {
    title: "Ideias e projetos",
    description: "Espaço para compartilhar oportunidades, validar problemas reais e formar times.",
    icon: Lightbulb
  },
  {
    title: "Startups e empresas",
    description: "Conexão entre negócios locais, tecnologia aplicada e novas fontes de receita.",
    icon: Rocket
  },
  {
    title: "Universidades e talentos",
    description: "Aproximação entre estudantes, pesquisa, mercado e desafios da cidade.",
    icon: GraduationCap
  },
  {
    title: "Capital e parceiros",
    description: "Pontes com investidores, mentores, governo, entidades e lideranças empresariais.",
    icon: Handshake
  },
  {
    title: "Nova economia",
    description: "Diversificação econômica para reduzir a dependência de um único setor produtivo.",
    icon: Building2
  },
  {
    title: "Impacto local",
    description: "Empreendedorismo como ferramenta para mudar vidas, cidades e mercados.",
    icon: Sprout
  }
];

export const metrics = [
  { value: "Mapa", label: "do ecossistema", detail: "base viva de atores e conexões" },
  { value: "Agenda", label: "de oportunidades", detail: "eventos, editais, desafios e chamadas" },
  { value: "Rede", label: "de colaboração", detail: "startups, empresas, universidades e capital" }
];

export const programs = [
  {
    title: "Pré-aceleração",
    description: "Da ideia ao problema validado, com pesquisa, modelo de negócio, MVP e pitch inicial.",
    tag: "Ideação"
  },
  {
    title: "Inovação aberta",
    description: "Empresas publicam desafios reais e conectam startups, pesquisadores e talentos.",
    tag: "Empresas"
  },
  {
    title: "Residência tecnológica",
    description: "Estudantes e profissionais aplicam tecnologia em projetos práticos da cidade.",
    tag: "Talentos"
  }
];

export const ecosystemActors = [
  { name: "Startups", count: "cadastro aberto", x: "18%", y: "28%" },
  { name: "Universidades", count: "parcerias", x: "68%", y: "22%" },
  { name: "Empresas", count: "desafios", x: "76%", y: "62%" },
  { name: "Mentores", count: "curadoria", x: "34%", y: "70%" },
  { name: "Investidores", count: "conexões", x: "48%", y: "43%" }
];

export const newsItems = [
  {
    title: "Mapa Fênix Valley",
    description: "Primeira base para cadastrar startups, instituições, empresas, mentores e espaços."
  },
  {
    title: "Agenda do ecossistema",
    description: "Meetups, mentorias e programas em uma trilha visivel para a comunidade."
  },
  {
    title: "Código de colaboração",
    description: "Respeito, foco em Betim e divulgações alinhadas ao propósito do movimento."
  }
];

export const audienceJourneys = [
  {
    title: "Quero empreender",
    description: "Valide uma ideia, encontre mentores, monte time e publique sua startup no mapa.",
    cta: "Cadastrar startup",
    href: "#participar",
    icon: Rocket
  },
  {
    title: "Quero inovar na empresa",
    description: "Publique desafios, encontre solucoes locais e conecte pesquisadores e startups.",
    cta: "Divulgar desafio",
    href: "#participar",
    icon: Factory
  },
  {
    title: "Quero formar talentos",
    description: "Conecte cursos, estudantes, laboratórios e projetos aplicados ao mercado.",
    cta: "Conectar instituição",
    href: "#participar",
    icon: GraduationCap
  },
  {
    title: "Quero apoiar",
    description: "Atue como mentor, investidor, parceiro institucional ou patrocinador de programas.",
    cta: "Ser parceiro",
    href: "#participar",
    icon: Handshake
  }
];

export const ecosystemMapLayers = [
  {
    title: "Base de atores",
    description: "Startups, empresas, universidades, mentores, investidores, espaços e comunidades.",
    icon: MapPinned
  },
  {
    title: "Sinais de oportunidade",
    description: "Eventos, editais, desafios, chamadas, vagas, mentorias e programas em andamento.",
    icon: BadgeDollarSign
  },
  {
    title: "Conexões recomendadas",
    description: "Matching entre problemas, talentos, capital, parceiros e soluções para Betim.",
    icon: UsersRound
  }
];

export const partnerBands = [
  "Parceiros fundadores",
  "Universidades",
  "Empresas mantenedoras",
  "Investidores",
  "Comunidades",
  "Poder público"
];

export const contentTracks = [
  {
    title: "Noticias do ecossistema",
    description: "Novos atores, eventos, resultados de programas e chamadas relevantes para Betim.",
    icon: Newspaper
  },
  {
    title: "Guias e trilhas",
    description: "Materiais para tirar ideias do papel, validar MVP, vender, captar e inovar.",
    icon: BookOpen
  },
  {
    title: "Cases e impacto",
    description: "Histórias de empreendedores, empresas, estudantes e projetos aplicados na cidade.",
    icon: Sprout
  }
];
