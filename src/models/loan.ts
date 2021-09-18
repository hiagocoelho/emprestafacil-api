import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../database/database"

export type LoanSimulation = {
    name: string
    cpf: string
    uf: string
    birthdate: string
    requiredValue: number
    monthsToPay: number
}

export interface Loan {
    id?: number;
    name: string;
    cpf: string;
    uf: string;
    birthdate: string;
    requiredValue: number;
    monthsToPay: number;
    fee: string;
    installments: Array<{date: string, value: number}>;
    totalValueToPay: string;
}

interface LoanCreationAttributes extends Optional<Loan, "id"> {}
interface LoanInstance extends Model <Loan, LoanCreationAttributes>, Loan {}

export const LoanModel = sequelize.define<LoanInstance>("loan", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    cpf: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    uf: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    birthdate: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    requiredValue: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    monthsToPay: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    fee: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    installments: {
        allowNull: false,
        type: DataTypes.JSON,
    },
    totalValueToPay: {
        allowNull: false,
        type: DataTypes.STRING,
    }
});
