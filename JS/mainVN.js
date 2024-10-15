document.addEventListener('DOMContentLoaded', function () {
    /*=============== VARIABLES ===============*/
    const cartIcon = document.getElementById('cart-icon');
    const cart = document.getElementById('cart');
    const closeCartButton = document.getElementById('close-cart');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('checkout-button');
    const cartCountElement = document.getElementById('cart-count');
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

    /*=============== SHOW MENU ===============*/
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    /*=============== REMOVE MENU MOBILE ===============*/
    const navLink = document.querySelectorAll('.nav__link');

    const linkAction = () => {
        navMenu.classList.remove('show-menu');
    };

    navLink.forEach(n => n.addEventListener('click', linkAction));

    /*=============== CHANGE BACKGROUND HEADER ===============*/
    const scrollHeader = () => {
        const header = document.getElementById('header');
        if (window.scrollY >= 50) {
            header.classList.add('bg-header');
        } else {
            header.classList.remove('bg-header');
        }
    };

    window.addEventListener('scroll', scrollHeader);

    /*=============== SHOW SCROLL UP ===============*/ 
    const scrollUp = () => {
        const scrollUp = document.getElementById('scroll-up');
        if (window.scrollY >= 350) {
            scrollUp.classList.add('show-scroll');
        } else {
            scrollUp.classList.remove('show-scroll');
        }
    };

    window.addEventListener('scroll', scrollUp);

    /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
    const sections = document.querySelectorAll('section[id]');

    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            const sectionId = current.getAttribute('id');
            const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        });
    };

    window.addEventListener('scroll', scrollActive);

    /*=============== DARK LIGHT THEME ===============*/ 
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'ri-sun-line';

    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

    if (selectedTheme) {
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
    }

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);

        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });

    /*=============== SCROLL REVEAL ANIMATION ===============*/
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 400
    });

    sr.reveal(`.home__img, .newsletter__container, .footer__logo,
                .footer__description, .footer__content, .footer__info`);
    sr.reveal(`.home__data`, { origin: 'bottom' });
    sr.reveal(`.about__data, .products__card`, { origin: 'left' });
    sr.reveal(`.about__img, .recently__img`, { origin: 'right' });
    sr.reveal(`.popular__card`, { interval: 100 });

    /*=============== LANGUAGE SWITCHER ===============*/
    const langButtons = document.querySelectorAll('.lang-button');

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.getAttribute('data-lang');
            
            // Assuming that you're changing between two HTML pages for language switching
            if (selectedLang === 'en') {
                window.location.href = '/EN.html';
            } else if (selectedLang === 'vi') {
                window.location.href = '/VN.html';
            }
        });
    });


    // Function to update product names and prices based on language
    // function updateLanguage(lang) {
    //     const productNames = document.querySelectorAll('.products__name');
    //     const productPrices = document.querySelectorAll('.products__price');

    //     productNames.forEach((name) => {
    //         const langText = name.getAttribute(`data-lang-${lang}`);
    //         if (langText) {
    //             name.textContent = langText;
    //         }
    //     });

    //     productPrices.forEach((price) => {
    //         const langText = price.getAttribute(`data-lang-${lang}`);
    //         if (langText) {
    //             price.textContent = langText;
    //         }
    //     });

    //     // Clear cart when language changes
    //     localStorage.removeItem('cartData');
    //     cartData.length = 0;
    //     updateCart();
    // }

    // const currentLang = window.location.pathname.includes('VN') ? 'vi' : 'en';
    // updateLanguage(currentLang);

    // langButtons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         const lang = button.getAttribute('data-lang');
    //         updateLanguage(lang);

    //         localStorage.setItem('selected-language', lang);
    //     });
    // });

    // document.addEventListener('DOMContentLoaded', () => {
    //     const savedLang = localStorage.getItem('selected-language') || currentLang;
    //     updateLanguage(savedLang);

    //     document.querySelector(`.lang-button[data-lang="${savedLang}"]`).classList.add('active');
    // });

    /*=============== CART FUNCTIONALITY ===============*/
    function updateCart() {
        cartItemsElement.innerHTML = '';
        let totalPrice = 0;
    
        cartData.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} (${item.type}) - ${item.price.toFixed(2)} VND
                <div class="change-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    x${item.quantity}
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <span class="remove-item" data-id="${item.id}">&times;</span>
            `;
            cartItemsElement.appendChild(li);
            totalPrice += item.price * item.quantity;
        });
    
        cartTotalPriceElement.textContent = `${totalPrice.toFixed(2)} VND`;
        cartCountElement.textContent = cartData.reduce((sum, item) => sum + item.quantity, 0);
    
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                increaseQuantity(id);
            });
        });
    
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                decreaseQuantity(id);
            });
        });
    
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                removeFromCart(id);
            });
        });
    }
    

    function addToCart(id, name, price, type) {
        const item = cartData.find(product => product.id === id);
        if (item) {
            item.quantity += 1;
        } else {
            cartData.push({ id, name, price, type, quantity: 1 });
        }
        localStorage.setItem('cartData', JSON.stringify(cartData));
        updateCart();
    }

    function increaseQuantity(id) {
        const item = cartData.find(product => product.id === id);
        if (item) {
            item.quantity += 1;
            localStorage.setItem('cartData', JSON.stringify(cartData));
            updateCart();
        }
    }

    function decreaseQuantity(id) {
        const item = cartData.find(product => product.id === id);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            localStorage.setItem('cartData', JSON.stringify(cartData));
            updateCart();
        } else if (item && item.quantity === 1) {
            removeFromCart(id);
        }
    }

    function removeFromCart(id) {
        const itemIndex = cartData.findIndex(product => product.id === id);
        if (itemIndex > -1) {
            cartData.splice(itemIndex, 1);
            localStorage.setItem('cartData', JSON.stringify(cartData));
            updateCart();
        }
        if (cartData.length === 0) {
            cart.style.display = 'none';
        }
    }

    cartIcon.addEventListener('click', function () {
        cart.style.display = 'block';
        updateCart(); // Update cart content when opened
    });

    closeCartButton.addEventListener('click', function () {
        cart.style.display = 'none';
    });

    checkoutButton.addEventListener('click', function () {
        if (cartData.length === 0) {
            // Hiển thị modal cho người dùng
            const modal = document.getElementById('cart-warning-modal');
            const closeModalButton = document.querySelector('.close-modal');
            const scrollToProductsButton = document.getElementById('scroll-to-products');

            modal.style.display = 'block';

            closeModalButton.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            scrollToProductsButton.addEventListener('click', () => {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
                modal.style.display = 'none';
            });
        } else {
            // Chuyển hướng đến trang thanh toán
            window.location.href = 'checkout.html';

            // Xóa giỏ hàng sau khi chuyển hướng
            setTimeout(() => {
                localStorage.removeItem('cartData');
                cartData.length = 0;
            }, 1000); // Đợi một chút để đảm bảo trang thanh toán đã được tải
        }
    });

    document.querySelectorAll('.products__button').forEach(button => {
        button.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const type = this.getAttribute('data-type'); // Lấy thông tin loại cua

            addToCart(id, name, price, type);
        });
    });

    // Initial update on page load
    updateCart();
});
