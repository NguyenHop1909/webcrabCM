/*=============== SHOW MENU ===============*/

const navMenu = document.getElementById('nav-menu')
      navToggle = document.getElementById('nav-toggle')
      navClose = document.getElementById('nav-close')

/* ========= MENU SHOW ==========*/

if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}


/* ========= MENU HIDDEN ==========*/
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')

    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
        header.classList.add('bg-header');
    } else {
        header.classList.remove('bg-header');
    }
}

window.addEventListener('scroll', scrollHeader);

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    if (this.scrollY >= 350) {
        scrollUp.classList.add('show-scroll')
    } else {
        scrollUp.classList.remove('show-scroll')
    }
}

window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop -58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId +']')

        if(scrollY> sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line' 


if(selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () =>{
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon)
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400
});


sr.reveal(`.home__img, .newsletter__container, .footer__logo,
            .footer__description, .footer__content, .footer__info`)
sr.reveal(`.home__data`, {origin: 'bottom'})
sr.reveal(`.about__data, .products__card`, {origin: 'left'})
sr.reveal(`.about__img, .recently__img`, {origin: 'right'})
sr.reveal(`.popular__card`, {interval: 100})




document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-button');

    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Lấy ngôn ngữ được chọn từ thuộc tính data-lang
            const selectedLang = button.getAttribute('data-lang');

            // Hiển thị cờ ngôn ngữ được chọn
            langButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Xử lý thay đổi ngôn ngữ ở đây (ví dụ: load trang hoặc thay đổi nội dung)

            // Đặt opacity thấp cho các cờ ngôn ngữ không được chọn
            langButtons.forEach(btn => {
                if (btn !== button) {
                    btn.style.opacity = '0.3';
                } else {
                    btn.style.opacity = '1';
                }
            });
        });
    });
});




// Manager cart
// document.addEventListener('DOMContentLoaded', function () {
//     const cartIcon = document.getElementById('cart-icon');
//     const cart = document.getElementById('cart');
//     const closeCartButton = document.getElementById('close-cart');

//     cartIcon.addEventListener('click', function () {
//         cart.style.display = 'block';
//     });

//     closeCartButton.addEventListener('click', function () {
//         cart.style.display = 'none';
//     });

//     const cartItemsElement = document.getElementById('cart-items');
//     const cartTotalPriceElement = document.getElementById('cart-total-price');
//     const checkoutButton = document.getElementById('checkout-button');
//     const cartCountElement = document.getElementById('cart-count');
//     const cartData = [];

//     document.querySelectorAll('.products__button').forEach(button => {
//         button.addEventListener('click', function () {
//             const name = this.getAttribute('data-name');
//             const price = parseFloat(this.getAttribute('data-price'));

//             addToCart(name, price);
//             updateCart();
//         });
//     });

//     function addToCart(name, price) {
//         const item = cartData.find(product => product.name === name);
//         if (item) {
//             item.quantity += 1;
//         } else {
//             cartData.push({ name, price, quantity: 1 });
//         }
//         cartCountElement.textContent = cartData.reduce((sum, item) => sum + item.quantity, 0);
//     }

//     function increaseQuantity(name) {
//         const item = cartData.find(product => product.name === name);
//         if (item) {
//             item.quantity += 1;
//             updateCart();
//         }
//     }

//     function decreaseQuantity(name) {
//         const item = cartData.find(product => product.name === name);
//         if (item && item.quantity > 1) {
//             item.quantity -= 1;
//             updateCart();
//         } else if (item && item.quantity === 1) {
//             removeFromCart(name);
//         }
//     }

//     function removeFromCart(name) {
//         const itemIndex = cartData.findIndex(product => product.name === name);
//         if (itemIndex > -1) {
//             cartData.splice(itemIndex, 1);
//             updateCart();
//         }
//         cartCountElement.textContent = cartData.reduce((sum, item) => sum + item.quantity, 0);
//         if (cartData.length === 0) {
//             cart.style.display = 'none';
//         }
//     }

//     function updateCart() {
//         cartItemsElement.innerHTML = '';
//         let totalPrice = 0;

//         cartData.forEach(item => {
//             const li = document.createElement('li');
//             li.innerHTML = `
//                 ${item.name} - $${(item.price * item.quantity).toFixed(2)} 
//                 <div class="change-quantity">
//                     <button class="decrease-quantity" data-name="${item.name}">-</button>
//                     x${item.quantity}
//                     <button class="increase-quantity" data-name="${item.name}">+</button>
//                 </div>
//                 <span class="remove-item" data-name="${item.name}">&times;</span>
//             `;
//             cartItemsElement.appendChild(li);
//             totalPrice += item.price * item.quantity;
//         });

//         cartTotalPriceElement.textContent = `${totalPrice.toFixed(2)}VND`;

//         document.querySelectorAll('.increase-quantity').forEach(button => {
//             button.addEventListener('click', function () {
//                 const name = this.getAttribute('data-name');
//                 increaseQuantity(name);
//             });
//         });

//         document.querySelectorAll('.decrease-quantity').forEach(button => {
//             button.addEventListener('click', function () {
//                 const name = this.getAttribute('data-name');
//                 decreaseQuantity(name);
//             });
//         });

//         document.querySelectorAll('.remove-item').forEach(button => {
//             button.addEventListener('click', function () {
//                 const name = this.getAttribute('data-name');
//                 removeFromCart(name);
//             });
//         });
//     }

//     checkoutButton.addEventListener('click', function () {
//         alert('Cảm ơn vì đã mua hàng ạ!');
//         // Clear the cart
//         cartData.length = 0;
//         cartCountElement.textContent = 0;
//         updateCart();
//         cart.style.display = 'none';
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.getElementById('cart-icon');
    const cart = document.getElementById('cart');
    const closeCartButton = document.getElementById('close-cart');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('checkout-button');
    const cartCountElement = document.getElementById('cart-count');
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

    function addToCart(name, price) {
        const item = cartData.find(product => product.name === name);
        if (item) {
            item.quantity += 1;
        } else {
            cartData.push({ name, price, quantity: 1 });
        }
        localStorage.setItem('cartData', JSON.stringify(cartData));
        updateCart();
    }

    function increaseQuantity(name) {
        const item = cartData.find(product => product.name === name);
        if (item) {
            item.quantity += 1;
            localStorage.setItem('cartData', JSON.stringify(cartData));
            updateCart();
        }
    }

    function decreaseQuantity(name) {
        const item = cartData.find(product => product.name === name);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            localStorage.setItem('cartData', JSON.stringify(cartData));
            updateCart();
        } else if (item && item.quantity === 1) {
            removeFromCart(name);
        }
    }

    function removeFromCart(name) {
        const itemIndex = cartData.findIndex(product => product.name === name);
        if (itemIndex > -1) {
            cartData.splice(itemIndex, 1);
            localStorage.setItem('cartData', JSON.stringify(cartData));
            updateCart();
        }
        if (cartData.length === 0) {
            cart.style.display = 'none';
        }
    }

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let totalPrice = 0;

        cartData.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - ${item.price.toFixed(2)} VND
                <div class="change-quantity">
                    <button class="decrease-quantity" data-name="${item.name}">-</button>
                    x${item.quantity}
                    <button class="increase-quantity" data-name="${item.name}">+</button>
                </div>
                <span class="remove-item" data-name="${item.name}">&times;</span>
            `;
            cartItemsElement.appendChild(li);
            totalPrice += item.price * item.quantity;
        });

        cartTotalPriceElement.textContent = `${totalPrice.toFixed(2)} VND`;
        cartCountElement.textContent = cartData.reduce((sum, item) => sum + item.quantity, 0);

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function () {
                const name = this.getAttribute('data-name');
                increaseQuantity(name);
            });
        });

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function () {
                const name = this.getAttribute('data-name');
                decreaseQuantity(name);
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const name = this.getAttribute('data-name');
                removeFromCart(name);
            });
        });
    }

    cartIcon.addEventListener('click', function () {
        cart.style.display = 'block';
        updateCart(); // Update cart content when opened
    });

    closeCartButton.addEventListener('click', function () {
        cart.style.display = 'none';
    });

    checkoutButton.addEventListener('click', function () {
        // Chuyển hướng đến trang thanh toán
        window.location.href = 'checkout.html';
        // Xóa giỏ hàng sau khi chuyển hướng
        setTimeout(() => {
            localStorage.removeItem('cartData');
            cartData.length = 0;
        }, 1000); // Đợi một chút để đảm bảo trang thanh toán đã được tải
    });
    
    document.querySelectorAll('.products__button').forEach(button => {
        button.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));

            addToCart(name, price);
        });
    });

    // Initial update on page load
    updateCart();
});


