CREATE TABLE `program_applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`program_slug` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`organization` text,
	`motivation` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `program_settings` (
	`slug` text PRIMARY KEY NOT NULL,
	`inscriptions_open` integer DEFAULT 0 NOT NULL
);
