import { LoanModel, LoanSimulation } from '../models/loan';
import status from 'http-status';
import { NextFunction, Request, Response } from 'express';

const Simulate = (req: Request, res: Response, next: NextFunction) => {
    const loanSimulation: LoanSimulation = req.body;
    
    loanSimulation.monthsToPay > 360 
        && res.status(status.NOT_ACCEPTABLE).json({
            error: 'O prazo máximo para pagamento são de 30 anos.'
        });
    loanSimulation.requiredValue < 50000
        && res.status(status.NOT_ACCEPTABLE).json({
            error: 'O valor mínimo para empréstimo é de R$ 50.000,00.'
        });

    const installments: Array<{date: string, value: string}> = [];
    const date: Date = new Date();
    let fee: number = 0;
    let installment: number = (loanSimulation.requiredValue / loanSimulation.monthsToPay);

    switch (loanSimulation.uf) {
        case 'MG': fee = 1 / 100; break;
        case 'SP': fee = 0.80 / 100; break;
        case 'RJ': fee = 0.90 / 100; break;
        case 'ES': fee = 1.11 / 100; break;
        default: fee = 0; break;
    }

    for (let i = 0; i < loanSimulation.monthsToPay; i++) {
        date.setMonth(date.getMonth() + 1)
        installments.push({
            date: `${date.toLocaleDateString('en-GB')}`,
            value: (installment + (loanSimulation.requiredValue * fee)).toFixed(2)
        });
    }

    try {
        res.status(status.OK).json({
            name: loanSimulation.name,
            cpf: loanSimulation.cpf,
            uf: loanSimulation.uf,
            birthdate: loanSimulation.birthdate,
            requiredValue: loanSimulation.requiredValue,
            monthsToPay: loanSimulation.monthsToPay,
            fee: `${(fee * 100).toFixed(2)}%`,
            installments: installments,
            totalValueToPay: (loanSimulation.requiredValue + (loanSimulation.requiredValue * fee * loanSimulation.monthsToPay)).toFixed(2),
        });
    } catch (error) {
        next(error)
    }
    
}

const Insert = (req: Request, res: Response, next: NextFunction) => {
    const loan = req.body;

    LoanModel.create(loan)
        .then(createdLoan => {
            if (createdLoan) {
                res.status(status.OK).send(createdLoan)
            } else {
                res.status(status.NOT_FOUND).send()
            }
        })
        .catch(error => next(error))
}

const FetchAll = (req: Request, res: Response, next: NextFunction) => {
    LoanModel.findAll()
        .then(loans => {
            if (loans) {
                res.status(status.OK).send(loans)
            }
        })
        .catch(error => next(error))
}

export default { Simulate, Insert, FetchAll }
