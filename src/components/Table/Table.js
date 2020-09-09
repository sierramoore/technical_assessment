import React, { useState } from 'react';
import {
    ValueContainer,
    RowContainer,
    TableContainer,
    ScrollableContainer,
    Button,
    Input,
    PopUp
} from './Table.style';


// table cell
const Value = ({ value }) => {
    if(!!value) {
        return (
            <ValueContainer>
                {value}
            </ValueContainer>
        )
    }
    return (
        <ValueContainer/>
    )
};

// table row
const Row = ({ entry }) => {
    const values = Object.values(entry).map(value => <Value value={value}/>)
    return (
        <RowContainer key={entry.id}>
            {values}
        </RowContainer>
    )
};
// add row of input 
const AddRow = ({ keys, addFn }) => {
    const [entry, setEntry] = useState(
        keys.reduce((acc, curr) => ({ ...acc, [curr]: '' })
            , {})
    );
    const inputs = keys.map(key =>
        <ValueContainer>
            <Input
                placeholder={key}
                value={entry[key]}
                onChange={
                    (e) => {
                        // set variable added to entry 
                        setEntry({ ...entry, [key]: e.target.value });
                    }
                }
            />
        </ValueContainer>
    );
    return (
        <RowContainer>
            <RowContainer>
                {inputs}
            </RowContainer>
            <Button onClick={() => addFn(entry)}>Add</Button>
        </RowContainer>
    )
}

export const Table = ({ entries, buttonFn, addFn }) => {
    // for right click popup, get users coordinates and toggle view
    const [popupToggle, setPopupToggle] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const theme = {
        top: popupPosition.y,
        left: popupPosition.x
    };
    const popMenu = (ev) => {
        ev.preventDefault();
        setPopupPosition({ x: ev.clientX, y: ev.clientY });
        setPopupToggle(!popupToggle);
    };

    const [addToggle, setToggle] = useState(false);

    if (entries.length === 0) return <TableContainer />;

    // get keys from entry data. (some keys missing from data set) so map over all and get a unique set of keys 
    const keys = Array.from(new Set(entries.map(entry => Object.keys(entry)).reduce((acc, curr)=>[...acc, ...curr],[])));

    // display keys as header row 
    const header = <Row entry={keys} />; 

    const rows = entries.map( entry => (
        <RowContainer key={entry.id}>
            {/* keys is all unique properties. add empty value in row if a key or key:value pair is missing */}
            <Row entry={keys.reduce((acc, curr)=>({...acc, [curr]:(!!entry[curr]?entry[curr]:'')}),{})} />
            {!!buttonFn ? <Button onClick={buttonFn}>
                Entities
            </Button>:<></>}  
        </RowContainer>
    ));
    return (
        <TableContainer onContextMenu={popMenu}>
            {
                popupToggle ?
                    <PopUp theme={theme}>
                        test
                    </PopUp> : <></>
            }
            <RowContainer>
                {header}
                {
                    !!addFn ? 
                    <Button onClick={() => setToggle(!addToggle)}>Add Row</Button> : <></>
                }
                
            </RowContainer>
            {addToggle ? <AddRow keys={Object.keys(entries[0])} addFn={addFn} /> : <></>}
            <ScrollableContainer>
                {rows}
            </ScrollableContainer>
        </TableContainer>
    )
};