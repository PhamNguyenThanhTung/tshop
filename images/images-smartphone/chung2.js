document.addEventListener('DOMContentLoaded', function() {
    // Lấy id sản phẩm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Tải dữ liệu từ file JSON
    fetch('chung.json')
        .then(response => response.json())
        .then(data => {
            // Kiểm tra xem id sản phẩm có tồn tại trong dữ liệu không
            if (data[productId]) {
                const product = data[productId];
                
                // Cập nhật nội dung trang web
                document.title = product.name;
                document.getElementById('product-category').textContent = product.category;
                document.getElementById('product-name').textContent = product.fullName;
                document.getElementById('product-hint').textContent = product.hint;
                document.getElementById('product-rating').textContent = `Đánh giá: ${product.rating} sao`;
                document.getElementById('product-price').textContent = product.price;
                document.getElementById('product-original-price').textContent = product.originalPrice;
                document.getElementById('product-discount').textContent = product.discount;
                document.getElementById('product-sold').textContent = product.sold;

                // Thêm hình ảnh sản phẩm
                const imagesContainer = document.getElementById('product-images');
                product.images.forEach((image, index) => {
                    const img = document.createElement('img');
                    img.src = image;
                    img.alt = `Hình ảnh sản phẩm ${index + 1}`;
                    imagesContainer.appendChild(img);
                });

                // Thêm thumbnails sản phẩm
                const thumbnailsContainer = document.getElementById('product-thumbnails');
                product.images.forEach((image, index) => {
                    const img = document.createElement('img');
                    img.src = image;
                    img.alt = `Hình ảnh sản phẩm ${index + 1}`;
                    thumbnailsContainer.appendChild(img);
                });

                // Thêm các ưu đãi sản phẩm
                const offersContainer = document.getElementById('product-offers');
                product.offers.forEach((offer, index) => {
                    const offerElement = document.createElement('div');
                    offerElement.innerHTML = `
                        <span class="label">${offer.label}</span>
                        <span class="title">${offer.title}</span>
                        <span class="content">${offer.content}</span>
                    `;
                    offersContainer.appendChild(offerElement);
                });

                // Thêm các thông số kỹ thuật sản phẩm
                const specsContainer = document.getElementById('product-specs');
                Object.keys(product.specs).forEach((category, index) => {
                    const categoryElement = document.createElement('div');
                    categoryElement.innerHTML = `
                        <h4>${category}</h4>
                        <ul>
                            ${Object.keys(product.specs[category]).map((key, index) => {
                                return `<li>${key}: ${product.specs[category][key]}</li>`;
                            }).join('')}
                        </ul>
                    `;
                    specsContainer.appendChild(categoryElement);
                });

                // Thêm các điểm nổi bật sản phẩm
                const highlightsContainer = document.getElementById('product-highlights');
                product.highlights.forEach((highlight, index) => {
                    const highlightElement = document.createElement('div');
                    highlightElement.textContent = highlight;
                    highlightsContainer.appendChild(highlightElement);
                });

               // Thêm mô tả sản phẩm
               const descriptionContainer = document.getElementById('product-description ');
               descriptionContainer.textContent = product.description;
           } else {
               // Xử lý trường hợp không tìm thấy sản phẩm
               document.body.innerHTML = '<h1>Sản phẩm không tồn tại</h1>';
           }
       })
       .catch(error => {
           console.error('Lỗi khi tải dữ liệu:', error);
           document.body.innerHTML = '<h1>Có lỗi xảy ra</h1>';
       });
});