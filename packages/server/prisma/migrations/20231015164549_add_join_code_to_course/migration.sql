/*
  Warnings:

  - A unique constraint covering the columns `[joinCode]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `joinCode` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "joinCode" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_joinCode_key" ON "Course"("joinCode");
