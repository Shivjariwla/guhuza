/*
  Warnings:

  - You are about to drop the column `UploadRequired` on the `milestone` table. All the data in the column will be lost.
  - You are about to drop the column `Temp_Score` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `user_Id` on the `player` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Milestone_Button_CTA` to the `Milestone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Milestone_Link` to the `Milestone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Milestone_reward_message` to the `Milestone` table without a default value. This is not possible if the table is not empty.
  - Made the column `Level_Id` on table `player` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Milestone_Id` on table `player` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `player` DROP FOREIGN KEY `Player_Level_Id_fkey`;

-- DropForeignKey
ALTER TABLE `player` DROP FOREIGN KEY `Player_Milestone_Id_fkey`;

-- DropForeignKey
ALTER TABLE `player` DROP FOREIGN KEY `Player_user_Id_fkey`;

-- DropIndex
DROP INDEX `Player_user_Id_key` ON `player`;

-- AlterTable
ALTER TABLE `milestone` DROP COLUMN `UploadRequired`,
    ADD COLUMN `Milestone_Button_CTA` VARCHAR(191) NOT NULL,
    ADD COLUMN `Milestone_Link` VARCHAR(191) NOT NULL,
    ADD COLUMN `Milestone_reward_message` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `player` DROP COLUMN `Temp_Score`,
    DROP COLUMN `user_Id`,
    ADD COLUMN `email` VARCHAR(191) NULL,
    MODIFY `Playerpoint` INTEGER NOT NULL DEFAULT 0,
    MODIFY `streak` INTEGER NOT NULL DEFAULT 1,
    MODIFY `lastLogin` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `Level_Id` INTEGER NOT NULL DEFAULT 1,
    MODIFY `Milestone_Id` INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE `user`;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_Level_Id_fkey` FOREIGN KEY (`Level_Id`) REFERENCES `Level`(`Level_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_Milestone_Id_fkey` FOREIGN KEY (`Milestone_Id`) REFERENCES `Milestone`(`Milestone_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `player` RENAME INDEX `Player_Level_Id_fkey` TO `Player_Level_Id_idx`;

-- RenameIndex
ALTER TABLE `player` RENAME INDEX `Player_Milestone_Id_fkey` TO `Player_Milestone_Id_idx`;
