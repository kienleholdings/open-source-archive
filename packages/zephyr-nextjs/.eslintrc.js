module.exports = {
  extends: ['@kienleholdings/react'],
  rules: {
    // We're disabling this just for this project as we have to export both named and default
    // exports for documentation to be auto-generated
    'import/no-named-as-default': 'off',
    // For stories, there's a very good chance we'll only export a single thing. Having to disable
    // that rule over and over gets tiring
    'import/prefer-default-export': 'off',
    // This is a component library. Because of this, there'll be a lot of areas that we need to
    // spread props, especially in stories. This rule is disabled for this project
    'react/jsx-props-no-spreading': 'off',
  },
};
