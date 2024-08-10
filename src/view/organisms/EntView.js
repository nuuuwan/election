import { Component } from "react";
import { Ent } from "../../nonview/base";
import { Stack, Typography } from "@mui/material";

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

  get title() {
    const { ent } = this.state;

    if (!ent) {
      return "";
    }
    return ent.name;
  }

  get subTitle() {
    return this.props.entID.replace("EC-", "");
  }

  render() {
    const { sx } = this.props;
    return (
      <Stack
        direction="column"
        gap={0}
        sx={{ margin: "auto", alignItems: "center" }}
      >
        {" "}
        <Typography variant="h5" sx={Object.assign({ opacity: 0.25 }, sx)}>
          {this.subTitle}
        </Typography>
        <Typography variant="h4" sx={sx}>
          {this.title}
        </Typography>
      </Stack>
    );
  }
}
