document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.createElement("div");
  formContainer.style.maxWidth = "400px";
  formContainer.style.margin = "20px auto";
  formContainer.style.padding = "20px";
  formContainer.style.backgroundColor = "#fff";
  formContainer.style.borderRadius = "8px";
  formContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";

  const form = document.createElement("form");
  form.id = "productForm";

  const createField = (
    labelText,
    inputType,
    inputId,
    inputName,
    isRequired = false
  ) => {
    const label = document.createElement("label");
    label.setAttribute("for", inputId);
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = inputType;
    input.id = inputId;
    input.name = inputName;
    if (isRequired) input.required = true;

    return { label, input };
  };

  const { label: nameLabel, input: nameInput } = createField(
    "Product Name:",
    "text",
    "name",
    "name",
    true
  );

  const { label: priceLabel, input: priceInput } = createField(
    "Price:",
    "number",
    "price",
    "price",
    true
  );
  priceInput.step = "0.01";

  const { label: ratingLabel, input: ratingInput } = createField(
    "Rating (1-5):",
    "number",
    "rating",
    "rating",
    true
  );
  ratingInput.min = "1";
  ratingInput.max = "5";

  const { label: imageUrlLabel, input: imageUrlInput } = createField(
    "Image URL:",
    "url",
    "imageUrl",
    "imageUrl",
    true
  );

  const { label: quantityLabel, input: quantityInput } = createField(
    "Quantity:",
    "number",
    "quantity",
    "quantity",
    true
  );
  quantityInput.min = "1";

  const { label: materialLabel, input: materialInput } = createField(
    "Material:",
    "text",
    "material",
    "material",
    false
  );

  const { label: careLabel, input: careInput } = createField(
    "Care Instructions:",
    "text",
    "care",
    "care",
    false
  );

  const { label: fitLabel, input: fitInput } = createField(
    "Fit:",
    "text",
    "fit",
    "fit",
    false
  );

  const { label: detailsLabel, input: detailsInput } = createField(
    "Details:",
    "text",
    "details",
    "details",
    false
  );

  const { label: recommendationsLabel, input: recommendationsInput } =
    createField(
      "Recommendations:",
      "text",
      "recommendations",
      "recommendations",
      true
    );

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Create Product";

  form.append(
    nameLabel,
    nameInput,
    priceLabel,
    priceInput,
    ratingLabel,
    ratingInput,
    imageUrlLabel,
    imageUrlInput,
    quantityLabel,
    quantityInput,
    materialLabel,
    materialInput,
    careLabel,
    careInput,
    fitLabel,
    fitInput,
    detailsLabel,
    detailsInput,
    recommendationsLabel,
    recommendationsInput,
    submitButton
  );

  formContainer.appendChild(form);

  const footer = document.querySelector("footer");
  if (footer) {
    footer.parentNode.insertBefore(formContainer, footer);
  } else {
    document.body.appendChild(formContainer);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const productData = {
      name: nameInput.value,
      price: parseFloat(priceInput.value),
      rating: parseInt(ratingInput.value),
      imageUrl: imageUrlInput.value,
      quantity: parseInt(quantityInput.value),
      material: materialInput.value,
      care: careInput.value,
      fit: fitInput.value,
      details: detailsInput.value,
      recommendations: recommendationsInput.value,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/products/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const data = await response.json();
      document.getElementById(
        "message"
      ).textContent = `Product Created: ${data.product.name}`;
    } catch (error) {
      document.getElementById(
        "message"
      ).textContent = `Error: ${error.message}`;
    }
  });
});
