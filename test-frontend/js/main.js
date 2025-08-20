// test-frontend/js/main.js

$(document).ready(function () {
    // 1. Initialize Slick Slider with RTL
    $('.carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: true,
        rtl: true, // This is the new line you requested
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // 2. Button click example
    $('#load-more-btn').on('click', function () {
        alert('Button clicked! You can load more content here.');
        // Optional: Load more content dynamically
    });

    // 3. Fetching images for "Categories" section
    const categoriesContainer = $('#categories-container');
    const categoryCount = 6; // number of category images to load

    for (let i = 1; i <= categoryCount; i++) {
        const imgUrl = `https://picsum.photos/300/200?random=${i}`;
        const imgElement = $(`
            <div class="category-item">
                <img class="lazy" data-src="${imgUrl}" alt="Category ${i}">
            </div>
        `);
        categoriesContainer.append(imgElement);
    }

    // 4. Implement Lazy Loading using IntersectionObserver
    const lazyImages = $('.lazy');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: "0px 0px 50px 0px"
        });

        lazyImages.each(function () {
            observer.observe(this);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.each(function () {
            this.src = this.dataset.src;
            $(this).removeClass('lazy');
        });
    }
});