import React, { Fragment, useReducer, useEffect } from 'react';
import { getAssets } from '../../store/AssetStore';
import { Table } from '../../components/Table';
import { useHistory } from "react-router-dom";
import { StyledAssets } from './Assets.style';

export const Assets = () => {
  const history = useHistory();
  const navigateToEntries = () => {
    history.push('entities');
  };

  const initialState = {
    loading: false,
    error: false,
    data: undefined
  }


  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "add": 
        return {...state, data: [action.payload, ...state.data]};
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

  const [assets, dispatchAssets] = useReducer(reducer, initialState);

  const add = (entry) => {
    dispatchAssets({type: "add", payload: entry});
    console.log(entry)
  }

  useEffect(() => {
    const fetchData = async () => {
      dispatchAssets({ type: "loading", payload: true });
      const assets = await getAssets();

      if (assets) {
        dispatchAssets({ type: "success", payload: assets });
      } else {
        dispatchAssets({ type: "error", payload: true });
      }
    }
    if (!assets.data && !assets.loading && !assets.error) fetchData();
  }, [assets.data, assets.loading, assets.error]);



  if (!!assets.data) {
    const entries = assets.data;
    return (
      <StyledAssets>
        <Table entries={entries} buttonFn={navigateToEntries} addFn={add} />
      </StyledAssets>
    );
  }
  return (
    <Fragment></Fragment>
  )
}