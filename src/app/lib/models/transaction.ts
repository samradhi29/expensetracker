
import mongoose, { Schema, Document, models, model } from 'mongoose';

// 1. Interface name 
export interface IExpense extends Document {
  typeofexpense: string;
  description: string;
  date: Date;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Schema definition
const ExpenseSchema: Schema<IExpense> = new Schema(
  {
    typeofexpense: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);


export const Expense = models.Expense || model<IExpense>('Expense', ExpenseSchema);
