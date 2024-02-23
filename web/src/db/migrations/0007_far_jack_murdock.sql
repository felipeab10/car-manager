CREATE TABLE `ordem_servicos` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`carro_id` bigint NOT NULL,
	`pecas` json,
	`estabelecimento_servico` varchar(256) NOT NULL,
	`data` date NOT NULL,
	`valor_servico` varchar(256),
	`carro_km` varchar(256),
	`observacao` varchar(256),
	`servicos` json,
	CONSTRAINT `ordem_servicos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pecas` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`nome` varchar(256) NOT NULL,
	CONSTRAINT `pecas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `ordem_servicos` ADD CONSTRAINT `ordem_servicos_carro_id_carros_id_fk` FOREIGN KEY (`carro_id`) REFERENCES `carros`(`id`) ON DELETE no action ON UPDATE no action;