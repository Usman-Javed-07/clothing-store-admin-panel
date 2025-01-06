document.addEventListener("DOMContentLoaded", async () => {
    const ordersTableBody = document.getElementById("ordersTable").getElementsByTagName('tbody')[0];
  
    try {
      const response = await fetch("http://localhost:5000/api/orders/all");
      if (!response.ok) {
        throw new Error("Failed to fetch orders.");
      }
  
      const orders = await response.json();
      ordersTableBody.innerHTML = '';
  
      orders.forEach(order => {
        const row = ordersTableBody.insertRow();
  
        const orderIdCell = row.insertCell(0);
        const totalAmountCell = row.insertCell(1);
        const orderItemsCell = row.insertCell(2);
        const createdAtCell = row.insertCell(3);
  
        orderIdCell.textContent = order.id;
        totalAmountCell.textContent = `$${order.totalAmount.toFixed(2)}`;
        orderItemsCell.textContent = JSON.stringify(order.orderItems); 
        createdAtCell.textContent = new Date(order.createdAt).toLocaleString();
      });
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  });
  