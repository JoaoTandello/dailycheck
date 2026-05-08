/*
  Warnings:

  - You are about to drop the column `data_fim` on the `tarefas` table. All the data in the column will be lost.
  - You are about to drop the column `data_inicio` on the `tarefas` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `tarefas` table. All the data in the column will be lost.
  - Added the required column `fim` to the `Tarefas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagem` to the `Tarefas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inicio` to the `Tarefas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tarefas` DROP COLUMN `data_fim`,
    DROP COLUMN `data_inicio`,
    DROP COLUMN `img`,
    ADD COLUMN `fim` VARCHAR(191) NOT NULL,
    ADD COLUMN `imagem` VARCHAR(191) NOT NULL,
    ADD COLUMN `inicio` VARCHAR(191) NOT NULL;
