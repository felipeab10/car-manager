ALTER TABLE `carros` MODIFY COLUMN `placa` varchar(14) NOT NULL;--> statement-breakpoint
ALTER TABLE `marcas` ADD CONSTRAINT `nomeUnique` UNIQUE(`nome`);--> statement-breakpoint
ALTER TABLE `modelos` ADD CONSTRAINT `nomeUnique` UNIQUE(`nome`);--> statement-breakpoint
ALTER TABLE `usuarios` ADD CONSTRAINT `emailUnique` UNIQUE(`email`);