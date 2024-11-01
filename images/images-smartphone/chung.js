// chung.js

document.addEventListener('DOMContentLoaded', function() {
    // Fetch dữ liệu từ file JSON
    fetch('chung.json')
        .then(response => response.json())
        .then(data => {
            const product = data.test1;
            updateProductInfo(product);
        })
        .catch(error => console.error('Error loading product data:', error));
});

function updateProductInfo(product) {
    try {
        // Cập nhật thông tin cơ bản
        updateBasicInfo(product);
        
        // Cập nhật giá và thông tin bán hàng
        updatePriceInfo(product);
        
        // Cập nhật slider hình ảnh
        updateSliderImages(product);
        
        // Cập nhật thông số kỹ thuật
        updateSpecifications(product);
        
        // Cập nhật ưu đãi
        updateOffers(product);
        
        // Cập nhật nội dung mô tả và điểm nổi bật
        updateContentAndHighlights(product);
        
        // Cập nhật video review
        updateVideoReview(product);

    } catch (error) {
        console.error('Error updating product information:', error);
    }
}

function updateBasicInfo(product) {
    updateElement('.product-name', product.name);
    updateElement('#product-name', product.name);
    updateElement('.name_hint', 'New 100% - Bảo Hành 12 tháng tại UTC');
}

function updatePriceInfo(product) {
    updateElement('#current', product.price.current);
    updateElement('#original', product.price.original);
    updateElement('#discount', product.price.discount);
    updateElement('.sold', `Đã bán: ${product.sold}`);
}

function updateSliderImages(product) {
    const sliderContainer = document.querySelector('.slider_left_top');
    if (sliderContainer) {
        product.images.forEach((imgSrc, index) => {
            const img = document.getElementById(`card-${index + 1}`);
            if (img) {
                img.src = imgSrc;
                img.alt = `${product.name} - Image ${index + 1}`;
            }
        });
    }
}

function updateSpecifications(product) {
    const specs = product.specifications;
    
    // Màn hình
    updateElement('#screen-size', specs.screen.size);
    updateElement('#screen-tech', specs.screen.technology);
    updateElement('#screen-resolution', specs.screen.resolution);
    updateElement('#screen-refresh', specs.screen.refresh_rate);
    
    // Camera
    updateElement('#camera-front', specs.camera.front);
    updateElement('#camera-rear', `${specs.camera.rear.main}\n${specs.camera.rear.telephoto}\n${specs.camera.rear.wide}`);
    updateElement('#camera-video', specs.camera.video);
    updateElement('#camera-features', specs.camera.features.join('<br>'));
    
    // Vi xử lý
    updateElement('#processor-chipset', specs.processor.chipset);
    updateElement('#processor-cpu', specs.processor.cpu);
    updateElement('#processor-gpu', specs.processor.gpu);
    
    // SIM
    updateElement('#sim-type', specs.sim.type);
    updateElement('#sim-os', specs.sim.os);
    updateElement('#sim-bluetooth', specs.sim.bluetooth);
    
    // Pin
    updateElement('#battery-capacity', specs.battery.capacity);
    updateElement('#battery-charging', specs.battery.charging);
    updateElement('#battery-port', specs.battery.port);
    
    // Thông số khác
    updateElement('#ram', specs.ram);
    updateElement('#storage', specs.storage);
    updateElement('#dimensions', specs.dimensions);
    updateElement('#weight', specs.weight);
    updateElement('#material', `Khung: ${specs.material.frame}<br>Lưng: ${specs.material.back}`);
}

function updateOffers(product) {
    const offerContainer = document.querySelector('.offers');
    if (offerContainer && product.offers) {
        product.offers.forEach((offer, index) => {
            const offerElement = offerContainer.children[index];
            if (offerElement) {
                const titleElement = offerElement.querySelector('.offer-title');
                const contentElement = offerElement.querySelector('.offer-content');
                
                if (titleElement) titleElement.textContent = offer.title;
                if (contentElement) contentElement.innerHTML = offer.content.join('<br>');
            }
        });
    }
}

function updateContentAndHighlights(product) {
    // Cập nhật highlights
    const highlightList = document.querySelector('.highlight ul');
    if (highlightList && product.highlights) {
        highlightList.innerHTML = product.highlights.map(item => `<li>${item}</li>`).join('');
    }
    
    // Cập nhật description
    const contentParagraphs = document.querySelectorAll('.content p');
    if (contentParagraphs.length > 0) {
        contentParagraphs[0].innerHTML = product.description;
        if (contentParagraphs.length > 2) {
            contentParagraphs[2].innerHTML = product.reasons_to_buy;
        }
    }
}

function updateVideoReview(product) {
    const videoIframe = document.querySelector('.video iframe');
    if (videoIframe && product.video_review) {
        videoIframe.src = product.video_review.url;
        videoIframe.title = product.video_review.title;
    }
}

// Utility function để cập nhật element an toàn
function updateElement(selector, content) {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = content;
    } else {
        console.warn(`Element with selector "${selector}" not found`);
    }
}

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider_left_top');
    const prevButton = document.querySelector('.fa-chevron-left');
    const nextButton = document.querySelector('.fa-chevron-right');
    const indicators = document.querySelectorAll('.slider_left_bottom .item');
    let currentIndex = 0;

    function updateSlider() {
        const images = sliderContainer.querySelectorAll('img');
        images.forEach((img, index) => {
            img.style.display = index === currentIndex ? 'block' : 'none';
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + indicators.length) % indicators.length;
        updateSlider();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % indicators.length;
        updateSlider();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Initialize slider
    updateSlider();
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const reviewBtn = document.getElementById('review');
    const videoBtn = document.getElementById('video_review');
    const commentBtn = document.getElementById('BinhLuan');
    
    const reviewSection = document.querySelector('.review');
    const videoSection = document.querySelector('.video');
    const commentSection = document.querySelector('.comments');

    function showSection(section) {
        reviewSection.style.display = 'none';
        videoSection.style.display = 'none';
        commentSection.style.display = 'none';
        section.style.display = 'block';
    }

    reviewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(reviewSection);
        reviewBtn.classList.add('active');
        videoBtn.classList.remove('active');
        commentBtn.classList.remove('active');
    });

    videoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(videoSection);
        videoBtn.classList.add('active');
        reviewBtn.classList.remove('active');
        commentBtn.classList.remove('active');
    });

    commentBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(commentSection);
        commentBtn.classList.add('active');
        reviewBtn.classList.remove('active');
        videoBtn.classList.remove('active');
    });

    // Show review section by default
    showSection(reviewSection);
    reviewBtn.classList.add('active');
});

// Comment system functionality
document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.querySelector('.comment-form');
    const commentList = document.getElementById('comment-list');
    const submitBtn = document.getElementById('submit-btn');

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const commentInput = document.getElementById('comment');
        const ratingInputs = document.querySelectorAll('input[name="rating-comment"]');
        
        // Get selected rating
        let rating = 0;
        ratingInputs.forEach(input => {
            if (input.checked) {
                rating = input.value;
            }
        });

        // Validate inputs
        if (!nameInput.value.trim()) {
            alert('Vui lòng nhập tên của bạn');
            return;
        }

        if (!commentInput.value.trim()) {
            alert('Vui lòng nhập bình luận của bạn');
            return;
        }

        if (rating === 0) {
            alert('Vui lòng chọn đánh giá sao');
            return;
        }
    })
})
