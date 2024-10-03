const COLOR_TO_POLITICAL_PARTIES = {
  "#008": ["SLFP", "PA", "UPFA", "SLPP-R"],
  "#080": ["UNP", "NDF", "SJB"],

  "#804": ["SLPP"],
  "#f80": ["ACTC", "Ind-R"],
  "#f90": ["JHU", "SU", "OPPP"],

  "#f00": [
    "JVP",
    "LSSP",
    "EPDP",
    "NMPP",
    "JJB",
    "TMVP",
    "DPLF",
    "MEP",
    "DNA",
    "USA",
    "NPP",
  ],
  "#f60": ["TULF"],
  "#fc0": ["ITAK"],
  "#fa0": ["AITC", "AITM"],
  "#c00": ["TMTK"],
  "#060": ["MNA", "SLMC", "NUA", "ACMC", "NC"],
  "#808": ["SLMP"],
  "#666": ["Other"],
  "#042": ["DUNF"],
  "#eee": ["INDI", "IND1", "IND2"],

  // 2024
  "#f82": ["IND16"],
  "#04c": ["IND9"],
  "#06c": ["CPSL"],
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
