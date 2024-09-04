document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('checkout-form');
    const orderSummary = document.getElementById('order-summary');

    // Hiển thị thông tin giỏ hàng trên trang thanh toán
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    if (cartData.length > 0) {
        let totalPrice = 0;
        orderSummary.innerHTML = cartData.map(item => {
            totalPrice += item.price * item.quantity;
            return `${item.name} (${item.type}) - ${item.price.toFixed(2)} VND x${item.quantity}`;
        }).join('<br>');
        orderSummary.innerHTML += `<br><strong>Tổng cộng: ${totalPrice.toFixed(2)} VND</strong>`;
    } else {
        orderSummary.textContent = 'Bạn chưa có sản phẩm nào trong giỏ hàng.';
    }

    form.addEventListener('submit', function (event) {
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        const addressInput = document.getElementById('address');
        const phonePattern = /^[0-9]{10,11}$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com(\.[a-zA-Z]{2,})?$/;

        if (!phonePattern.test(phoneInput.value)) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của form
            alert('Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại gồm 10 hoặc 11 chữ số.');
            phoneInput.focus();
        } else if (!emailPattern.test(emailInput.value)) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của form

            // Hiển thị modal thông báo email không hợp lệ
            const modal = document.getElementById('email-error-modal');
            const retryEmailButton = document.getElementById('retry-email');

            modal.style.display = 'block';

            // Đóng modal khi người dùng nhấn vào nút "Nhập lại email"
            retryEmailButton.addEventListener('click', () => {
                modal.style.display = 'none';
                emailInput.focus(); // Đưa con trỏ vào ô nhập email để người dùng nhập lại
            });

            // Đóng modal khi người dùng nhấn vào nút "X" để đóng modal
            const closeModalButton = modal.querySelector('.close-modal');
            closeModalButton.addEventListener('click', () => {
                modal.style.display = 'none';
                emailInput.focus(); // Đưa con trỏ vào ô nhập email để người dùng nhập lại
            });

            // Đóng modal khi người dùng nhấn vào bất kỳ vị trí nào bên ngoài modal
            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    emailInput.focus(); // Đưa con trỏ vào ô nhập email để người dùng nhập lại
                }
            });
        } else {
            // Nếu mọi thứ hợp lệ, gửi dữ liệu đến Google Sheets và hiển thị thông báo đặt hàng thành công
            event.preventDefault(); // Ngăn chặn hành động mặc định của form

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Thêm dữ liệu giỏ hàng vào dữ liệu form
            data.cartItems = JSON.parse(localStorage.getItem('cartData')) || [];

            fetch('https://script.google.com/macros/s/AKfycbzZiEg-bLtbep08sK3f6y2qdGnoRPU7ajpsPSJl1k1JAtmUwOVHGEsRnDfVDQ3uV_CVOg/exec', { // Thay YOUR_WEB_APP_URL_HERE bằng URL Web App bạn đã sao chép
                method: 'POST',
                contentType: 'application/json',
                body: JSON.stringify(data)
            })
            .then(response => response.text())
            .then(result => {
                // Hiển thị modal thông báo đặt hàng thành công
                const successModal = document.getElementById('order-success-modal');
                const homeButton = document.getElementById('back-to-shop');

                successModal.style.display = 'block';

                // Đóng modal khi người dùng nhấn vào nút "Trở về Trang chủ"
                homeButton.addEventListener('click', () => {
                    successModal.style.display = 'none';
                    window.location.href = 'VN.html'; // Thay đổi đường dẫn về trang chủ của bạn
                });

                // Đóng modal khi người dùng nhấn vào bất kỳ vị trí nào bên ngoài modal
                window.addEventListener('click', (event) => {
                    if (event.target === successModal) {
                        successModal.style.display = 'none';
                        window.location.href = 'VN.html'; // Thay đổi đường dẫn về trang chủ của bạn
                    }
                });

                // Xóa dữ liệu giỏ hàng
                localStorage.removeItem('cartData');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Đã xảy ra lỗi, vui lòng thử lại.');
            });
        }
    });
});
