/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `product_category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `product_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_category" ADD COLUMN     "code" STRING NOT NULL;
ALTER TABLE "product_category" ADD COLUMN     "description" STRING;
ALTER TABLE "product_category" ADD COLUMN     "parent_category" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "product_category_code_key" ON "product_category"("code");

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_parent_category_fkey" FOREIGN KEY ("parent_category") REFERENCES "product_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
