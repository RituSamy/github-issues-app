import * as actions from "../data/actionTypes";
import { connect } from "react-redux";
import Issues from "../components/issues";
import processData from "../data/processData";

const mapStateToProps = (state) => {
  return {
    author: state.author,
    label: state.label,
    order: state.order,
    issues: state.issues,
    searchQuery: state.searchQuery,
  };
};

const mapDispatchToProps = {
  refresh: () => {
    return (dispatch) => {
      fetch(`https://api.github.com/repos/github/hub/issues?&state=open`, {
        header: "token 7cd8241e123dc5ff10bfa8999fabe4bcd0ff9b15",
      })
        .then((res) => res.json())
        .then((json) => processData(json))
        .then((json) => {
          dispatch({
            type: actions.REFRESH,
            payload: {
              data: json,
            },
          });
        });
    };
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Issues);
