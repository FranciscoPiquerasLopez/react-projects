const debounce = (callback: (value: string) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (value: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(value);
        }, delay);
    };
};

export default debounce;