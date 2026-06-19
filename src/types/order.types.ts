export type OrderStatus = "Pending" |
                          "Cancelled" |
                          "Accepted" |
                          "Updated"

export interface Customer {
    readonly name: string;
    readonly id: number,
    readonly email: string;
    readonly phone: number;
}


export interface InventoryItem {
    readonly id: number;
    readonly name: string;
    readonly quantity: number;
}

export interface Order {
    readonly id: number;
    readonly item: InventoryItem;
    readonly quantity: number;
    readonly customer: Customer;
    readonly status: OrderStatus;
}

export interface Inventory {
    readonly [itemName: string]: InventoryItem;
}
