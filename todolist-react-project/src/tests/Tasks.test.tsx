import { fireEvent, getByRole, render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from 'vitest';
import Tasks from "../components/Tasks";
import { useTaskContext } from "../hooks/useTaskContext";

// Mocks
vi.mock("../hooks/useTaskContext");

describe('Tasks component tests', () => {
    test('Should render task information the buttons', () => {

        vi.mocked(useTaskContext).mockReturnValue({
            tasks: [
                {
                    title: "Practicar con React",
                    category: "Tareas por hacer",
                    check: false,
                },
            ],
            tasksFiltrated: [],
            handleAddTask: vi.fn(),
            handleFilter: vi.fn(),
            deleteTask: vi.fn(),
            editTask: vi.fn(),
            handleCheck: vi.fn(),
        });

        render(
            <Tasks
                index={0}
                title="Practicar con React"
                category="Tareas por hacer"
                check={false}
                handleDelete={() => { }}
                handleCheck={() => { }} />
        );

        const taskTitleSpan = screen.getByText("Practicar con React");
        const taskCategorySpan = screen.getByText("Categoría: Tareas por hacer");

        expect(taskTitleSpan).toBeInTheDocument();
        expect(taskCategorySpan).toBeInTheDocument();
    });

    test('Should interact with the delete button', () => {

        // El mock para que no llame al delete del context de verdad
        const handleDeleteMock = vi.fn();

        render(
            <Tasks
                index={0}
                title="Practicar con React"
                category="Tareas por hacer"
                check={false}
                handleDelete={handleDeleteMock} // Para llamar al mock simulado
                handleCheck={() => { }} />
        );

        // Obtenemos el botón de eliminar
        const deleteButton = screen.getByRole('button', { name: /delete/i });

        // Simulamos el click en el botón de eliminar
        fireEvent.click(deleteButton);

        // Ha sido llamado por lo menos 1 vez
        expect(handleDeleteMock).toHaveBeenCalledTimes(1);

        // Se eliminó la primera tarea
        expect(handleDeleteMock).toHaveBeenCalledWith(0);
    });

    test('Should interact with the edit button', () => {

        render(
            <Tasks
                index={0}
                title="Practicar con React"
                category="Tareas por hacer"
                check={false}
                handleDelete={() => { }}
                handleCheck={() => { }} />
        );

        const editButton = screen.getByRole('button', { name: /edit/i });

        fireEvent.click(editButton);

        expect(screen.getByPlaceholderText("Tarea"));
        expect(screen.getByPlaceholderText("Categoría"));
    });

    test('Should interact with the check button', () => {
        // El mock de handleCheck
        const handleCheckMock = vi.fn();

        render(
            <Tasks
                index={0}
                title="Practicar con React"
                category="Tareas por hacer"
                check={false}
                handleDelete={() => { }}
                handleCheck={handleCheckMock} />
        );

        const checkElement = screen.getByRole('checkbox');

        fireEvent.click(checkElement);

        expect(handleCheckMock).toHaveBeenCalledTimes(1);
        expect(handleCheckMock).toHaveBeenCalledWith(0);
    });
});