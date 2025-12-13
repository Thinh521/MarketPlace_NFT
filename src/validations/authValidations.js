const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_REGEX = /^(0|\+84)[0-9]{9}$/;

export const VALIDATION_RULES = {
  name: {
    required: 'Please enter collection name',
    minLength: {
      value: 3,
      message: 'Name must be at least 3 characters',
    },
    maxLength: {
      value: 100,
      message: 'Name must not exceed 100 characters',
    },
  },

  fullName: {
    required: 'Please enter full name',
    minLength: {
      value: 2,
      message: 'Full name must be at least 2 characters',
    },
    maxLength: {
      value: 50,
      message: 'Full name must not exceed 50 characters',
    },
  },

  userName: {
    required: 'Please enter username',
    minLength: {
      value: 3,
      message: 'Username must be at least 3 characters',
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: 'Username can only contain letters, numbers and underscore',
    },
  },

  bio: {
    required: 'Please enter bio',
    maxLength: {
      value: 500,
      message: 'Bio must not exceed 500 characters',
    },
  },

  description: {
    required: 'Please enter description',
    maxLength: {
      value: 1000,
      message: 'Description must not exceed 500 characters',
    },
  },

  email: {
    required: 'Vui lòng nhập email',
    pattern: {
      value: EMAIL_REGEX,
      message: 'Email không hợp lệ',
    },
  },

  externalLink: {
    required: 'Please enter external link',
    pattern: {
      value:
        /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)([\w\-,@?^=%&:/~+#]*[\w\-,@?^=%&/~+#])?$/,
      message: 'Invalid URL format',
    },
  },

  phone: {
    required: 'Vui lòng nhập số điện thoại',
    pattern: {
      value: PHONE_REGEX,
      message: 'Số điện thoại không hợp lệ (định dạng Việt Nam)',
    },
  },

  emailOrPhone: {
    required: 'Vui lòng nhập email hoặc SĐT',
    validate: value => {
      const trimmed = value?.trim();
      return (
        EMAIL_REGEX.test(trimmed) ||
        PHONE_REGEX.test(trimmed) ||
        'Vui lòng nhập đúng định dạng email hoặc SĐT'
      );
    },
  },

  password: {
    required: 'Vui lòng nhập mật khẩu',
    minLength: {
      value: 6,
      message: 'Mật khẩu phải có ít nhất 6 ký tự',
    },
  },

  newPassword: {
    required: 'Vui lòng nhập mật khẩu mới',
    minLength: {
      value: 8,
      message: 'Mật khẩu mới phải có ít nhất 8 ký tự',
    },
    validate: value => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      if (!hasUpperCase || !hasLowerCase) {
        return 'Mật khẩu phải có cả chữ hoa và chữ thường';
      }
      if (!hasNumber) {
        return 'Mật khẩu phải có ít nhất một số';
      }
      if (!hasSpecialChar) {
        return 'Mật khẩu phải có ít nhất một ký tự đặc biệt';
      }
      return true;
    },
  },

  confirmPassword: watchPassword => ({
    required: 'Vui lòng nhập lại mật khẩu',
    validate: value =>
      value === watchPassword || 'Mật khẩu xác nhận không khớp',
  }),

  yearOfBirth: {
    required: 'Vui lòng nhập năm sinh',
    pattern: {
      value: /^\d{4}$/,
      message: 'Năm sinh phải là 4 chữ số',
    },
  },

  address: {
    required: 'Vui lòng nhập địa chỉ',
    minLength: {
      value: 5,
      message: 'Địa chỉ quá ngắn',
    },
  },

  nationality: {
    required: 'Vui lòng chọn quốc gia',
  },

  gender: {
    required: 'Vui lòng chọn giới tính',
    validate: value =>
      ['male', 'female', 'other'].includes(value)
        ? true
        : 'Giới tính không hợp lệ',
  },

  saleType: {
    required: 'Please select the type of sale',
  },

  price: {
    required: 'Please enter price',
    validate: value => parseFloat(value) > 0 || 'Price must be greater than 0',
  },

  reservePrice: {
    required: 'Reserve price is required',
    validate: value => parseFloat(value) > 0 || 'Must be greater than 0',
  },

  quantity: {
    required: 'Please enter quantity',
    validate: value =>
      parseFloat(value) > 0 || 'Quantity must be greater than 0',
  },

  startDate: {
    required: 'Please enter start date',
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: 'Format: YYYY-MM-DD',
    },
  },

  endDate: {
    required: 'Please enter end date',
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: 'Format: YYYY-MM-DD',
    },
  },

  supply: {
    required: 'Please enter supply',
    pattern: {value: /^[0-9]+$/, message: 'Must be a number'},
    min: {value: 1, message: 'Must be at least 1'},
    max: {value: 10000, message: 'Must not exceed 10000'},
  },

  blockchain: {
    required: 'Please select blockchain network',
  },
};
