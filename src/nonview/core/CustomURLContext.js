import URLContext from "../base/URLContext";

export default class CustomURLContext {
  static DEFAULT_STATE = {
    electionType: "Presidential",
    date: "2019-11-16",
    // date: "2024-09-21",
    lang: "en",
    noScroll: false,
  };

  static get() {
    let context = URLContext.get();
    if (context.nResultsDisplay) {
      context.nResultsDisplay = parseInt(context.nResultsDisplay);
    }
    if (context.noScroll && context.noScroll.toLowerCase() === "true") {
      context.noScroll = true;
    } else {
      context.noScroll = false;
    }
    return Object.assign({}, CustomURLContext.DEFAULT_STATE, context);
  }

  static set(data) {
    URLContext.set(data);
  }
}
