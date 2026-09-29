import {
  BadgeDollarSign,
  BookOpen,
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
    title: "Nova economia e impacto local",
    description: "Diversificação econômica e empreendedorismo como ferramentas para mudar vidas, cidades e mercados.",
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
    tag: "Ideação",
    href: "/programas/pre-aceleracao"
  },
  {
    title: "Inovação aberta",
    description: "Empresas publicam desafios reais e conectam startups, pesquisadores e talentos.",
    tag: "Empresas",
    href: "/programas/inovacao-aberta"
  },
  {
    title: "Residência tecnológica",
    description: "Estudantes e profissionais aplicam tecnologia em projetos práticos da cidade.",
    tag: "Talentos",
    href: "/programas/residencia-tecnologica"
  }
];

export const ecosystemActors = [
  { name: "Startups", count: "cadastro aberto", x: "22%", y: "34%" },
  { name: "Universidades", count: "parcerias", x: "50%", y: "20%" },
  { name: "Empresas", count: "desafios", x: "78%", y: "34%" },
  { name: "Hubs", count: "espaços & inovação", x: "50%", y: "52%" },
  { name: "Mentores", count: "curadoria", x: "24%", y: "72%" },
  { name: "Investidores", count: "conexões", x: "76%", y: "72%" }
];

export const newsItems = [
  {
    title: "Mapa Fênix Valley",
    description: "Primeira base para cadastrar startups, instituições, empresas, mentores e espaços."
  },
  {
    title: "Agenda do ecossistema",
    description: "Meetups, mentorias e programas em uma trilha visível para a comunidade."
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
    href: "/faca-parte",
    icon: Rocket
  },
  {
    title: "Quero inovar na empresa",
    description: "Publique desafios, encontre soluções locais e conecte pesquisadores e startups.",
    cta: "Divulgar desafio",
    href: "/empresas",
    icon: Factory
  },
  {
    title: "Quero formar talentos",
    description: "Conecte cursos, estudantes, laboratórios e projetos aplicados ao mercado.",
    cta: "Conectar instituição",
    href: "/universidades",
    icon: GraduationCap
  },
  {
    title: "Quero apoiar",
    description: "Atue como mentor, investidor, parceiro institucional ou patrocinador de programas.",
    cta: "Ser parceiro",
    href: "/seja-parceiro",
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
    title: "Notícias do ecossistema",
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
