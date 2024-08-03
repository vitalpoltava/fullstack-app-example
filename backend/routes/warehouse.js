const {PrismaClient} = require('@prisma/client')
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

/* GET warehouses list */
router.get('/', async (req, res, next) => {
  const cities = await prisma.warehouse.findMany()
  res.json(cities);
});

/* POST new product availability record */
router.post('/', async (req, res, next) => {
  const productId = req.body.productId;
  const warehouseIds = req.body.ids
  const data = warehouseIds.map((houseId) => ({productId, houseId}))
  const newRecord = await prisma.stock.createMany({data})

  res.json(newRecord);
})

router.delete('/', async (req, res, next) => {
  const productId = req.body.productId;
  const deletedRecords = await prisma.stock.deleteMany({
    where: {
      productId
    }
  })

  res.json(deletedRecords);
})

module.exports = router;
