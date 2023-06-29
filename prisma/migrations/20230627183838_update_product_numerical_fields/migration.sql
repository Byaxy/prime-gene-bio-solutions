/*
  Warnings:

  - Changed the type of `cost` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `price` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `quantity` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `alert_quantity` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "cost";
ALTER TABLE "product" ADD COLUMN     "cost" INT4 NOT NULL;
ALTER TABLE "product" DROP COLUMN "price";
ALTER TABLE "product" ADD COLUMN     "price" INT4 NOT NULL;
ALTER TABLE "product" DROP COLUMN "quantity";
ALTER TABLE "product" ADD COLUMN     "quantity" INT4 NOT NULL;
ALTER TABLE "product" DROP COLUMN "alert_quantity";
ALTER TABLE "product" ADD COLUMN     "alert_quantity" INT4 NOT NULL;
