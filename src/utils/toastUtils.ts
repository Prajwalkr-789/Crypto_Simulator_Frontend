import { toast } from 'react-hot-toast';

type ErrorType = string | Record<string, string>;

interface ToastOptions {
    showMessage: (message: string) => void;
    showError: (error: ErrorType) => void;
    showInfo: (message: string) => void;
    showWarning: (message: string) => void;
}

const baseStyle = {
  borderRadius: '4px',
  padding: '12px 16px',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 500,
  background: 'black',
};

// 🟢 Success (Green accent)
 const showMessage = (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-center',
    style: {
      ...baseStyle,
      background: 'black',
      boxShadow : '0px 1px 6px green',
    //   border: '1px solid #2ECC71',
    },
    icon: '✅',
  });
};

// 🔴 Error (Red accent)
const showError = (error: ErrorType) => {
  if (typeof error === 'string') {
    toast.error(error, {
      duration: 4000,
      position: 'top-center',
      style: {
        ...baseStyle,
        boxShadow : '0px 1px 6px  red',
      },
      icon: '⛔',
    });
  } else {
    Object.entries(error).forEach(([key, msg]) => {
      toast.error(`${key}: ${msg}`, {
        duration: 4000,
        position: 'top-center',
        style: {
          ...baseStyle,
          boxShadow : '0px 1px 6px  red',
        },
        icon: '⛔',
      });
    });
  }
};

// 🔵 Info (Blue accent)
const showInfo = (message: string) => {
  toast(message, {
    duration: 3000,
    position: 'top-center',
    style: {
      ...baseStyle,

      boxShadow : '0px 1px 6px  #4169e1',
    },
    icon: 'ℹ️',
  });
};

// 🟡 Warning (Yellow accent)
const showWarning = (message: string) => {
  toast(message, {
    duration: 3000,
    position: 'top-center',
    style: {
      ...baseStyle,
      boxShadow : '0px 1px 6px  yellow',
    },
    icon: '⚠️',
  });
};

export const toastUtils : ToastOptions = { showMessage, showError, showInfo, showWarning };