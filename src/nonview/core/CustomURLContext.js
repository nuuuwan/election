import { URLContext } from "../base";

export default class CustomURLContext {
    
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
    return context;
  }

  static set(data) {
    URLContext.set(data);
  }

}