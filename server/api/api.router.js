import { Router } from 'express';

import ItemById from './itemById.route.js';
import ItemsByQuery from './itemsByQuery.route.js';

const ItemsRouter = new Router();

// API: /api/items
ItemsRouter.get('/items', (req, res) => {
  const query = req.query.q;

  if (!!query) {
    ItemsByQuery(query, res);
  } else {
    res.status(400).send({
      error: 'Please add a \'search\' on the query URL.' });
  }
});

ItemsRouter.get('/items/:id', (req, res) => {
  const productId = req.params.id;
  if (!!productId) {
    ItemById(productId, res);
  } else {
    res.status(400).send({ error: 'Please specify the item ID provided.' });
  }
});


export default ItemsRouter;