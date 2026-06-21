CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`mode` text NOT NULL,
	`location` text NOT NULL,
	`link` text,
	`audience` text,
	`schedule` text,
	`organizer` text NOT NULL,
	`organizer_email` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `events_slug_unique` ON `events` (`slug`);