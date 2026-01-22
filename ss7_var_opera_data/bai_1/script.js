function convertMoney() {
    let amount = document.getElementById("amount").value;
    let from = document.getElementById("fromCurrency").value;
    let to = document.getElementById("toCurrency").value;

    // Tỉ giá quy đổi về VND
    let rate = {
        VND: 1,
        USD: 24000,
        EUR: 26000
    };

    // Chuyển về VND trước
    let amountInVND = amount * rate[from];

    // Chuyển từ VND sang tiền cần đổi
    let result = amountInVND / rate[to];

    document.getElementById("result").innerText =
        "Kết quả: " + result.toFixed(2) + " " + to;
}
