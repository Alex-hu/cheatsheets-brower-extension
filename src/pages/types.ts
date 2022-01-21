/* tslint:disable */
/* eslint-disable */

/**
 * local storage structure.
 */
export interface StorageDrawerData<T> {
  /** storage key. */
  key: string;
  /** real data. */
  data: T;
}

export interface ToggleStatus {
  open: boolean;
}

export interface CheatSheetData {
  /** name */
  name: string;
  /** label */
  label: string;
  /** link to resource */
  link?: string;
  /** content: can be copied. */
  content: string;
  /** order: used by sort */
  order: number;
  /** type */
  type: string;
  /** create time */
  createTime: Date;
  /** modify time */
  modifyTime: Date;
  /** url pattern: show this cheatsheet when url matched. */
  url?: string;
}
