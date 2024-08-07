const {PrismaClient} = require('@prisma/client')
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

/* GET products list */
router.get('/', async (req, res, next) => {
  const products = await prisma.product.findMany({
    include: {
      stock: {
        select: {
          house: {
            select: {
              city: true
            }
          }
        }
      }
    }
  })
  res.json(products);
});

router.post('/', async (req, res, next) => {
  const newProduct = await prisma.product.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      price: parseInt(req.body.price, 10)
    }
  })

  res.json(newProduct);
})

router.put('/', async (req, res, next) => {
  const updatedProduct = await prisma.product.update({
    where: {
      id: parseInt(req.body.id, 10),
    },
    data: {
      name: req.body.name,
      description: req.body.description,
      price: parseInt(req.body.price, 10)
    }
  })

  res.json(updatedProduct);
})

router.delete('/', async (req, res, next) => {
  const productId = parseInt(req.body.productId, 10);
  const deletedRecords = await prisma.product.delete({
    where: {
      id: productId
    }
  })

  res.json(deletedRecords);
})

module.exports = router;
