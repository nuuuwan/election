const COLOR_TO_POLITICAL_PARTIES = {
  "#008": ["SLFP", "PA", "UPFA"],
  "#080": ["UNP", "NDF"],
  "#8c0": ["SJB"],
  "#800": ["SLPP"],
  "#f80": ["ACTC"],
  "#f90": ["JHU", "SU", "OPPP"],
  "#f0f": ["NPP"],
  "#f00": [
    "JVP",
    "LSSP",
    "EPDP",
    "NMPP",
    "JJB",
    "TMVP",
    "TULF",
    "DPLF",
    "MEP",
    "DNA",
    "USA",
  ],
  "#fc0": ["ITAK", "AITC", "AITM"],
  "#060": ["MNA", "SLMC", "NUA", "ACMC", "NC"],
  "#808": ["SLMP"],
  "#666": ["Other"],
  "#042": ["DUNF"],
  "#888": ["INDI", "IND1", "IND2"],
};

const POLITICAL_PARTY_TO_COLOR = Object.entries(
  COLOR_TO_POLITICAL_PARTIES
).reduce(function (COLOR_TO_POLITICAL_PARTIES, [color, polical_parties]) {
  for (let political_party of polical_parties) {
    COLOR_TO_POLITICAL_PARTIES[political_party] = color;
  }
  return COLOR_TO_POLITICAL_PARTIES;
}, {});

export default POLITICAL_PARTY_TO_COLOR;

const LIGHT_COLORS = [
  "lightgreen",
  "lightgray",
  "pink",
  "orange",
  "yellow",
  "lightgray",
  "#eee",
  "white",
];

export { LIGHT_COLORS };
