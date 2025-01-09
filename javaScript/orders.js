document.addEventListener("DOMContentLoaded", async () => {
  const ordersTableBody = document
    .getElementById("ordersTable")
    .getElementsByTagName("tbody")[0];

  try {
    const response = await fetch("http://localhost:5000/api/orders/all");
    if (!response.ok) {
      throw new Error("Failed to fetch orders.");
    }

    const orders = await response.json();
    ordersTableBody.innerHTML = "";

    orders.forEach((order) => {
      const row = ordersTableBody.insertRow();

      const orderIdCell = row.insertCell(0);
      const totalAmountCell = row.insertCell(1);
      const orderItemsCell = row.insertCell(2);
      const userDetailsCell = row.insertCell(3);
      const createdAtCell = row.insertCell(4);
      const statusCell = row.insertCell(5);
      const actionsCell = row.insertCell(6);

      orderIdCell.textContent = order.id;
      totalAmountCell.textContent = `$${order.totalAmount.toFixed(2)}`;

      const orderItems = JSON.parse(order.orderItems);
      orderItemsCell.textContent = orderItems
        .map((item) => `${item.name} (x${item.quantity}): $${item.subtotal}`)
        .join(", ");

      const userDetails = JSON.parse(order.userDetails);
      userDetailsCell.textContent = `Name: ${userDetails.name}, Email: ${userDetails.email}, Address: ${userDetails.address}, Zip Code: ${userDetails.zipCode}`;

      createdAtCell.textContent = new Date(order.createdAt).toLocaleString();

      const statusButton = document.createElement("button");
      statusButton.classList.add("ship");
      if (order.status === "Shipped") {
        statusButton.textContent = "Order Shipped";
        statusButton.disabled = true;
      } else if (order.status === "Received") {
        statusButton.textContent = "Order Received";
        statusButton.disabled = true;
      } else {
        statusButton.textContent = "Ship Order";
        statusButton.onclick = () =>
          updateOrderStatus(order.id, "Shipped", row, statusButton);
      }
      statusCell.appendChild(statusButton);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete");
      deleteButton.onclick = () => deleteOrder(order.id, row);
      actionsCell.appendChild(deleteButton);
    });
  } catch (error) {
    console.error("Error loading orders:", error);
  }
});

async function updateOrderStatus(orderId, status, row, statusButton) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/${orderId}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );

    if (response.ok) {
      const updatedOrder = await response.json();
      statusButton.textContent = "Order Shipped";
      statusButton.disabled = true;
    } else {
      throw new Error(`Failed to update order status: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    alert("Failed to update order status.");
  }
}

async function deleteOrder(orderId, row) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/${orderId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      row.remove();
    } else {
      throw new Error(`Failed to delete order: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    alert("Failed to delete order.");
  }
}
