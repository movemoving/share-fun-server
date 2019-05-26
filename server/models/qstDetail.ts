import { Schema, model, Types } from 'mongoose';

export interface IQstItem {
  num: number;
  type: string;
  title: string;
  options?: IOption[];
  required: boolean;
  replies?: { [key: string]: string[] };
}

export interface IOption {
  // id: string;
  value: string;
}

export interface IQstDetail {
  qstItems: IQstItem[];
  receivers: { [key in 'department' | 'account']?: string[] };
}

const QstItem = new Schema({
  num: Number,
  type: String,
  title: String,
  options: [{ value: String }],
  required: Boolean,
  replies: { type: Map, of: [String], default: {} },
});

// const Receivers = new Schema({
//   department: [String],
//   account: [String],
// });

const QstDetailSchema = new Schema(
  {
    questionId: { type: Types.ObjectId, ref: 'Question', required: true },
    qstItems: [QstItem],
    receivers: {
      department: [String],
      account: [String],
    },
  },
  { timestamps: true }
);

export default model('QstDetail', QstDetailSchema);