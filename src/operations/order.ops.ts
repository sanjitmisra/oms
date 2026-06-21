import { Order, OrderStatus, Inventory, InventoryItem , Customer} from "../types/order.types";

// Accept a new order. Need the order object definition here
export const newOrder = (
    id: number,
    item: InventoryItem,
    quantity: number,
    customer: Customer
): Order => {
    return {
        id, 
        item,
        customer, 
        status: "Accepted"
    };
}

// Update Inventory
export const updateInventory = (order: Order, inventory: Inventory): {updatedOrder: Order, updatedInventory: Inventory} => {
    
    const orderedItemName = order.item.name;
    let inventoryLevel = 0;


    // Check if the requested item exists in the inventory
    if(orderedItemName in inventory){
        inventoryLevel = inventory[orderedItemName].quantity || 0;
    }
    else return {
        updatedInventory: inventory,
        updatedOrder: {...order, status: "Cancelled"}
    }

    // Check if there is sufficient stock
    if (inventoryLevel < order.item.quantity) {
        console.log("Out of stock.");

        return {
            updatedInventory: inventory,
            updatedOrder: {...order, status: "Cancelled"}
        };
    }
    
    const newStockQuantity = inventoryLevel - order.item.quantity;
    const updatedInventoryItem: InventoryItem = {...order.item, quantity: newStockQuantity };

    // Update the inventory level
    const updatedInventory: Inventory = {
        ...inventory,
        [orderedItemName] : updatedInventoryItem,
    };

    // Update the order status and return
    const updatedOrder: Order = {
        ...order,
        status: "Updated",
    }
    return {updatedOrder, updatedInventory};
};


// Change Order Status
export const udpateOrderStatus = (order: Order, modifiedOrder: Partial<Pick<Order, "quantity" | "item">>) : Order => {
    let updatedOrder: Order = { ...order, ...modifiedOrder, status: "Pending" };
    return updatedOrder;
};