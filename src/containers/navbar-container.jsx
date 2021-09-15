import * as actions from "../data/actionTypes";
import { connect } from "react-redux";
import NavBar from "../components/navbar";
import processData from "../data/processData";

const mapStateToProps = (state) => {
  return {
    author: state.author,
    label: state.label,
    order: state.order,
    searchQuery: state.searchQuery,
  };
};

const mapDispatchToProps = {
  sort: (order) => ({
    type: actions.SORT,
    payload: {
      order,
    },
  }),
  applyFilter: (label, author) => {
    return (dispatch) => {
      let url = getUrl(label, author);
      fetch(url)
        .then((res) => res.json())
        .then((json) => processData(json))
        .then((json) => {
          dispatch({
            type: actions.APPLY_FILTER,
            payload: {
              label,
              author,
              data: json,
            },
          });
        });
    };
  },
  search: (query) => ({
    type: actions.SEARCH,
    payload: {
      query,
    },
  }),
  resetSearch: (label, author) => {
    // remember to sort after this...
    return (dispatch) => {
      let url = getUrl(label, author);
      fetch(url, {
        header: "token 7cd8241e123dc5ff10bfa8999fabe4bcd0ff9b15",
      })
        .then((res) => res.json())
        .then((json) => processData(json))
        .then((json) => {
          dispatch({
            type: actions.RESET_SEARCH,
            payload: {
              data: json,
            },
          });
        });
    };
  },
  clearFilters: () => ({
    type: actions.CLEAR_FILTERS,
  }),
};

function getUrl(label, author) {
  let url = null;
  if (label === "All" && author !== "") {
    url = `https://api.github.com/repos/github/hub/issues?&state=open&creator=${author}`;
  } else if (label === "All" && author === "") {
    url = `https://api.github.com/repos/github/hub/issues?&state=open`;
  } else if (label !== "All" && author !== "") {
    url = `https://api.github.com/repos/github/hub/issues?&state=open&labels=${label}&creator=${author}`;
  } else {
    url = `https://api.github.com/repos/github/hub/issues?&state=open&labels=${label}`;
  }
  return url;
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
