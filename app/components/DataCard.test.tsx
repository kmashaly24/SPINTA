import React from 'react';
import { render } from '@testing-library/react-native';
import { DataCard } from './DataCard';

describe('DataCard', () => {
  it('renders label and value correctly', () => {
    const { getByText } = render(<DataCard label="Goals" value={15} />);

    expect(getByText('Goals')).toBeTruthy();
    expect(getByText('15')).toBeTruthy();
  });

  it('renders subtitle when provided', () => {
    const { getByText } = render(
      <DataCard label="Minutes" value={720} subtitle="80 avg" />
    );

    expect(getByText('Minutes')).toBeTruthy();
    expect(getByText('720')).toBeTruthy();
    expect(getByText('80 avg')).toBeTruthy();
  });

  it('renders string values', () => {
    const { getByText } = render(<DataCard label="Rating" value="8.5" />);

    expect(getByText('Rating')).toBeTruthy();
    expect(getByText('8.5')).toBeTruthy();
  });

  it('applies different variants', () => {
    const { rerender, getByText } = render(
      <DataCard label="Success" value={100} variant="success" />
    );
    expect(getByText('Success')).toBeTruthy();

    rerender(<DataCard label="Error" value={0} variant="error" />);
    expect(getByText('Error')).toBeTruthy();

    rerender(<DataCard label="Warning" value={50} variant="warning" />);
    expect(getByText('Warning')).toBeTruthy();
  });

  it('renders with gradient when specified', () => {
    const { getByText } = render(
      <DataCard label="Goals" value={10} gradient />
    );

    expect(getByText('Goals')).toBeTruthy();
    expect(getByText('10')).toBeTruthy();
  });

  it('accepts custom style prop', () => {
    const customStyle = { width: '50%' };
    const { getByText } = render(
      <DataCard label="Test" value={5} style={customStyle} />
    );

    expect(getByText('Test')).toBeTruthy();
  });
});
