-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "levelReading" INTEGER NOT NULL DEFAULT 1,
    "levelWriting" INTEGER NOT NULL DEFAULT 1,
    "levelSpeaking" INTEGER NOT NULL DEFAULT 1,
    "levelListening" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");
