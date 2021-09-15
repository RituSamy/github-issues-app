import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class Issue extends Component {
  style = { color: "#586069", fontSize: 15 };
  render() {
    return (
      <Card align="left">
        <Card.Title>
          <Card.Link href={this.props.url} style={{ color: "black" }}>
            {this.props.title}
          </Card.Link>
          {this.props.labels.map((label) => (
            <span
              key={label.name}
              className="badge m-2"
              style={{
                backgroundColor: `#${label.color}`,
                color:
                  label.color === "d73a4a" || label.color === "B4045F"
                    ? "white"
                    : "black",
              }}
            >
              {label.name}
            </span>
          ))}
        </Card.Title>
        <footer style={this.style}>
          #{this.props.number} opened {this.props.created_at[1]} ago by{" "}
          <Card.Link href={this.props.userlink} style={this.style}>
            {this.props.username}
          </Card.Link>
        </footer>
      </Card>
    );
  }
}

export default Issue;
