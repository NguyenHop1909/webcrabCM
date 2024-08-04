// document.addEventListener('DOMContentLoaded', function () {
//     const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
//     const orderSummary = document.getElementById('order-summary');
//     let totalPrice = 0;

//     if (cartData.length === 0) {
//         orderSummary.textContent = 'Bạn chưa có sản phẩm nào trong giỏ hàng.';
//     } else {
//         let summaryHTML = '<ul>';
//         cartData.forEach(item => {
//             summaryHTML += `<li>${item.name} - ${item.price.toFixed(2)} VND x ${item.quantity}</li>`;
//             totalPrice += item.price * item.quantity;
//         });
//         summaryHTML += `</ul><p>Tổng Tiền: ${totalPrice.toFixed(2)} VND</p>`;
//         orderSummary.innerHTML = summaryHTML;
//     }


//     checkoutForm.addEventListener('submit', function (event) {
//         event.preventDefault(); // Ngăn chặn hành vi mặc định của form

//         // Lấy thông tin từ form
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;
//         const phone = document.getElementById('phone').value;
//         const address = document.getElementById('address').value;

//         // Thực hiện hành động với dữ liệu (gửi đến server, lưu vào cơ sở dữ liệu, v.v.)
//         console.log('Tên:', name);
//         console.log('Email:', email);
//         console.log('Số điện thoại:', phone);
//         console.log('Địa chỉ:', address);
//         console.log('Dữ liệu giỏ hàng:', cartData);

//         // Xóa giỏ hàng sau khi thanh toán
//         localStorage.removeItem('cartData');

//         // Hiển thị thông báo thành công
//         alert('Cảm ơn bạn đã đặt hàng!');

//         setTimeout(() => {
//             window.location.href = 'index.html'; // Thay đổi đường dẫn về trang chủ của bạn
//         }, 2000); // Thay đổi thời gian nếu cần thiết
//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('checkout-form');
    const orderSummary = document.getElementById('order-summary');

    // Hiển thị thông tin giỏ hàng trên trang thanh toán
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    if (cartData.length > 0) {
        let totalPrice = 0;
        orderSummary.innerHTML = cartData.map(item => {
            totalPrice += item.price * item.quantity;
            return `${item.name} - ${item.price.toFixed(2)} VND x${item.quantity}`;
        }).join('<br>');
        orderSummary.innerHTML += `<br><strong>Tổng cộng: ${totalPrice.toFixed(2)} VND</strong>`;
    } else {
        orderSummary.textContent = 'Bạn chưa có sản phẩm nào trong giỏ hàng.';
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form

        // Xóa dữ liệu giỏ hàng
        localStorage.removeItem('cartData');

        // Chuyển hướng về trang chủ sau khi thanh toán
        setTimeout(() => {
            window.location.href = 'index.html'; // Thay đổi đường dẫn về trang chủ của bạn
        }, 2000); // Thay đổi thời gian nếu cần thiết
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('checkout-form');

    form.addEventListener('submit', function (event) {
        const phoneInput = document.getElementById('phone');
        const phonePattern = /^[0-9]{10,11}$/;

        if (!phonePattern.test(phoneInput.value)) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của form
            alert('Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại gồm 10 hoặc 11 chữ số.');
            phoneInput.focus();
        }
    });
});
