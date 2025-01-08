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

      orderIdCell.textContent = order.id;
      totalAmountCell.textContent = `$${order.totalAmount.toFixed(2)}`;

      const orderItems = JSON.parse(order.orderItems);
      orderItemsCell.textContent = orderItems
        .map((item) => `${item.name} (x${item.quantity}): $${item.subtotal}`)
        .join(", ");

      const userDetails = JSON.parse(order.userDetails);
      userDetailsCell.textContent = `Name: ${userDetails.name}, Email: ${userDetails.email}, Address: ${userDetails.address}, Zip Code: ${userDetails.zipCode}`;

      createdAtCell.textContent = new Date(order.createdAt).toLocaleString();
    });
  } catch (error) {
    console.error("Error loading orders:", error);
  }
});
