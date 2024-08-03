document.addEventListener('DOMContentLoaded', function () {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    const orderSummary = document.getElementById('order-summary');
    let totalPrice = 0;

    if (cartData.length === 0) {
        orderSummary.textContent = 'Bạn chưa có sản phẩm nào trong giỏ hàng.';
    } else {
        let summaryHTML = '<ul>';
        cartData.forEach(item => {
            summaryHTML += `<li>${item.name} -$ ${item.price.toFixed(2)} x ${item.quantity}</li>`;
            totalPrice += item.price * item.quantity;
        });
        summaryHTML += `</ul><p>Total Bill: $ ${totalPrice.toFixed(2)}</p>`;
        orderSummary.innerHTML = summaryHTML;
    }


    checkoutForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Lấy thông tin từ form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        // Thực hiện hành động với dữ liệu (gửi đến server, lưu vào cơ sở dữ liệu, v.v.)
        console.log('Tên:', name);
        console.log('Email:', email);
        console.log('Số điện thoại:', phone);
        console.log('Địa chỉ:', address);
        console.log('Dữ liệu giỏ hàng:', cartData);

        // Xóa giỏ hàng sau khi thanh toán
        localStorage.removeItem('cartData');

        // Hiển thị thông báo thành công
        alert('Cảm ơn bạn đã đặt hàng!');
    });
});
