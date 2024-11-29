-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coluna" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,

    CONSTRAINT "Coluna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Processo" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "dataAtualizacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataPublicacao" TIMESTAMP(3) NOT NULL,
    "colunaId" TEXT NOT NULL,

    CONSTRAINT "Processo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Processo" ADD CONSTRAINT "Processo_colunaId_fkey" FOREIGN KEY ("colunaId") REFERENCES "Coluna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
