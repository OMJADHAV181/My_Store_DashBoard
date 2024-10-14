-- CreateTable
CREATE TABLE "ProductTransaction" (
    "Id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "Description" VARCHAR(900) NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "Category" TEXT NOT NULL,
    "Sold" BOOLEAN NOT NULL,
    "Image" TEXT,

    CONSTRAINT "ProductTransaction_pkey" PRIMARY KEY ("Id")
);
