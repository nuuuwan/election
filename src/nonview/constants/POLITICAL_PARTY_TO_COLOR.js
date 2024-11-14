const COLOR_TO_POLITICAL_PARTIES = {
  '#008': ['SLFP', 'PA', 'UPFA', 'SLPP-R'],
  '#080': ['UNP', 'SJB'],
  '#8c0': ['NDF'],
  '#804': ['SLPP'],
  '#f80': ['ACTC', 'Ind-R'],
  '#f99': ['JHU', 'SU', 'OPPP'],

  '#f00': [
    'JVP',
    'LSSP',

    'NMPP',
    'JJB',
    'TMVP',
    'DPLF',
    'MEP',
    'DNA',
    'USA',
    'NPP',
  ],
  '#f60': ['TULF'],
  '#f10': ['EROS', 'INDI'],
  '#fc0': ['ITAK'],
  '#f30': ['EPDP', 'IND2'],
  '#fa0': ['AITC', 'AITM'],
  '#c06': ['TMTK'],

  '#08c': ['MNA'],
  '#088': ['SLMC'],
  '#0c8': ['NUA'],
  '#0cc': ['NC'],

  '#096': ['ACMC'],
  '#808': ['SLMP'],
  '#666': ['Other'],
  '#042': ['DUNF'],

  '#f20': ['CWC', 'UPF'],
  '#f21': ['UCPF', 'IND1'],

  // 2024
  '#f82': ['IND16'],
  '#04c': ['IND9'],
  '#06c': ['CPSL'],
};

const POLITICAL_PARTY_TO_COLOR = Object.entries(
  COLOR_TO_POLITICAL_PARTIES,
).reduce(function (COLOR_TO_POLITICAL_PARTIES, [color, polical_parties]) {
  for (const political_party of polical_parties) {
    COLOR_TO_POLITICAL_PARTIES[political_party] = color;
  }
  return COLOR_TO_POLITICAL_PARTIES;
}, {});

export default POLITICAL_PARTY_TO_COLOR;
