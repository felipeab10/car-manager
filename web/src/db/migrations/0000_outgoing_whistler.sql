CREATE TABLE `usuarios` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`nome` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`imagem_profile` varchar(256),
	`password` varchar(256) NOT NULL,
	`ativo` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `usuarios_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `usuarios` (`email`);