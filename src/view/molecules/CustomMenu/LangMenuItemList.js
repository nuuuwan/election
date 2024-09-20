import { MenuItem } from "@mui/material";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { useBasePageHandlerContext } from "../../pages/BasePage/BasePageHandlerProvider";

import { CheckIcon } from "../../atoms";

const LANG_TO_LABEL = {
  si: "සිංහල",
  ta: "தமிழ்",
  en: "English",
};

export default function LangMenuItemList({ handleClose }) {
  const data = useDataContext();
  const { setLang } = useBasePageHandlerContext();
  if (!data) {
    return null;
  }
  const { lang: selectedLang } = data;

  return (
    <>
      {["si", "ta", "en"].map(function (lang) {
        const isSelected = lang === selectedLang;
        const onClick = function () {
          handleClose();
          setLang(lang);
        };
        return (
          <MenuItem key={lang} onClick={onClick} disabled={isSelected}>
            <CheckIcon isSelected={isSelected} />
            {LANG_TO_LABEL[lang]}
          </MenuItem>
        );
      })}
    </>
  );
}
