CREATE TABLE `marcas` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`nome` varchar(256) NOT NULL,
	CONSTRAINT `marcas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `modelos` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`nome` varchar(256) NOT NULL,
	`marca_id` bigint NOT NULL,
	CONSTRAINT `modelos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
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
CREATE INDEX `nome_idx` ON `marcas` (`nome`);--> statement-breakpoint
CREATE INDEX `nome_idx` ON `modelos` (`nome`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `usuarios` (`email`);--> statement-breakpoint
ALTER TABLE `modelos` ADD CONSTRAINT `modelos_marca_id_marcas_id_fk` FOREIGN KEY (`marca_id`) REFERENCES `marcas`(`id`) ON DELETE no action ON UPDATE no action;