-- AlterTable
ALTER TABLE "barcode_symbology" ADD COLUMN     "isActive" BOOL NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "product_brand" ADD COLUMN     "isActive" BOOL NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "product_category" ADD COLUMN     "isActive" BOOL NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "product_type" ADD COLUMN     "isActive" BOOL NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "product_unit" ADD COLUMN     "isActive" BOOL NOT NULL DEFAULT true;
