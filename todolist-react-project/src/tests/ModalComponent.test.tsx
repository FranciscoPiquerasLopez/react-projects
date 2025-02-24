import ModalComponent from "../components/ModalComponent";
import { test, describe, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import useAddTaskForm from "../hooks/useAddTaskForm";
import { SetStateAction } from "react";
import useEditTaskForm from "../hooks/useEditTaskForm";

// Estructura:
// Formulario con múltiples campos tipo Input
// Botones Enviar | Editar se encargan del envío del form
// Envío a través de handleSubmit o handleSubmitEdit
// title y category son gestionados por estado React

// Mockear el contexto de useAddTaskForm y de useEditTaskForm
vi.mock("../hooks/useAddTaskForm");
vi.mock("../hooks/useEditTaskForm");

describe('ModalComponent tests', () => {
    test('Inputs should render in the modal', () => {

        vi.mocked(useAddTaskForm).mockReturnValue({
            title: "",
            setTitle: vi.fn(),
            category: "",
            setCategory: vi.fn(),
            handleSubmit: vi.fn(),
        });

        render(
            <ModalComponent
                modalType="addTask"
                open={true}
                setOpen={() => { }}
                titleProp=""
                categoryProp="" />
        );

        expect(screen.getByPlaceholderText("Tarea"));
        expect(screen.getByPlaceholderText("Categoría"));
    });

    test('Should update the title and category values when the user types', () => {

        let title = "";
        let category = "";

        vi.mocked(useAddTaskForm).mockReturnValue({
            title,
            setTitle: vi.fn((value: SetStateAction<string>) => {
                title = typeof value === "function" ? value(title) : value;
            }),
            category,
            setCategory: vi.fn((value: SetStateAction<string>) => {
                category = typeof value === "function" ? value(category) : value;
            }),
            handleSubmit: vi.fn(),
        });

        render(
            <ModalComponent
                modalType="addTask"
                open={true}
                setOpen={() => { }}
                titleProp=""
                categoryProp="" />
        );

        // Obtenemos los input text renderizados en la modal
        const titleInput = screen.getByPlaceholderText("Tarea") as HTMLInputElement;
        const categoryInput = screen.getByPlaceholderText("Categoría") as HTMLInputElement;

        // Disparamos evento de escucha en los input para que se haga el cambio de estado
        fireEvent.change(titleInput, { target: { value: "Nueva tarea" } });
        fireEvent.change(categoryInput, { target: { value: "Trabajo" } });

        // Comprobamos si se ha hecho el cambio de estado
        expect(title).toBe("Nueva tarea");
        expect(category).toBe("Trabajo");
    });

    test("Should recieve default values", () => {

        vi.mocked(useEditTaskForm).mockReturnValue({
            title: "Nueva tarea",
            setTitle: vi.fn(),
            category: "Trabajo",
            setCategory: vi.fn(),
            handleSubmitEdit: vi.fn(),
        });

        render(
            <ModalComponent
                modalType="editTask"
                open={true}
                setOpen={(() => { })}
                titleProp="Nueva tarea"
                categoryProp="Trabajo"
                check={true}
                index={1} />
        );

        const titleInput = screen.getByPlaceholderText("Tarea") as HTMLInputElement;
        const categoryInput = screen.getByPlaceholderText("Categoría") as HTMLInputElement;

        expect(titleInput.value).toBe("Nueva tarea");
        expect(categoryInput.value).toBe("Trabajo");
    });

    test("Check if handleSubmit it works well", () => {

        const handleSubmitMock = vi.fn();

        vi.mocked(useAddTaskForm).mockReturnValue({
            title: "",
            setTitle: vi.fn(),
            category: "",
            setCategory: vi.fn(),
            handleSubmit: handleSubmitMock,
        });

        render(
            <ModalComponent
                modalType="addTask"
                open={true}
                setOpen={() => { }}
                titleProp=""
                categoryProp="" />
        );

        // Obtenemos el botón de enviar
        const buttonSubmit = screen.getByText("Enviar");

        // Disparamos el evento
        fireEvent.click(buttonSubmit);
        
        // Verificar que el handleSubmit ha sido llamado
        expect(handleSubmitMock).toHaveBeenCalled();
    });
});