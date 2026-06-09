import { Building2, GraduationCap, Handshake, Lightbulb, Rocket, Sprout } from "lucide-react";

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
  { value: "Mapa", label: "do ecossistema", detail: "base viva de atores e conexoes" },
  { value: "Agenda", label: "de oportunidades", detail: "eventos, editais, desafios e chamadas" },
  { value: "Rede", label: "de colaboracao", detail: "startups, empresas, universidades e capital" }
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
  { name: "Investidores", count: "conexoes", x: "48%", y: "43%" }
];

export const newsItems = [
  {
    title: "Mapa Fenix Valley",
    description: "Primeira base para cadastrar startups, instituicoes, empresas, mentores e espacos."
  },
  {
    title: "Agenda do ecossistema",
    description: "Meetups, mentorias e programas em uma trilha visivel para a comunidade."
  },
  {
    title: "Codigo de colaboracao",
    description: "Respeito, foco em Betim e divulgacoes alinhadas ao proposito do movimento."
  }
];
