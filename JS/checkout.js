document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('checkout-form');
    const orderSummary = document.getElementById('order-summary');
    const submitButton = document.getElementById('submit-order');
    const loadingScreen = document.getElementById('loading-screen');  // Màn hình loading toàn màn hình

    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    if (cartData.length > 0) {
        let totalPrice = 0;
        orderSummary.innerHTML = cartData.map(item => {
            totalPrice += item.price * item.quantity;
            return `${item.name} (${item.type}) - ${item.price.toFixed(2)}0VND x${item.quantity}`;
        }).join('<br>');
        orderSummary.innerHTML += `<br><strong>Tổng cộng: ${totalPrice.toFixed(2)}0VND</strong>`;
    } else {
        orderSummary.textContent = 'Bạn chưa có sản phẩm nào trong giỏ hàng.';
    }

    form.addEventListener('submit', function (event) {
        const phoneInput = document.getElementById('phone');
        const modal = document.getElementById('phone-error-modal'); // Nếu cần hiển thị modal cho số điện thoại không hợp lệ

        const phonePattern = /^[0-9]{10,11}$/;

        if (!phonePattern.test(phoneInput.value)) {
            event.preventDefault();
            alert('Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại gồm 10 hoặc 11 chữ số.');
            phoneInput.focus();
            return;
        }

        // Hiển thị màn hình loading và vô hiệu hóa nút "Hoàn tất đặt hàng"
        event.preventDefault();
        submitButton.disabled = true;
        loadingScreen.style.display = 'flex';  // Hiển thị màn hình loading

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        data.cartItems = cartData;

        fetch('https://script.google.com/macros/s/AKfycbz_XZVgnbs9ZVIc4oxxTwO66k7GER20C51I6hlXN4uP9mhtiaNwr2K2r7EjizYhBZXFdw/exec', { 
            method: 'POST',
            contentType: 'application/json',
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(result => {
            const successModal = document.getElementById('order-success-modal');
            const homeButton = document.getElementById('back-to-shop');

            successModal.style.display = 'block';
            loadingScreen.style.display = 'none';  // Ẩn màn hình loading khi hoàn tất

            homeButton.addEventListener('click', () => {
                successModal.style.display = 'none';
                window.location.href = 'VN.html'; 
            });

            window.addEventListener('click', (event) => {
                if (event.target === successModal) {
                    successModal.style.display = 'none';
                    window.location.href = 'VN.html'; 
                }
            });

            // Xóa dữ liệu giỏ hàng
            localStorage.removeItem('cartData');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi, vui lòng thử lại.');
            loadingScreen.style.display = 'none';  // Ẩn màn hình loading nếu xảy ra lỗi
            submitButton.disabled = false;
        });
    });
});
