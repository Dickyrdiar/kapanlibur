/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import Spinner from '../components/Spinner'; // Replace with the correct path to your Spinner component

describe('Spinner component', () => {
  it('renders without crashing', () => {
    render(<Spinner />);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Spinner />);
    expect(asFragment()).toMatchSnapshot();
  });

  // Add more test cases as needed
});
