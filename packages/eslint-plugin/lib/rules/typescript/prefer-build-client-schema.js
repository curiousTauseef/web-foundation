const {docsUrl} = require('../../utilities');

module.exports = {
  meta: {
    docs: {
      description: 'Recommend buildClientSchema for schema building',
      category: 'Best Practices',
      recommended: true,
      uri: docsUrl('typescript/prefer-build-client-schema'),
    },
    fixable: null,
  },
  create(context) {
    function report(node) {
      context.report({
        node,
        message: `Prefer buildClientSchema to buildSchema`,
      });
    }

    return {
      SchemaBuilder(node) {
        console.log(node);
        // Check to see if the node value is buildSchema or buildClientSchema
        report(node);
      },
    };
  },
};
