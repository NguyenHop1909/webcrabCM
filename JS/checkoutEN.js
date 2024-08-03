// document.addEventListener('DOMContentLoaded', function () {
//     const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
//     const orderSummary = document.getElementById('order-summary');
//     let totalPrice = 0;

//     if (cartData.length === 0) {
//         orderSummary.textContent = 'Bạn chưa có sản phẩm nào trong giỏ hàng.';
//     } else {
//         let summaryHTML = '<ul>';
//         cartData.forEach(item => {
//             summaryHTML += `<li>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</li>`;
//             totalPrice += item.price * item.quantity;
//         });
//         summaryHTML += `</ul><p>Total Bill: $${totalPrice.toFixed(2)}</p>`;
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
            return `${item.name} - $${item.price.toFixed(2)} x${item.quantity}`;
        }).join('<br>');
        orderSummary.innerHTML += `<br><strong>Total Bill: $${totalPrice.toFixed(2)}</strong>`;
    } else {
        orderSummary.textContent = 'You have no items in your shopping cart!';
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
