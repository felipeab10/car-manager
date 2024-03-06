CREATE TABLE `usuario_regras` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`usuario_id` bigint NOT NULL,
	`regra_id` bigint NOT NULL,
	CONSTRAINT `usuario_regras_id` PRIMARY KEY(`id`),
	CONSTRAINT `regraUsuario` UNIQUE(`usuario_id`,`regra_id`)
);
--> statement-breakpoint
ALTER TABLE `usuario_regras` ADD CONSTRAINT `usuario_regras_usuario_id_usuarios_id_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `usuario_regras` ADD CONSTRAINT `usuario_regras_regra_id_regras_id_fk` FOREIGN KEY (`regra_id`) REFERENCES `regras`(`id`) ON DELETE no action ON UPDATE no action;