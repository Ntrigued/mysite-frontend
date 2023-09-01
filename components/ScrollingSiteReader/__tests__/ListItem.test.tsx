import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import * as react_query from "@tanstack/react-query";
import ListItem from "../ListItem";


const mockAdapter = jest.fn().mockImplementation(() => {
    return {
        getItemTitle: () => {return "Mock Title"}
    };
});
// @ts-ignore
react_query.useQuery = jest.fn((queryKey, queryFn) => {
    return{isLoading: false, isError: false, data: queryFn(), error: null}});


describe('ListItem Tests', () => {
    it('Title Exists', () => {

        const {getByText} = render(<ListItem key={1} idx={2}  adapter={new mockAdapter()} item_id={1} />);
        expect(getByText('Mock Title')).toBeInTheDocument();
    });
})