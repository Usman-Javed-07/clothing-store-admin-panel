
// document.addEventListener("DOMContentLoaded", () => {
//   // Create form container
//   const formContainer = document.createElement('div');
//   formContainer.style.maxWidth = "400px";
//   formContainer.style.margin = "20px auto";
//   formContainer.style.padding = "20px";
//   formContainer.style.backgroundColor = "#fff";
//   formContainer.style.borderRadius = "8px";
//   formContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
// //   formContainer.style.position = "relative";

//   const form = document.createElement('form');
//   form.id = 'productForm';

//   // Product Name Field
//   const nameLabel = document.createElement('label');
//   nameLabel.setAttribute('for', 'name');
//   nameLabel.textContent = 'Product Name:';
//   const nameInput = document.createElement('input');
//   nameInput.type = 'text';
//   nameInput.id = 'name';
//   nameInput.name = 'name';
//   nameInput.required = true;

//   // Price Field
//   const priceLabel = document.createElement('label');
//   priceLabel.setAttribute('for', 'price');
//   priceLabel.textContent = 'Price:';
//   const priceInput = document.createElement('input');
//   priceInput.type = 'number';
//   priceInput.id = 'price';
//   priceInput.name = 'price';
//   priceInput.step = '0.01';
//   priceInput.required = true;

//   // Rating Field
//   const ratingLabel = document.createElement('label');
//   ratingLabel.setAttribute('for', 'rating');
//   ratingLabel.textContent = 'Rating (1-5):';
//   const ratingInput = document.createElement('input');
//   ratingInput.type = 'number';
//   ratingInput.id = 'rating';
//   ratingInput.name = 'rating';
//   ratingInput.min = '1';
//   ratingInput.max = '5';
//   ratingInput.required = true;

//   // Image URL Field
//   const imageUrlLabel = document.createElement('label');
//   imageUrlLabel.setAttribute('for', 'imageUrl');
//   imageUrlLabel.textContent = 'Image URL:';
//   const imageUrlInput = document.createElement('input');
//   imageUrlInput.type = 'url';
//   imageUrlInput.id = 'imageUrl';
//   imageUrlInput.name = 'imageUrl';
//   imageUrlInput.required = true;

//   // Quantity Field
//   const quantityLabel = document.createElement('label');
//   quantityLabel.setAttribute('for', 'quantity');
//   quantityLabel.textContent = 'Quantity:';
//   const quantityInput = document.createElement('input');
//   quantityInput.type = 'number';
//   quantityInput.id = 'quantity';
//   quantityInput.name = 'quantity';
//   quantityInput.min = '1';
//   quantityInput.required = true;

//   // Submit Button
//   const submitButton = document.createElement('button');
//   submitButton.type = 'submit';
//   submitButton.textContent = 'Create Product';

//   form.append(nameLabel, nameInput, priceLabel, priceInput, ratingLabel, ratingInput, imageUrlLabel, imageUrlInput, quantityLabel, quantityInput, submitButton);

//   formContainer.appendChild(form);

//   const footer = document.querySelector('footer');
//   if (footer) {
//       footer.parentNode.insertBefore(formContainer, footer);
//   } else {
//       document.body.appendChild(formContainer);
//   }

//   form.addEventListener('submit', async (e) => {
//       e.preventDefault();
  
//       const name = nameInput.value;
//       const price = parseFloat(priceInput.value);
//       const rating = parseInt(ratingInput.value);
//       const imageUrl = imageUrlInput.value;
//       const quantity = parseInt(quantityInput.value);
  
//       try {
//           const response = await fetch("http://localhost:5000/api/products/create", {
//               method: "POST",
//               headers: {
//                   "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ name, price, rating, imageUrl, quantity }),
//           });
  
//           if (!response.ok) {
//               throw new Error('Failed to create product');
//           }
  
//           const data = await response.json();
//           document.getElementById('message').textContent = `Product Created: ${data.product.name}`;
//       } catch (error) {
//           document.getElementById('message').textContent = `Error: ${error.message}`;
//       }
//   });
// });



document.addEventListener("DOMContentLoaded", () => {
    // Create form container
    const formContainer = document.createElement('div');
    formContainer.style.maxWidth = "400px";
    formContainer.style.margin = "20px auto";
    formContainer.style.padding = "20px";
    formContainer.style.backgroundColor = "#fff";
    formContainer.style.borderRadius = "8px";
    formContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
  
    const form = document.createElement('form');
    form.id = 'productForm';
  
    // Helper function to create a labeled input field
    const createField = (labelText, inputType, inputId, inputName, isRequired = false) => {
      const label = document.createElement('label');
      label.setAttribute('for', inputId);
      label.textContent = labelText;
  
      const input = document.createElement('input');
      input.type = inputType;
      input.id = inputId;
      input.name = inputName;
      if (isRequired) input.required = true;
  
      return { label, input };
    };
  
    // Product Name Field
    const { label: nameLabel, input: nameInput } = createField('Product Name:', 'text', 'name', 'name', true);
  
    // Price Field
    const { label: priceLabel, input: priceInput } = createField('Price:', 'number', 'price', 'price', true);
    priceInput.step = '0.01';
  
    // Rating Field
    const { label: ratingLabel, input: ratingInput } = createField('Rating (1-5):', 'number', 'rating', 'rating', true);
    ratingInput.min = '1';
    ratingInput.max = '5';
  
    // Image URL Field
    const { label: imageUrlLabel, input: imageUrlInput } = createField('Image URL:', 'url', 'imageUrl', 'imageUrl', true);
  
    // Quantity Field
    const { label: quantityLabel, input: quantityInput } = createField('Quantity:', 'number', 'quantity', 'quantity', true);
    quantityInput.min = '1';
  
    // Material Field
    const { label: materialLabel, input: materialInput } = createField('Material:', 'text', 'material', 'material', true);
  
    // Care Instructions Field
    const { label: careLabel, input: careInput } = createField('Care Instructions:', 'text', 'care', 'care', true);
  
    // Fit Field
    const { label: fitLabel, input: fitInput } = createField('Fit:', 'text', 'fit', 'fit', true);
  
    // Details Field
    const { label: detailsLabel, input: detailsInput } = createField('Details:', 'text', 'details', 'details', true);
  
    // Recommendations Field
    const { label: recommendationsLabel, input: recommendationsInput } = createField('Recommendations:', 'text', 'recommendations', 'recommendations', true);
  
    // Submit Button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Create Product';
  
    // Append all fields to the form
    form.append(
      nameLabel, nameInput,
      priceLabel, priceInput,
      ratingLabel, ratingInput,
      imageUrlLabel, imageUrlInput,
      quantityLabel, quantityInput,
      materialLabel, materialInput,
      careLabel, careInput,
      fitLabel, fitInput,
      detailsLabel, detailsInput,
      recommendationsLabel, recommendationsInput,
      submitButton
    );
  
    formContainer.appendChild(form);
  
    const footer = document.querySelector('footer');
    if (footer) {
      footer.parentNode.insertBefore(formContainer, footer);
    } else {
      document.body.appendChild(formContainer);
    }
  
    form.addEventListener('submit', async (e) => {
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
        const response = await fetch("http://localhost:5000/api/products/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create product');
        }
  
        const data = await response.json();
        document.getElementById('message').textContent = `Product Created: ${data.product.name}`;
      } catch (error) {
        document.getElementById('message').textContent = `Error: ${error.message}`;
      }
    });
  });
  