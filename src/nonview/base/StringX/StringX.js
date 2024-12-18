import { THEME_DATA } from '../../../view/_constants/THEME';
import StringXEn from './StringXEn';
import StringXSi from './StringXSi';
import StringXTa from './StringXTa';

export default class StringX {
  static getShortLabel(name) {
    name = name.replace('-', ' ');
    if (StringXEn.isEn(name)) {
      return StringXEn.getShortLabelEn(name);
    }
    if (StringXSi.isSi(name)) {
      return StringXSi.getShortLabelSi(name);
    }
    if (StringXTa.isTa(name)) {
      return StringXTa.getShortLabelTa(name);
    }
    return name;
  }

  static getFontSize(shortLabel) {
    const baseFontSize = THEME_DATA.typography.fontSize / 8.5;
    return baseFontSize / Math.max(shortLabel.length, 3);
  }

  static toTitleCase(s) {
    return s.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
