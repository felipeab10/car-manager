ALTER TABLE `usuarios` MODIFY COLUMN `ativo` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `usuarios` ADD `active_token` varchar(256);