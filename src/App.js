import React, { Component } from "react";
import "./App.css";
import Issues from "./containers/issues-container";
import NavBar from "./containers/navbar-container";
import Pagination from "react-bootstrap/Pagination";
/*
TODO:
- make pagination only display number of pages
*/
class App extends Component {
  // AUTH TOKEN: 7cd8241e123dc5ff10bfa8999fabe4bcd0ff9b15
  state = {
    items: [],
    issues: [],
    authors: [],
    search: "",
    authorSearch: "",
    page: 1,
    order: "Newest",
    label: "All",
    author: "",
  };
  componentDidMount() {
    fetch(
      `https://api.github.com/repos/github/hub/issues?page=${this.state.page}&state=open`,
      {
        header: "token 7cd8241e123dc5ff10bfa8999fabe4bcd0ff9b15",
      }
    )
      .then((res) => res.json())
      .then((json) => {
        this.processData(json);
        this.setState({ items: json });
        let authors = json.map((item) => {
          let username = item.user.login;
          return username;
        });
        this.setState({ authors });
      });
  }

  processData(data) {
    let issues = data.map((item) => {
      let {
        html_url,
        labels,
        title,
        user,
        number,
        created_at,
        updated_at,
        comments,
      } = item;
      created_at = this.calculateDate(created_at);
      updated_at = this.calculateDate(updated_at);
      let username = null;
      let userlink = null;
      if (user) {
        username = user.login;
        userlink = user.html_url;
      }
      let visible = true;

      return {
        html_url,
        labels,
        title,
        username,
        userlink,
        number,
        created_at,
        updated_at,
        comments,
        visible,
      };
    });
    this.setState({ issues });
  }

  handleSearch = (event) => {
    this.setState({ search: event.target.value });
  };

  handleAuthorSearchBar = (event) => {
    this.setState({
      authorSearch: event.target.value,
    });
  };

  handleAuthorSearch = () => {
    let url = `https://api.github.com/repos/github/hub/issues?&state=open&creator=${this.state.authorSearch}`;
    fetch(url, { header: "token 7cd8241e123dc5ff10bfa8999fabe4bcd0ff9b15" })
      .then((res) => res.json())
      .then((json) => {
        this.processData(json);
        this.setState({ isLoaded: true, items: json });
      });
    this.setState({ author: this.state.authorSearch });
  };

  handlePage = (page) => {
    let { label, author } = this.state;
    let url = null;

    this.setState({ page });

    if (label !== "All" && author !== "") {
      url = `https://api.github.com/repos/github/hub/issues?&state=open&labels=${label}&creator=${this.state.author}`;
    } else if (label !== "All" && author === "") {
      url = `https://api.github.com/repos/github/hub/issues?&state=open&labels=${label}`;
    } else if (label === "All" && author !== "") {
      url = `https://api.github.com/repos/github/hub/issues?&state=open&creator=${this.state.author}`;
    } else {
      url = `https://api.github.com/repos/github/hub/issues?&state=open`;
    }
    url += `&page=${page}`;

    fetch(url, { header: "token 7cd8241e123dc5ff10bfa8999fabe4bcd0ff9b15" })
      .then((res) => res.json())
      .then((json) => {
        this.processData(json);
        this.setState({ isLoaded: true, items: json });
      });
    window.scrollTo(0, 0);
  };

  handleLabel = (label) => {
    let url = null;
    let newLabel = null;
    let { author } = this.state;
    // if the selected label is all, treat it essentially as null.
    if (label !== "All") {
      newLabel = label;
    }

    if (label === "All" && author !== "") {
      url = `https://api.github.com/repos/github/hub/issues?&state=open&creator=${author}`;
    } else if (label === "All" && author === "") {
      url = `https://api.github.com/repos/github/hub/issues?&state=open`;
    } else if (label !== "All" && author !== "") {
      url = `https://api.github.com/repos/github/hub/issues?&state=open&labels=${label}&creator=${author}`;
    } else {
      url = `https://api.github.com/repos/github/hub/issues?&state=open&labels=${label}`;
    }

    fetch(url, { header: "token 7cd8241e123dc5ff10bfa8999fabe4bcd0ff9b15" })
      .then((res) => res.json())
      .then((json) => {
        this.processData(json);
        this.setState({ isLoaded: true, items: json });
      });
    window.scrollTo(0, 0);
    this.setState({ label: newLabel });
  };

  handleAuthor = (author) => {
    let url = null;
    if (this.state.label === null) {
      url = `https://api.github.com/repos/github/hub/issues?&state=open&creator=${author}`;
    } else {
      url = `https://api.github.com/repos/github/hub/issues?&state=open&labels=${this.state.label}&creator=${author}`;
    }
    fetch(url, { header: "token 7cd8241e123dc5ff10bfa8999fabe4bcd0ff9b15" })
      .then((res) => res.json())
      .then((json) => {
        this.processData(json);
        this.setState({ isLoaded: true, items: json });
      });
    window.scrollTo(0, 0);
    this.setState({ author });
  };

  handleClearFilters = () => {
    let url = `https://api.github.com/repos/github/hub/issues?&state=open`;
    fetch(url, { header: "token 7cd8241e123dc5ff10bfa8999fabe4bcd0ff9b15" })
      .then((res) => res.json())
      .then((json) => {
        this.processData(json);
        this.setState({ isLoaded: true, items: json });
      });
    window.scrollTo(0, 0);
    this.setState({ label: "All", author: "", order: "Newest" });
  };

  // take in a date string and return the time ago a.k.a. difference btwn that date and today's date.
  calculateDate(dateString) {
    const date = new Date(dateString);
    let today = new Date();
    let currentDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const millisec = Math.abs(date - currentDate);
    const seconds = Math.ceil(millisec / 1000);
    const minutes = Math.ceil(seconds / 60);
    const hours = Math.ceil(minutes / 60);
    const days = Math.ceil(hours / 24);
    const weeks = Math.ceil(days / 7);
    const months = Math.ceil(weeks / 4);
    const years = Math.ceil(weeks / 52);

    let time = 0;
    let units = "";

    if (seconds < 60) {
      time = seconds;
      units = " seconds";
    } else if (minutes < 60) {
      time = minutes;
      units = " minutes";
    } else if (hours < 24) {
      time = hours;
      units = " hours";
    } else if (days < 7) {
      time = days;
      units = " days";
    } else if (weeks < 4) {
      time = weeks;
      units = " weeks";
    } else if (months < 12) {
      time = months;
      units = " months";
    } else {
      time = years;
      units = " years";
    }
    let displayTime = time + units;
    if (time === 1) {
      displayTime = displayTime.slice(0, displayTime.length - 1);
    }
    // created_at will be an array consisting of the raw time and the display time.
    return [millisec, displayTime];
  }

  handleSort = (order) => {
    let issues = [...this.state.issues];
    if (order === "Newest") {
      issues.sort((a, b) => a.created_at[0] - b.created_at[0]);
    } else if (order === "Oldest") {
      issues.sort((a, b) => b.created_at[0] - a.created_at[0]);
    } else if (order === "Most Commented") {
      issues.sort((a, b) => b.comments - a.comments);
    } else if (order === "Least Commented") {
      issues.sort((a, b) => a.comments - b.comments);
    } else if (order === "Recently Updated") {
      issues.sort((a, b) => a.updated_at[0] - b.updated_at[0]);
    } else if (order === "Least Recently Updated") {
      issues.sort((a, b) => b.updated_at[0] - a.updated_at[0]);
    }
    this.setState({ order, issues });
  };

  getUniqueValues = (a) => {
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) a.splice(j--, 1);
      }
    }
    return a;
  };

  render() {
    console.log(this.state.issues);
    let filteredIssues = this.state.issues.filter(
      (issue) =>
        issue.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
    );

    return (
      <div className="App" style={{ marginLeft: 100, marginRight: 100 }}>
        <NavBar
          order={this.state.order}
          onSort={this.handleSort}
          search={this.state.search}
          onSearch={this.handleSearch}
          author={this.state.author}
          onAuthorSearchBar={this.handleAuthorSearchBar}
          onAuthorSearch={this.handleAuthorSearch}
          label={this.state.label}
          onLabel={this.handleLabel}
          onClearFilters={this.handleClearFilters}
        />
        <Issues />
        <Pagination>
          <Pagination.First onClick={() => this.handlePage(1)} />
          <Pagination.Prev
            onClick={() => this.handlePage(this.state.page - 1)}
          />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <Pagination.Item
              key={number}
              active={number === this.state.page}
              onClick={() => this.handlePage(number)}
            >
              {number}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => this.handlePage(this.state.page + 1)}
          />
          <Pagination.Last onClick={() => this.handlePage(9)} />
        </Pagination>
      </div>
    );
  }
}

export default App;
