const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  // - currency: Xác định mã tiền tệ của định dạng số
  currency: "VND",
  style: "currency",
});

export const formatCurrency = (number) => {
  return CURRENCY_FORMATTER.format(number);
};

// Hàm formatCurrency lấy một đối số là number và trả về chuỗi định dạng của số này bằng cách sử dụng đối tượng CURRENCY_FORMATTER được định nghĩa trước đó.

// Mã này hữu ích khi làm việc với các ứng dụng liên quan đến giá trị tiền tệ và yêu cầu định dạng tiền tệ nhất quán trên các locale khác nhau.
