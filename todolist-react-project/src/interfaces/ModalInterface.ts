export interface ModalInterface {
    modalType: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    titleProp: string | "";
    categoryProp: string | "";
    check?: boolean
    index?: number;
}