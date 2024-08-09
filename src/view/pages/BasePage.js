import { Component } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

export default class BasePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.setState({});
  }

  renderHeader() {
    return (
      <Typography variant="h4">
        2024 Sri Lankan Presidential Election
      </Typography>
    );
  }

  renderLeft() {
    return <Typography variant="h6">Left</Typography>;
  }

  renderCenter() {
    return <Typography variant="h6">Center</Typography>;
  }

  renderRight() {
    return <Typography variant="h6">Right</Typography>;
  }

  renderFooter() {
    return (
      <Typography variant="caption">
        visualization & analysis by @nuuuwan
      </Typography>
    );
  }

  render() {
    return (
      <Box sx={{ textAlign: "center" }}>
        {this.renderHeader()}
        <Stack direction="row">
          <Box sx={{ width: "33%" }}> {this.renderLeft()}</Box>
          <Box sx={{ width: "34%" }}> {this.renderCenter()}</Box>
          <Box sx={{ width: "33%" }}> {this.renderRight()}</Box>
        </Stack>
        {this.renderFooter()}
      </Box>
    );
  }
}
