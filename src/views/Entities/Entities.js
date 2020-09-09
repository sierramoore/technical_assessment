import React, { useReducer, useEffect } from 'react';
import { getEntities } from '../../store/EntitiyStore';
import { Table } from '../../components/Table';
import { StyledEntities } from './Entities.style';

export const Entities = () => {
    const initialState = {
        loading: false,
        error: false,
        data: []
    }
    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case "add": 
                return {...state, data: [...state.data, action.payload]};
            case "loading":
                return { ...state, loading: action.payload };
            case "error":
                return { ...state, loading: false, error: action.payload };
            case "success":
                return { ...state, loading: false, error: false, data: action.payload };
            default:
                return state;
        }
    }
    const [entities, dispatchEntities] = useReducer(reducer, initialState);

    const add = (entry) => {
        dispatchEntities({type: "add", payload: entry});
    }

    useEffect(() => {
        const fetchData = async () => {
            dispatchEntities({ type: "loading", payload: true });
            const entities = await getEntities();
            if (entities) {
                dispatchEntities({ type: "success", payload: entities });
            } else {
                dispatchEntities({ type: "error", payload: true });
            }
        }
        if (entities.data.length === 0 && !entities.loading) fetchData();
    }, [entities]);

    const entries = entities.data;

    return (
        <StyledEntities>
            <Table entries={entries} addFn={add}/>
        </StyledEntities>
    );
}