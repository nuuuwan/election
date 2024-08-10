let FormatString = {
  titleCase(x) {
    if (!x) {
      return null;
    }
    return x
      .split("-")
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join(" ");
  },
};

export default FormatString;
