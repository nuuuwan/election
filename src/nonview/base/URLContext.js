export default class URLContext {
  // URL

  static getURL() {
    return window.location.href;
  }

  static setURL(url) {
    window.history.pushState("", "", url);
  }

  // convertors (context <-> URL)

  static contextToURL(context) {
    const parameterStr = Object.entries(context)
      .map(function (token) {
        return token.join("=");
      })
      .join("&");
      
    // eslint-disable-next-line no-undef
    const urlBase = window.location.origin + process.env.PUBLIC_URL; 
    return urlBase + "?" + parameterStr;
  }

  static urlToContext(url) {
    const urlTokens = url.split("?");
    const parameterStr = urlTokens.length > 1 ? urlTokens[1] : "";

    return Object.fromEntries(
      parameterStr.split("&").map(function (token) {
        return token.split("=");
      })
    );
  }

  // context (default)

  static set(context) {
    const url = URLContext.contextToURL(context);
    URLContext.setURL(url);
  }

  static get() {
    return URLContext.urlToContext(URLContext.getURL());
  }
}
