import { EOrderProps } from '@libs/constant';

export interface IQSearch {
  qColumnNames?: string[];

  q?: string;
}

export interface IOrder {
  orderColumnName: string;

  order: EOrderProps;
}
