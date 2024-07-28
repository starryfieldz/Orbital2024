import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomDatePicker from '../datetimepicker';

describe('CustomDatePicker', () => {
    it('Unit Test: Renders correctly with initial date', () => {
        const { getByText } = render(<CustomDatePicker date={new Date('2023-07-27')} setDate={jest.fn()} />);
        expect(getByText('Thu Jul 27 2023')).toBeTruthy();
    });

    it('Unit Test: Shows date picker on button press', () => {
        const { getByText, getByTestId } = render(<CustomDatePicker date={new Date('2024-07-27')} setDate={jest.fn()} />);
        fireEvent.press(getByText('Sat Jul 27 2024'));
        expect(getByTestId('dateTimePicker')).toBeTruthy();
    });

    it('Unit Test: Changes date on date selection', () => {
        const setDateMock = jest.fn();
        const { getByText, getByTestId } = render(<CustomDatePicker date={new Date('2024-07-27')} setDate={setDateMock} />);
        fireEvent.press(getByText('Sat Jul 27 2024'));

        // Trigger the onChange event with the appropriate event structure
        fireEvent(getByTestId('dateTimePicker'), 'onChange', {
            nativeEvent: { timestamp: new Date('2023-08-27').getTime() }
        });

        expect(setDateMock).toHaveBeenCalledWith(new Date('2023-08-27'));
    });
});

