-- CreateTable
CREATE TABLE "public"."SocialAccount" (
    "id" SERIAL NOT NULL,
    "platform" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "connectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SocialAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SocialAccount_userId_platform_key" ON "public"."SocialAccount"("userId", "platform");

-- AddForeignKey
ALTER TABLE "public"."SocialAccount" ADD CONSTRAINT "SocialAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
