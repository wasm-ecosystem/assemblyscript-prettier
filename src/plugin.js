import pluginTypescript from "prettier/plugins/typescript";
import pluginEstree from "prettier/plugins/estree";
import { magic, preProcess } from "./replace.js";
import { builders } from "prettier/doc";

// Get the estree printer from the estree plugin
const baseEstreePrinter = pluginEstree.printers.estree;

// Initialize the AssemblyScript estree printer at module load time
const as_estree = {
  ...baseEstreePrinter,
  printComment(commentPath, options) {
    let comment = commentPath.getValue().value;
    if (comment.startsWith(magic) && comment.endsWith(magic)) {
      let doc = [];
      if (commentPath.stack[commentPath.stack.length - 2] == 0) {
        doc.push(builders.hardline);
      }
      doc.push(comment.slice(magic.length, -magic.length));
      return doc;
    } else {
      return baseEstreePrinter.printComment(commentPath, options);
    }
  },
};

function parse(text, options) {
  let ast = pluginTypescript.parsers.typescript.parse(text, options);
  return ast;
}

export default {
  parsers: {
    typescript: {
      ...pluginTypescript.parsers.typescript,
      parse,
      astFormat: "as-estree",
      preprocess: preProcess,
    },
  },
  printers: { "as-estree": as_estree },
};
