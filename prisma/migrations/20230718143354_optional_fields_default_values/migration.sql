/*
  Warnings:

  - You are about to drop the column `barcode_symbology` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `product_brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `product_unit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `product_brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `product_unit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_barcode_symbology_fkey";

-- AlterTable
ALTER TABLE "barcode_symbology" ALTER COLUMN "created_at" DROP NOT NULL;
ALTER TABLE "barcode_symbology" ALTER COLUMN "updated_at" DROP NOT NULL;
ALTER TABLE "barcode_symbology" ALTER COLUMN "isActive" DROP NOT NULL;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "barcode_symbology";
ALTER TABLE "product" ALTER COLUMN "created_at" DROP NOT NULL;
ALTER TABLE "product" ALTER COLUMN "updated_at" DROP NOT NULL;
ALTER TABLE "product" ALTER COLUMN "isActive" DROP NOT NULL;

-- AlterTable
ALTER TABLE "product_brand" ADD COLUMN     "code" STRING NOT NULL;
ALTER TABLE "product_brand" ADD COLUMN     "image" STRING;
ALTER TABLE "product_brand" ALTER COLUMN "created_at" DROP NOT NULL;
ALTER TABLE "product_brand" ALTER COLUMN "updated_at" DROP NOT NULL;
ALTER TABLE "product_brand" ALTER COLUMN "isActive" DROP NOT NULL;

-- AlterTable
ALTER TABLE "product_category" ALTER COLUMN "created_at" DROP NOT NULL;
ALTER TABLE "product_category" ALTER COLUMN "updated_at" DROP NOT NULL;
ALTER TABLE "product_category" ALTER COLUMN "isActive" DROP NOT NULL;

-- AlterTable
ALTER TABLE "product_type" ADD COLUMN     "description" STRING;
ALTER TABLE "product_type" ALTER COLUMN "created_at" DROP NOT NULL;
ALTER TABLE "product_type" ALTER COLUMN "updated_at" DROP NOT NULL;
ALTER TABLE "product_type" ALTER COLUMN "isActive" DROP NOT NULL;

-- AlterTable
ALTER TABLE "product_unit" ADD COLUMN     "code" STRING NOT NULL;
ALTER TABLE "product_unit" ALTER COLUMN "created_at" DROP NOT NULL;
ALTER TABLE "product_unit" ALTER COLUMN "updated_at" DROP NOT NULL;
ALTER TABLE "product_unit" ALTER COLUMN "isActive" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL;
ALTER TABLE "users" ALTER COLUMN "created_at" DROP NOT NULL;
ALTER TABLE "users" ALTER COLUMN "updated_at" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_brand_code_key" ON "product_brand"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_unit_code_key" ON "product_unit"("code");
