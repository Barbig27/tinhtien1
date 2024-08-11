window.onload = function () {
    const storedValue = sessionStorage.getItem('gia');
    if (storedValue) {
        document.getElementById('gia').value = storedValue;
        document.getElementById('dongia').textContent = parseFloat(storedValue).toLocaleString()
    }
};


// Lưu giá trị vào sessionStorage khi người dùng thay đổi input
document.getElementById('gia').addEventListener('input', function () {
    sessionStorage.setItem('gia', this.value);
});

function validateHour(input) {
    const value = parseInt(input.value, 10);
    if (isNaN(value) || value < 0 || value >= 24) {
        return 'Giờ phải từ 0 đến 23.';
    }
    return '';
}

function tinh() {
    // Lấy giá trị từ các phần tử input
    var giobatdau = document.getElementById("startHour").value;
    var phutbatdau = document.getElementById("startMinute").value;
    var gioketthuc = document.getElementById("endHour").value;
    var phutketthuc = document.getElementById("endMinute").value;
    var dongia = document.getElementById("gia").value;

    // Chuyển đổi giá trị từ chuỗi thành số
    giobatdau = parseInt(giobatdau, 10);
    phutbatdau = parseInt(phutbatdau, 10);
    gioketthuc = parseInt(gioketthuc, 10);
    phutketthuc = parseInt(phutketthuc, 10);
    dongia = parseFloat(dongia); // Sử dụng parseFloat cho đơn giá

    var timeStart = new Date();
    timeStart.setHours(giobatdau);
    timeStart.setMinutes(phutbatdau);
    timeStart.setSeconds(0); // Thiết lập giây bằng 0

    var timeEnd = new Date();
    timeEnd.setHours(gioketthuc);
    timeEnd.setMinutes(phutketthuc);
    timeEnd.setSeconds(0); // Thiết lập giây bằng 0

    var timeDiff = timeEnd.getTime() - timeStart.getTime();
    var minutesDiff = timeDiff / 60000;

    // Quy đổi phút thành giờ và phút
    var hours = Math.floor(minutesDiff / 60); // Số giờ
    var minutes = Math.round(minutesDiff % 60); // Số phút

    var thanhtien =  Math.floor(dongia / 60 * minutesDiff);

    // Hiển thị thông báo với các giá trị đã lấy


    document.getElementById("dongia").textContent = dongia.toLocaleString();
    document.getElementById("giochoi").textContent = hours;
    document.getElementById("phutchoi").textContent = minutes;
    document.getElementById('thanhtien').textContent = thanhtien.toLocaleString();

    // alert(`Giờ bắt đầu: ${timeStart.getHours()}:${timeStart.getMinutes()}\nGiờ kết thúc: ${timeEnd.getHours()}:${timeEnd.getMinutes()}\nKhoảng cách: ${minutesDiff} phút 
    // \nGiờ chơi ${hours} giờ ${minutes} phút`);
}


function validateMinute(input) {
    const value = parseInt(input.value, 10);
    if (isNaN(value) || value < 0 || value >= 60) {
        return 'Phút phải từ 0 đến 59.';
    }
    return '';
}

function updateErrorMessages() {
    const startHourError = validateHour(document.getElementById('startHour'));
    document.getElementById('startHourError').innerText = startHourError;

    const startMinuteError = validateMinute(document.getElementById('startMinute'));
    document.getElementById('startMinuteError').innerText = startMinuteError;

    const endHourError = validateHour(document.getElementById('endHour'));
    document.getElementById('endHourError').innerText = endHourError;

    const endMinuteError = validateMinute(document.getElementById('endMinute'));
    document.getElementById('endMinuteError').innerText = endMinuteError;
}

document.getElementById('startHour').addEventListener('input', function () {
    if (this.value.length === 2) {
        document.getElementById('startMinute').focus();
        document.getElementById('startMinute').select(); // Bôi đen số cũ
    }
    updateErrorMessages();
});

document.getElementById('startMinute').addEventListener('input', function () {
    if (this.value.length === 2) {
        document.getElementById('endHour').focus();
        document.getElementById('endHour').select(); // Bôi đen số cũ
    }
    updateErrorMessages();
});

document.getElementById('endHour').addEventListener('input', function () {
    if (this.value.length === 2) {
        document.getElementById('endMinute').focus();
        document.getElementById('endMinute').select(); // Bôi đen số cũ
    }
    updateErrorMessages();
});

document.getElementById('endMinute').addEventListener('input', function () {
    const value = this.value;
    if (value.length === 2) {
        this.blur();
        setTimeout(500);
        tinh();
    }

    updateErrorMessages();
});

// Chọn toàn bộ nội dung khi focus vào input
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function () {
        this.select();
    });
});

