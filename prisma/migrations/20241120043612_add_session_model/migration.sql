-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "musicalType" TEXT NOT NULL,
    "desiredCapabilities" TEXT NOT NULL,
    "organizerContact" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
