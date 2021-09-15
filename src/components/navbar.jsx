import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class NavBar extends Component {
  state = {
    authorQuery: "",
  };
  style = { listStyleType: "none", color: "#586069" };

  formatFilterList() {
    let filterList = null;

    if (
      this.props.author === "" &&
      this.props.label === "All" &&
      this.props.order !== "Newest"
    ) {
      filterList = (
        <ul style={this.style}>
          <li>{this.props.order}</li>
        </ul>
      );
    } else if (
      this.props.author === "" &&
      this.props.label !== "All" &&
      this.props.order === "Newest"
    ) {
      filterList = (
        <ul style={this.style}>
          <li>{this.props.label}</li>
        </ul>
      );
    } else if (
      this.props.author === "" &&
      this.props.label !== "All" &&
      this.props.order !== "Newest"
    ) {
      filterList = (
        <ul style={this.style}>
          <li>{this.props.label}</li>
          <li>{this.props.order}</li>
        </ul>
      );
    } else if (
      this.props.author !== "" &&
      this.props.label === "All" &&
      this.props.order === "Newest"
    ) {
      filterList = (
        <ul style={this.style}>
          <li>{this.props.author}</li>
        </ul>
      );
    } else if (
      this.props.author !== "" &&
      this.props.label === "All" &&
      this.props.order !== "Newest"
    ) {
      filterList = (
        <ul style={this.style}>
          <li>{this.props.author}</li>
          <li>{this.props.order}</li>
        </ul>
      );
    } else if (
      this.props.author !== "" &&
      this.props.label !== "All" &&
      this.props.order === "Newest"
    ) {
      filterList = (
        <ul style={this.style}>
          <li>{this.props.author}</li>
          <li>{this.props.label}</li>
        </ul>
      );
    } else if (
      this.props.author !== "" &&
      this.props.label !== "All" &&
      this.props.order !== "Newest"
    ) {
      filterList = (
        <ul style={this.style}>
          <li>{this.props.author}</li>
          <li>{this.props.label}</li>
          <li>{this.props.order}</li>
        </ul>
      );
    }
    return filterList;
  }

  handleSearch = (event) => {
    if (event.target.value.length === 0) {
      this.props.resetSearch(this.props.label, this.props.author);
    }
    this.props.search(event.target.value);
  };

  updateAuthorQuery = (event) => {
    this.setState({ authorQuery: event.target.value });
  };

  render() {
    let filterList = this.formatFilterList();
    return (
      <Navbar style={{ backgroundColor: "#F6F8FA" }}>
        <Navbar.Brand>Open Issues</Navbar.Brand>
        <Form>
          <Form.Control
            type="search"
            placeholder="search for an issue..."
            value={this.props.searchQuery}
            onChange={this.handleSearch}
            style={{ width: 350 }}
          />
        </Form>
        <NavDropdown title="Author" style={{ color: "#586069" }}>
          <input
            type="search"
            placeholder="search for a user..."
            onChange={this.updateAuthorQuery}
          />
          <Button
            onClick={() =>
              this.props.applyFilter(this.props.label, this.state.authorQuery)
            }
          >
            Search
          </Button>
        </NavDropdown>
        <NavDropdown title="Label" style={this.style}>
          {[
            "All",
            "bug",
            "config",
            "docs",
            "feature",
            "more-info-needed",
            "pull-request",
            "wontfix",
            "¯_(ツ)_/¯",
          ].map((label) => (
            <NavDropdown.Item
              key={label}
              onClick={() => this.props.applyFilter(label, this.props.author)}
            >
              {label}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
        <NavDropdown title="Sort" style={this.style}>
          {[
            "Newest",
            "Oldest",
            "Most Commented",
            "Least Commented",
            "Recently Updated",
            "Least Recently Updated",
          ].map((order) => (
            <NavDropdown.Item
              key={order}
              onClick={() => this.props.sort(order)}
            >
              {order}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
        {filterList}
        <Button onClick={this.props.clearFilters}>Clear Filters</Button>
      </Navbar>
    );
  }
}

export default NavBar;
