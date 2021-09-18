import express from 'express';
import loanController from '../controllers/loanController';

const loanRouter = express.Router();

loanRouter.get('/loan', loanController.FetchAll);
loanRouter.post('/loan/simulate', loanController.Simulate);
loanRouter.post('/loan/create', loanController.Insert);

export default loanRouter;
