import { useMemo } from "react";
import applySpec from "ramda/src/applySpec";

import { useDispatch, useSelector } from "react-redux";

import { Tree } from "../helpers/objects";
import { ActionCreator } from "./core";
import { bindActionCreators, SelectorSpec } from "./redux";

/**
 * Return store-bound action-creators.
 *
 * @param unboundActions action-creators generated by "re-reduced/createActions"
 */
export function useActions<TActions extends Tree<ActionCreator<any>> = {}>(
  unboundActions: TActions
): TActions {
  const dispatch = useDispatch();
  const boundActions = useMemo(() => {
    const { actions } = bindActionCreators(unboundActions)(dispatch);
    return actions;
  }, [dispatch, unboundActions]);

  return boundActions;
}

export type SimpleMapStateToProps<TResult, TState> = (state: TState) => TResult;

/**
 * Return mappedState.
 *
 * @param selectorOrMapState either normal mapStateToProps (without ownProps as 2nd parameter) or selectorSpecs
 */
export function useReduxState<TResult, TState = any>(
  selectorOrMapState:
    | SelectorSpec<TResult, TState>
    | SimpleMapStateToProps<TResult, TState>
): TResult {
  const stateToProps = useMemo(() => {
    return typeof selectorOrMapState === "object"
      ? // selector
        applySpec<TResult>(selectorOrMapState)
      : // mapStateFn
        selectorOrMapState;
  }, [selectorOrMapState]);

  const state = useSelector<TState, TResult>(stateToProps);
  return state;
}
