import { EOrder } from './page-options.dto';

export interface IQSearch {
  qColumnNames?: string[];

  q?: string;
}

export interface IOrder {
  orderColumnName: string;

  order: EOrder;
}
