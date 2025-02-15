import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Button from '.';

describe('Button Component Test Results', () => {
  test('Is the title shown correctly?', () => {
    const {getByText} = render(<Button title="Test Butonu" />);
    expect(getByText('Test Butonu')).toBeTruthy();
  });

  test('Is the button clickable?', () => {
    const mockOnPress = jest.fn();
    const {getByText} = render(<Button title="Click" onPress={mockOnPress} />);

    fireEvent.press(getByText('Click'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test('Does ActivityIndicator show in loading status?', () => {
    const {queryByText, getByTestId} = render(
      <Button title="Loading" loading />,
    );

    expect(queryByText('Loading')).toBeNull();
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  test('Buton disable olduğunda tıklanmıyor mu?', () => {
    const mockOnPress = jest.fn();
    const {getByText} = render(
      <Button title="Disable" onPress={mockOnPress} disabled />,
    );

    fireEvent.press(getByText('Disable'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
