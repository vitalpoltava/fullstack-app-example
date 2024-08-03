/*
  Warnings:

  - The primary key for the `Warehouse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Warehouse` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Warehouse" (
    "city" TEXT NOT NULL,
    "stockId" TEXT NOT NULL,
    CONSTRAINT "Warehouse_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Warehouse" ("city", "stockId") SELECT "city", "stockId" FROM "Warehouse";
DROP TABLE "Warehouse";
ALTER TABLE "new_Warehouse" RENAME TO "Warehouse";
CREATE UNIQUE INDEX "Warehouse_stockId_key" ON "Warehouse"("stockId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
