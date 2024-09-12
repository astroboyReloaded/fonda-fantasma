const router = require('express').Router();

router.get('/', async (_, res, next) => {
  try {
    const response = await fetch(
      'https://orange-io-cms.onrender.com/api/especiales-data',
    );
    const productData = await response.json();
    res.render('product', { product: productData[0] });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
