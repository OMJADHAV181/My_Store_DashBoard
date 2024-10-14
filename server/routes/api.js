import {Router} from 'express'
import TransController from '../Controller/Transaction.js';

const routes = Router();

routes.get('/txn',TransController.store);
routes.get('/transactions',TransController.index)
routes.put('/txn',TransController.update)
routes.get('/txn/statistics',TransController.getStatistics)
routes.get('/txn/range/statistics',TransController.getPriceRange)
routes.get('/txn/unq/category',TransController.getuniquecategory)

export default routes;