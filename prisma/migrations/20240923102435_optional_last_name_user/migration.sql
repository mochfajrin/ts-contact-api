-- DropIndex
DROP INDEX "contacts_phone_key";

-- AlterTable
ALTER TABLE "contacts" ALTER COLUMN "last_name" DROP NOT NULL;
