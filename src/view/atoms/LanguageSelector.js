import { Button, Stack } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { useBasePageHandlerContext } from "../../view/pages/BasePage/BasePageHandlerProvider";

const STYLE_LANGUAGE_SELECTOR = {
  BOX: {},
  BUTTON: {
    p: 0,
    m: 0,
    minWidth: 0,
    width: 32,
  },
};

const LANG_TO_LABEL = {
  si: "සිං",
  ta: "த",
  en: "En",
};

const LANG_TO_COLOR = {
  si: "#800",
  ta: "#f80",
  en: "#080",
};

export default function LanguageSelector() {
  const { setLang } = useBasePageHandlerContext();
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { lang: selectedLang } = data;

  return (
    <Stack direction="row" gap={0} sx={STYLE_LANGUAGE_SELECTOR.BOX}>
      {["si", "ta", "en"].map(function (lang) {
        const isSelected = lang === selectedLang;
        const color = LANG_TO_COLOR[lang];
        return (
          <Button
            key={lang}
            onClick={function () {
              setLang(lang);
            }}
            sx={Object.assign({ color }, STYLE_LANGUAGE_SELECTOR.BUTTON)}
            disabled={isSelected}
          >
            {LANG_TO_LABEL[lang]}
          </Button>
        );
      })}
    </Stack>
  );
}
