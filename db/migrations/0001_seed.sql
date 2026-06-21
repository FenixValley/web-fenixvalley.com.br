INSERT INTO opportunities (title, type, stage, audience, date, owner, status) VALUES
('Rodada de Ideias Betim Tech', 'Meetup', 'Aberto', 'Fundadores, estudantes e profissionais', '2026-06-12', 'Fênix Valley', 'published'),
('Mapa de Startups e Soluções Locais', 'Comunidade', 'Aberto', 'Startups, PMEs e autônomos tech', '2026-06-20', 'Comunidade', 'published'),
('Mentorias para MVP e validação', 'Mentoria', 'Curadoria', 'Empreendedores em fase inicial', '2026-07-03', 'Rede de mentores', 'published'),
('Conexão universidade, empresa e talentos', 'Programa', 'Em breve', 'Universidades, empresas e estudantes', '2026-07-18', 'Parceiros locais', 'published'),
('Demo night para investidores-anjo', 'Capital', 'Em breve', 'Startups com tração inicial', '2026-08-01', 'Fênix Valley', 'published');

INSERT INTO actors (name, type, segment, neighborhood, description, site, lat, lng, status) VALUES
('Fênix Valley', 'comunidade', 'Ecossistema de inovação', 'Centro', 'Comunidade que conecta startups, universidades, empresas e talentos de Betim. Ponto de referência aproximado.', 'https://fenixvalley.com.br', -19.9678, -44.1987, 'approved'),
('PUC Minas — Betim', 'universidade', 'Ensino superior', 'Angola', 'Campus da PUC Minas em Betim, com cursos de tecnologia e parcerias acadêmicas. Localização aproximada.', NULL, -19.9540, -44.1760, 'approved'),
('SENAI Betim', 'escola-tecnica', 'Formação técnica', 'Centro', 'Unidade do SENAI com formação técnica e profissionalizante. Localização aproximada.', NULL, -19.9700, -44.2030, 'approved'),
('Prefeitura de Betim', 'poder-publico', 'Gestão pública', 'Centro', 'Poder público municipal, interlocutor de políticas de inovação. Localização aproximada.', NULL, -19.9668, -44.1988, 'approved');
