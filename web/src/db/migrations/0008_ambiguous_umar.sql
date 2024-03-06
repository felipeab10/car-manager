CREATE TABLE `permissoes` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`nome` varchar(256) NOT NULL,
	`descricao` varchar(256) NOT NULL,
	`ativo` boolean DEFAULT true,
	CONSTRAINT `permissoes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `regra_permissoes` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`regra_id` bigint NOT NULL,
	`permissao_id` bigint NOT NULL,
	CONSTRAINT `regra_permissoes_id` PRIMARY KEY(`id`),
	CONSTRAINT `PermissionUnique` UNIQUE(`regra_id`,`permissao_id`)
);
--> statement-breakpoint
CREATE TABLE `regras` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`nome` varchar(256) NOT NULL,
	`descricao` varchar(256) NOT NULL,
	CONSTRAINT `regras_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `regra_permissoes` ADD CONSTRAINT `regra_permissoes_regra_id_regras_id_fk` FOREIGN KEY (`regra_id`) REFERENCES `regras`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `regra_permissoes` ADD CONSTRAINT `regra_permissoes_permissao_id_permissoes_id_fk` FOREIGN KEY (`permissao_id`) REFERENCES `permissoes`(`id`) ON DELETE no action ON UPDATE no action;