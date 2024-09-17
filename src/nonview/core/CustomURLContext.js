import URLContext from "../base/URLContext";

export default class CustomURLContext {
  static DEFAULT_STATE = {
    electionType: "Presidential",
    date: "2019-11-16",
    // date: "2024-09-21",
    lang: "en",
  };

  static get() {
    let context = URLContext.get();
    if (context.nResultsDisplay) {
      context.nResultsDisplay = parseInt(context.nResultsDisplay);
    }

    return Object.assign({}, CustomURLContext.DEFAULT_STATE, context);
  }

  static set(data) {
    URLContext.set(data);
    const year = data.date.split("-")[0];
    window.document.title = `#PresPollSL${year} (${data.nResultsDisplay})`;
  }
}
