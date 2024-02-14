CREATE TABLE `carros` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`marca_id` bigint NOT NULL,
	`modelo_id` bigint NOT NULL,
	`usuario_id` bigint NOT NULL,
	`ano` varchar(4),
	`placa` varchar(14),
	`renavam` varchar(60),
	`cor` varchar(60),
	`quantidade_portas` varchar(10),
	`combustivel` varchar(10),
	CONSTRAINT `carros_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `carros` ADD CONSTRAINT `carros_marca_id_marcas_id_fk` FOREIGN KEY (`marca_id`) REFERENCES `marcas`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `carros` ADD CONSTRAINT `carros_modelo_id_modelos_id_fk` FOREIGN KEY (`modelo_id`) REFERENCES `modelos`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `carros` ADD CONSTRAINT `carros_usuario_id_usuarios_id_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE no action ON UPDATE no action;