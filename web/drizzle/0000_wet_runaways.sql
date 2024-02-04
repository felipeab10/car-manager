CREATE TABLE `users` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`nome` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	`ativo` boolean DEFAULT true,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `users` (`email`);