ALTER TABLE `actors` ADD `slug` text;--> statement-breakpoint
UPDATE `actors` SET `slug` = 'fenix-valley' WHERE `name` = 'Fênix Valley' AND `slug` IS NULL;--> statement-breakpoint
UPDATE `actors` SET `slug` = 'puc-minas-betim' WHERE `name` = 'PUC Minas — Betim' AND `slug` IS NULL;--> statement-breakpoint
UPDATE `actors` SET `slug` = 'senai-betim' WHERE `name` = 'SENAI Betim' AND `slug` IS NULL;--> statement-breakpoint
UPDATE `actors` SET `slug` = 'prefeitura-de-betim' WHERE `name` = 'Prefeitura de Betim' AND `slug` IS NULL;--> statement-breakpoint
UPDATE `actors` SET `slug` = 'organizacao-' || `id` WHERE `slug` IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `actors_slug_unique` ON `actors` (`slug`);