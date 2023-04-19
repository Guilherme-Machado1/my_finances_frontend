import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function successToast(message: string) {
  toast.success(message);
}

export function errorToast(message: string) {
  toast.error(message);
}

export function warningToast(message: string) {
  toast.warning(message);
}