import {
  showErrorMessage,
  showSuccessMessage,
  showWarningMessage,
} from '~/components/ToastMessage/ToastMessage';

export const notify = (type, message, description, duration) => {
  const fn = {
    success: showSuccessMessage,
    error: showErrorMessage,
    warning: showWarningMessage,
  }[type];

  fn?.({ icon: false, message, description, duration });
};
