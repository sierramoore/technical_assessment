import styled from 'styled-components';

// table cell 
export const ValueContainer = styled.div`
    width: 140px;
    height: 90px;
    text-align: center;
    padding: 10px 5px;
    border-left: 1px solid #939191;
    border-top: 1px solid #939191;
    
    &:nth-child(2n+1), &:first-child {
        background: #f2f2f2;
    }
`;
// table row 
export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    overflow-wrap: break-word; 
`;
// table minus the header row
export const ScrollableContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
// entire table 
export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2% auto;
    width: 96vw;
    overflow-x: scroll;
`;
export const Button = styled.button`
    display: inline-block;
    padding: 10px 15px;
    min-width: 140px;
    height: 90px;
    background-color: #fff;
    border: 1px solid #939191;
`;
export const Input = styled.input`
    text-align: center;
    width: 100%;
    height: 70px;
    padding: 10px 5px;
`;
// popup context menu with 'test'
export const PopUp = styled.div`
    position: fixed;
    top: ${props => `${props.theme.top}px`};
    left: ${props => `${props.theme.left}px`};
    width: 150px;
    padding: 10px 15px;
    z-index: 10;
    text-align: center;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;
