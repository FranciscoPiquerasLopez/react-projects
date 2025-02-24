import Input from "../components/Input";
import { test, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Input component', () => {

    test('Input renders with default props', () => {
        render(
            <Input
                name="test-input"
                id="input-id"
                placeholder=""
                value=""
                onChange={() => { }} />
        );

        const inputElement = screen.getByRole("textbox");

        // Verificar el valor predeterminado del input
        expect(inputElement).toHaveProperty("type", "text");

        // Verificar las props que no tienen valor por defecto
        expect(inputElement).toHaveProperty("name", "test-input");
        expect(inputElement).toHaveProperty("id", "input-id");
    });

    test('Input render with a custom type and placeholder', () => {
        render(
            <Input
                type="email"
                name="email-input"
                id="email-id"
                placeholder="Email"
                value=""
                onChange={() => { }} />
        );

        const inputElement = screen.getByPlaceholderText("Email");

        // Verificar que el input sea de tipo email
        expect(inputElement).toHaveProperty("type", "email");
        expect(inputElement).toHaveProperty("name", "email-input");
        expect(inputElement).toHaveProperty("id", "email-id");
    });

    test('Accepts a value and triggers onChange', () => {

        const handleChange = vi.fn();

        render(
            <Input
                name="input-text"
                id="input-id"
                placeholder=""
                value="Hello"
                onChange={handleChange} />
        );

        const inputElement = screen.getByRole("textbox");

        // Verificar si tiene valor inicial
        expect(inputElement).toHaveProperty("value", "Hello");

        // Dispara un onChange Event
        fireEvent.change(inputElement, { target: { value: "New value" } });

        // Verificar que el onChange haya sido llamado
        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});