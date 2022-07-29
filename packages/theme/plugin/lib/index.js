const Tokenizer = require("css-selector-tokenizer");
const { parseAttrSelector, attrStringify, itMatchesOne } = require("./utils");

function prefixNode(node, prefix) {
  if (["class", "id"].includes(node.type)) {
    return {
      ...node,
      name: `${prefix}${node.name}`
    };
  }

  if (["attribute"].includes(node.type) && node.content) {
    const { type, operator, head, classes, foot } = parseAttrSelector(node.content);

    if (!["class", "id"].includes(type)) return node;

    return {
      ...node,
      content: attrStringify({
        type,
        operator,
        head,
        classes: classes.map(cls => `${prefix}${cls}`),
        foot
      })
    };
  }

  return node;
}

function iterateSelectorNodes(selector, { prefix, ignore }) {
  return {
    ...selector,
    nodes: selector.nodes.map(node => {
      if (["selector", "nested-pseudo-class"].includes(node.type)) {
        return iterateSelectorNodes(node, { prefix, ignore });
      }

      if (itMatchesOne(ignore, Tokenizer.stringify(node))) {
        return node;
      }

      return prefixNode(node, prefix);
    })
  };
}

module.exports = ({ prefix, ignore }) => {
  if (typeof prefix !== "string") {
    throw new Error("@postcss-prefix: prefix option should be of type string.");
  }

  if (!Array.isArray(ignore)) {
    throw new Error("@postcss-prefix: ignore options should be an Array.");
  }

  if (prefix.length <= 0) return { postcssPlugin: "postcss-prefixer" };

  return {
    postcssPlugin: "postcss-prefixer",
    Root(root) {
      root.walkRules(rule => {
        const parsed = Tokenizer.parse(rule.selector);
        const selector = iterateSelectorNodes(parsed, { prefix, ignore });

        rule.selector = Tokenizer.stringify(selector);
      });
    }
  };
};
