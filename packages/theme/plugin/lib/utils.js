const itMatchesOne = (arr, term) => arr.some(i => term.search(i) >= 0);

const parseAttrSelector = content => {
  const regex =
    /(^class|^id)([*^?~|$=]*)+(?:("\s*)([^"\\]*?(?:\\.[^"\\]*)*?)(\s*")|('\s*)([^'\\]*?(?:\\.[^'\\]*)*?)(\s*'))/i;

  const [type, operator, head, classes, foot] = content.split(regex).filter(part => part);

  return {
    type,
    operator,
    head,
    classes: classes ? classes.split(" ").map(c => c.replace(/"|'/g, "")) : [],
    foot
  };
};

const attrStringify = ({ type, operator = "", head = "", classes = [], foot = "" }) =>
  `${type}${operator}${head}${classes.join(" ")}${foot}`;

module.exports = { attrStringify, itMatchesOne, parseAttrSelector };
