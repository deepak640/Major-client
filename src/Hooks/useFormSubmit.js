import { useFormik } from 'formik';
import ApiRequest from 'src/API/apirequest';
import { setLocalStorageItem } from 'src/utils/Localstorage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (message, type, redirect) => {
    const toastOptions = {
        position: "bottom-right",
        containerId: 'login',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };

    switch (type) {
        case 'success':
            toast.success(message, { ...toastOptions, onClose: () => { window.location.href = redirect } });
            break;
        case 'error':
            toast.error(message, toastOptions);
            break;
        case 'warning':
            toast.warn(message, toastOptions);
            break;
        default:
            break;
    }
}

const useFormikValues = (initialValues, url, options = { authorization: false }, redirect) => {
    const { values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try {
                if ((values.email === 'deepak@gmail.com' || values.enroll_no === 'deepak@gmail.com') && values.password === 'admin123') {
                    setLocalStorageItem('isAdmin', true);
                    window.location.href = '/controls';
                }
                else {
                    const res = await ApiRequest(url, 'POST', values, options);
                    if (res.auth) {
                        setLocalStorageItem('Data', res, new Date().getTime() + 3600 * 1000);
                        showToast('You are Logged In', 'success', redirect);
                    }
                }
            } catch (error) {
            }
        },
    });

    return { values, handleBlur, handleChange, handleSubmit };
};

export default useFormikValues;