
document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.getElementById("productGrid");
    const createProductBtn = document.getElementById("createProductBtn");
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));

    if (createProductBtn) {
        createProductBtn.addEventListener("click", () => {
            window.location.href = "/create-product"; 
        });
    } else {
        console.warn("Create Product Button not found");
    }

    try {
        const response = await fetch("http://localhost:5000/api/products/products");
        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.statusText}`);
        }
        const products = await response.json();
        productGrid.innerHTML = "";

        const table = document.createElement("table");
        table.classList.add("admin-table");
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        productGrid.appendChild(table);

        const tbody = table.querySelector("tbody");

        products.forEach((product) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td><img src="${product.imageUrl}" alt="${product.name}" class="product-image"></td>
                <td>${product.name}</td>
                <td>$${parseFloat(product.price).toFixed(2)}</td>
                <td>${product.rating}</td>
                <td>${product.quantity}</td>
                <td>
                    <button class="update-product btn btn-warning" data-id="${product.id}">Update</button>
                    <button class="delete-product btn btn-danger" data-id="${product.id}">Delete</button>
                </td>
            `;

            tbody.appendChild(row);
        });

        const deleteButtons = document.querySelectorAll(".delete-product");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const productId = e.target.dataset.id;
                const confirmDeleteModal = new bootstrap.Modal(document.getElementById('deleteProductModal'));
                const confirmDeleteButton = document.getElementById('confirmDeleteProduct');

                confirmDeleteButton.onclick = async () => {
                    await fetch(`http://localhost:5000/api/products/delete/${productId}`, {
                        method: "DELETE",
                    });

                    document.getElementById('successMessageContent').textContent = "Product deleted successfully!";
                    successModal.show();

                    setTimeout(() => window.location.reload(), 4000);
                };

                confirmDeleteModal.show();
            });
        });

        const updateButtons = document.querySelectorAll(".update-product");
        updateButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const productId = e.target.dataset.id;
                const productToUpdate = products.find(p => p.id == productId);

                if (productToUpdate) {
                    const updateModal = new bootstrap.Modal(document.getElementById("updateProductModal"));
                    const nameInput = document.getElementById("updateName");
                    const priceInput = document.getElementById("updatePrice");
                    const ratingInput = document.getElementById("updateRating");
                    const imageUrlInput = document.getElementById("updateImageUrl");
                    const quantityInput = document.getElementById("updateQuantity");

                    nameInput.value = productToUpdate.name;
                    priceInput.value = productToUpdate.price;
                    ratingInput.value = productToUpdate.rating;
                    imageUrlInput.value = productToUpdate.imageUrl;
                    quantityInput.value = productToUpdate.quantity;

                    updateModal.show();

                    document.getElementById("updateProductForm").onsubmit = async (e) => {
                        e.preventDefault();

                        const updatedName = nameInput.value;
                        const updatedPrice = parseFloat(priceInput.value);
                        const updatedRating = parseFloat(ratingInput.value);
                        const updatedImageUrl = imageUrlInput.value;
                        const updatedQuantity = parseInt(quantityInput.value);

                        const response = await fetch(`http://localhost:5000/api/update-product/${productId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: updatedName,
                                price: updatedPrice,
                                rating: updatedRating,
                                imageUrl: updatedImageUrl,
                                quantity: updatedQuantity,
                            }),
                        });

                        if (response.ok) {
                            document.getElementById('successMessageContent').textContent = "Product updated successfully!";
                            successModal.show();
                            setTimeout(() => window.location.reload(), 1500);
                        } else {
                            document.getElementById('errorMessageContent').textContent = "Failed to update product. Please try again.";
                            errorModal.show();
                        }
                    };
                } else {
                    document.getElementById('errorMessageContent').textContent = "Product not found.";
                    errorModal.show();
                }
            });
        });

    } catch (error) {
        console.error("Error loading products:", error);
        productGrid.innerHTML = '<p class="error">Failed to load products. Please try again later.</p>';
    }
});
