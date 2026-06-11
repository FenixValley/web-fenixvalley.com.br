export type Opportunity = {
  id: string;
  title: string;
  type: string;
  stage: "Aberto" | "Curadoria" | "Em breve";
  audience: string;
  date: string;
  owner: string;
  link?: string | null;
  featured?: boolean;
};

export const opportunities: Opportunity[] = [
  {
    id: "fv-001",
    title: "Rodada de Ideias Betim Tech",
    type: "Meetup",
    stage: "Aberto",
    audience: "Fundadores, estudantes e profissionais",
    date: "2026-06-12",
    owner: "Fênix Valley"
  },
  {
    id: "fv-002",
    title: "Mapa de Startups e Soluções Locais",
    type: "Comunidade",
    stage: "Aberto",
    audience: "Startups, PMEs e autônomos tech",
    date: "2026-06-20",
    owner: "Comunidade"
  },
  {
    id: "fv-003",
    title: "Mentorias para MVP e validação",
    type: "Mentoria",
    stage: "Curadoria",
    audience: "Empreendedores em fase inicial",
    date: "2026-07-03",
    owner: "Rede de mentores"
  },
  {
    id: "fv-004",
    title: "Conexão universidade, empresa e talentos",
    type: "Programa",
    stage: "Em breve",
    audience: "Universidades, empresas e estudantes",
    date: "2026-07-18",
    owner: "Parceiros locais"
  },
  {
    id: "fv-005",
    title: "Demo night para investidores-anjo",
    type: "Capital",
    stage: "Em breve",
    audience: "Startups com tração inicial",
    date: "2026-08-01",
    owner: "Fênix Valley"
  }
];
