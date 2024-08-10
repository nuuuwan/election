import { Component } from "react";
import { Ent } from "../../nonview/base";
import { Typography } from "@mui/material";

export default class EntView extends Component {
  constructor(props) {
    super(props);
    this.state = { ent: null };
  }
  async componentDidMount() {
    const { entID } = this.props;
    const ent = await Ent.fromID(entID);
    this.setState({ ent });
  }

  get label() {
    const { entID } = this.props;
    const { ent } = this.state;

    if (!ent) {
      return entID;
    }
    return ent.name;
  }

  render() {
    const { sx } = this.props;
    return (
      <Typography variant="h3" sx={sx}>
        {this.label}
      </Typography>
    );
  }
}
