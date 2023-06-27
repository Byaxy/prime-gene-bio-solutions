-- CreateTable
CREATE TABLE "product" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" STRING NOT NULL,
    "name" STRING NOT NULL,
    "images" STRING[],
    "cost" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "alert_quantity" DECIMAL(65,30) NOT NULL,
    "details" STRING,
    "type" UUID NOT NULL,
    "unit_of_measure" UUID NOT NULL,
    "brand" UUID NOT NULL,
    "category" UUID NOT NULL,
    "barcode_symbology" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_brand" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_type" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barcode_symbology" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "barcode_symbology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_unit" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_unit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_code_key" ON "product"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_brand_name_key" ON "product_brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_category_name_key" ON "product_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_type_name_key" ON "product_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "barcode_symbology_name_key" ON "barcode_symbology"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_unit_name_key" ON "product_unit"("name");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_type_fkey" FOREIGN KEY ("type") REFERENCES "product_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_unit_of_measure_fkey" FOREIGN KEY ("unit_of_measure") REFERENCES "product_unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_brand_fkey" FOREIGN KEY ("brand") REFERENCES "product_brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_fkey" FOREIGN KEY ("category") REFERENCES "product_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_barcode_symbology_fkey" FOREIGN KEY ("barcode_symbology") REFERENCES "barcode_symbology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
