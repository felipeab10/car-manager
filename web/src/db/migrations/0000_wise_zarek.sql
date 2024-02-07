CREATE TABLE `usuarios` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`nome` varchar(191),
	`email` varchar(191) NOT NULL,
	`imagem_profile` varchar(191),
	`password` varchar(191) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `usuarios_id` PRIMARY KEY(`id`),
	CONSTRAINT `users__email__idx` UNIQUE(`email`)
);
