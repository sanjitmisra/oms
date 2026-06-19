import { Order, Inventory } from "../types/order.types";

export interface AppState {
    readonly orders: readonly Order[];
    readonly inventory: Inventory;
}