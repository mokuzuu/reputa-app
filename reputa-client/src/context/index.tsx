import * as React from "react";
import API from "api";

/**
 * type for actions
 */
type Action =
  | { type: "set_search_word"; searchWord: string }
  | { type: "start_search" }
  | { type: "finish_search"; result: any }
  | { type: "fail_search" };
/**
 * Dispatch is a fuction which receives action as argument 
 */
type Dispatch = (action: Action) => void;
type Tweet = {
  id: number;
  text: string;
  score: number;
  positive_words: string[];
  negative_words: string[];
  positive: boolean;
};
type State = {
  result: {
    positive_rate: number;
    negative_rate: number;
    neutral_rate: number;
    tweets: Tweet[];
  };
  searchWord: string;
  isSearching: boolean;
};
type SearchProviderProps = { children: React.ReactNode };
const SearchStateContext = React.createContext<State | undefined>(undefined);
const SearchDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);
function searchReducer(state: State, action: Action) {
  switch (action.type) {
    case "set_search_word":
      return {
        ...state,
        searchWord: action.searchWord
      };
    case "start_search": {
      return { ...state, isSearching: true };
    }
    case "finish_search":
      return { ...state, result: action.result, isSearching: false };
    case "fail_search":
      return {
        ...state,
        isSearching: false
      }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

/**
 * Passed down global states to components
 * @param param0 children components which will receive state 
 */
function SearchProvider({ children }: SearchProviderProps) {
  const [state, dispatch] = React.useReducer(searchReducer, {
    result: null,
    searchWord: "",
    isSearching: false,
  });
  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  );
}
/**
 * Hooks to pass global search result state
 */
function useSearchState() {
  const context = React.useContext(SearchStateContext);
  if (context === undefined) {
    throw new Error("useSearchState must be used within a SearchProvider");
  }
  return context;
}
/**
 * Hooks to pass global search dispatch function 
 */
function useSearchDispatch() {
  const context = React.useContext(SearchDispatchContext);
  if (context === undefined) {
    throw new Error("useSearchDispatch must be used within a SearchProvider");
  }
  return context;
}
/**
 * 
 * @param dispatch dispatch function 
 * @param word word to search
 */
async function search(dispatch: Dispatch, word: string) {
  dispatch({ type: "set_search_word", searchWord: word });
  dispatch({ type: "start_search" });
  try {
    const searchResult = await API.search(word);
    console.log(searchResult)
    dispatch({ type: "finish_search", result: searchResult });
  } catch (error) {
    alert("Please check your internet connection, or if it is not the issue, please report us.")
    dispatch({ type: "fail_search" });
  }
}

export { SearchProvider, useSearchDispatch, useSearchState, search };
