const router = require('express').Router();

router.get('/', async (_, res, next) => {
  try {
    const response = await fetch(
      'https://astroboyreloaded.github.io/FF_API/especial.json',
    );
    const productData = await response.json();
    res.render('product', { product: productData });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
