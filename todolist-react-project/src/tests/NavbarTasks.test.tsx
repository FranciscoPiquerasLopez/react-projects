import NavbarTasks from "../components/NavbarTasks";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from 'vitest';
import { useTaskContext } from "../hooks/useTaskContext";

// Mockear el contexto
vi.mock("../hooks/useTaskContext");

describe('NavbarTasks component tests', () => {

    test('Should render button to add tasks and select with options', () => {
        
        vi.mocked(useTaskContext).mockReturnValue({
            tasks: [],
            tasksFiltrated: [],
            handleAddTask: vi.fn(),
            handleFilter: vi.fn(),
            deleteTask: vi.fn(),
            editTask: vi.fn(),
            handleCheck: vi.fn(),
        });

        render(<NavbarTasks />);

        // Verificar si el botón está presente y renderizado en pantalla
        expect(screen.getByText("Añadir tarea")).toBeInTheDocument();

        // Verificar si el select está presente
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    test('Should open modal when clicking "Añadir tarea" button', () => {
        
        vi.mocked(useTaskContext).mockReturnValue({
            tasks: [],
            tasksFiltrated: [],
            handleAddTask: vi.fn(),
            handleFilter: vi.fn(),
            deleteTask: vi.fn(),
            editTask: vi.fn(),
            handleCheck: vi.fn(),
        });

        render(<NavbarTasks />);

        // Verificar que el modal no esté abierto al inicio
        expect(screen.queryByPlaceholderText("Tarea")).toBeNull();

        // Click en botón 'Añadir tarea'
        fireEvent.click(screen.getByText("Añadir tarea"));

        expect(screen.getByPlaceholderText("Tarea")).toBeInTheDocument();
    });

    test('Should call handleFilter with selected category', () => {

        const handleFilterMock = vi.fn();

        vi.mocked(useTaskContext).mockReturnValue({
            tasks: [{ title: 'Nueva tarea', category: 'Trabajo', check: false }],
            tasksFiltrated: [],
            handleAddTask: vi.fn(),
            handleFilter: handleFilterMock,
            deleteTask: vi.fn(),
            editTask: vi.fn(),
            handleCheck: vi.fn(),
        });

        render(<NavbarTasks />);

        const selectTasks = screen.getByRole('combobox');

        // Simular cambio en el select
        fireEvent.change(selectTasks, { target: { value: 'Trabajo' } });

        // Comprobamos que que el listener es llamado
        expect(handleFilterMock).toHaveBeenCalledWith('Trabajo');
    });
});