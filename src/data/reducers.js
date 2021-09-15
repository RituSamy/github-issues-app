import * as actions from "./actionTypes";

const initialState = {
  author: "",
  order: "Newest",
  label: "All",
  searchQuery: "",
  issues: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.REFRESH:
      return { ...state, issues: action.payload.data };
    case actions.SORT:
      return {
        ...state,
        order: action.payload.order,
        issues: sort(state.issues, action.payload.order),
      };
    case actions.APPLY_FILTER:
      return {
        ...state,
        label: action.payload.label,
        author: action.payload.author,
        issues: search(action.payload.data, state.searchQuery),
      };
    case actions.SEARCH:
      return {
        ...state,
        searchQuery: action.payload.query,
        issues: sort(search(state.issues, action.payload.query), state.order),
      };
    case actions.RESET_SEARCH:
      return {
        ...state,
        searchQuery: action.payload.query,
        issues: sort(action.payload.data, state.order),
      };
    case actions.CLEAR_FILTERS:
      let issues = [];
      if (state.searchQuery) {
        issues = sort(search(state.issues, state.searchQuery), "Newest");
      }
      return {
        ...state,
        order: "Newest",
        label: "All",
        issues,
      };
    default:
      return state;
  }
}

function sort(arr, order) {
  if (order === "Newest") {
    return arr.sort((a, b) => a.created_at[0] - b.created_at[0]);
  } else if (order === "Oldest") {
    return arr.sort((a, b) => b.created_at[0] - a.created_at[0]);
  } else if (order === "Most Commented") {
    return arr.sort((a, b) => b.comments - a.comments);
  } else if (order === "Least Commented") {
    return arr.sort((a, b) => a.comments - b.comments);
  } else if (order === "Recently Updated") {
    return arr.sort((a, b) => a.updated_at[0] - b.updated_at[0]);
  } else if (order === "Least Recently Updated") {
    return arr.sort((a, b) => b.updated_at[0] - a.updated_at[0]);
  } else {
    return arr;
  }
}

function search(arr, query) {
  if (query) {
    return arr.filter(
      (issue) =>
        issue.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        issue.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  } else {
    return arr;
  }
}
