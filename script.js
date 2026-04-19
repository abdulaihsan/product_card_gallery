let products = [
            {
                id: 1,
                name: "Wireless Headphones",
                price: "129.99",
                description: "Hi-Fi audio with active noise cancellation and a 30-hour battery life.",
                image: "headphones.jpeg"
            },
            {
                id: 2,
                name: "Smartwatch Pro",
                price: "199.99",
                description: "Track your fitness, heart rate, and sleep patterns with this water-resistant device.",
                image: "smartwatch.jpeg"
            },
            {
                id: 3,
                name: "Mechanical Keyboard",
                price: "89.99",
                description: "Tactile mechanical keyboard with customizable RGB backlighting and ergonomic wrist rest.",
                image: "keyboard.jpeg"
            }
        ];

        const renderProducts = () => {
            const gallery = document.getElementById('gallery-container');
            gallery.innerHTML = '';
            
            products.forEach(product => {
                gallery.innerHTML += `
                    <div class="col-12 col-md-4">
                        <div class="card h-100 shadow-sm border-0">
                            <div class="ratio ratio-4x3">
                                <img src="${product.image}" class="card-img-top object-fit-cover" alt="${product.name}">
                            </div>
                            <div class="card-body d-flex flex-column">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h5 class="card-title mb-0">${product.name}</h5>
                                    <span class="badge bg-primary fs-6">$${product.price}</span>
                                </div>
                                <p class="card-text text-muted mb-4">${product.description}</p>
                                <div class="mt-auto d-flex gap-2">
                                    <button class="btn btn-outline-dark w-100">Add to Cart</button>
                                    <button class="btn btn-danger w-100" onclick="deleteProduct(${product.id})">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        };

        const deleteProduct = (id) => {
            products = products.filter(product => product.id !== id);
            renderProducts();
        };

        document.getElementById('add-product-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('productName').value,
                price: parseFloat(document.getElementById('productPrice').value).toFixed(2),
                description: document.getElementById('productDescription').value,
                image: "random_product.JPG"
            };

            const newProduct = { ...formData, id: Date.now() };

            products.push(newProduct);
            renderProducts();
            e.target.reset();
        });

        const fetchFakeProducts = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const isSuccess = Math.random() > 0.5;
                    
                    if (isSuccess) {
                        const sampleData = [
                            {
                                id: Date.now() + 1,
                                name: "Gaming Mouse",
                                price: "59.99",
                                description: "Ergonomic optical sensor mouse with customizable RGB lighting.",
                                image: "mouse.jpeg"
                            },
                            {
                                id: Date.now() + 2,
                                name: "Curved Monitor",
                                price: "299.99",
                                description: "34-inch ultrawide display for an immersive productivity experience.",
                                image: "monitor.jpeg"
                            }
                        ];
                        resolve(sampleData);
                    } else {
                        reject(new Error("500 Internal Server Error"));
                    }
                }, 1000);
            });
        };

        document.getElementById('loadSamplesBtn').addEventListener('click', async (e) => {
            const btn = e.target;
            const alertContainer = document.getElementById('alert-container');
            
            btn.disabled = true;
            alertContainer.innerHTML = `
                <div class="alert alert-info alert-dismissible fade show" role="alert">
                    Loading new products...
                </div>
            `;

            try {
                const newProducts = await fetchFakeProducts();
                products = [...products, ...newProducts];
                renderProducts();
                
                alertContainer.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        Sample products loaded successfully!
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
            } catch (error) {
                alertContainer.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error:</strong> Failed to load products. The server rejected the request. Please try again.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
            } finally {
                btn.disabled = false;
            }
        });

        renderProducts();

