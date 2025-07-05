// models/budget.ts
import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IBudget extends Document {
  category: string;
  amount: number;
  month: string; // Format: "YYYY-MM"
}

const BudgetSchema: Schema<IBudget> = new Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true },
});

export const Budget = models.Budget || model<IBudget>('Budget', BudgetSchema);
