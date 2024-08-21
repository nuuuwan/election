import { Button, Stack } from "@mui/material";

const STYLE_LANGUAGE_SELECTOR = {
  BOX: {},
  BUTTON: {
    p: 0,
    m: 0,
    minWidth: 0,
    width: 32,
    color: "white",
  },
};

const LANG_TO_LABEL = {
  en: "En",
  si: "සිං",
  ta: "த",
};

export default function LanguageSelector({ selectedLang, setLang }) {
    
  return (
    <Stack direction="row" gap={0} sx={STYLE_LANGUAGE_SELECTOR.BOX}>
      {["en", "si", "ta"].map(function (lang) {
      const isSelected = lang === selectedLang;
        return (
          <Button
            key={lang}
            onClick={function () {
              setLang(lang);
            }}
            sx={Object.assign({}, STYLE_LANGUAGE_SELECTOR.BUTTON)}
            disabled={isSelected}
          >
            {LANG_TO_LABEL[lang]}
          </Button>
        );
      })}
    </Stack>
  );
}
