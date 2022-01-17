module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  plugins: [
    /* "jsx-a11y" */
  ],
  ///parser: "babel-eslint",
  parserOptions: {
    "sourceType": "module"
  },
  rules: {

    /*
     |========================================================================================
     | ESLINT:RECOMMENDED
     | https://eslint.vuejs.org/rules
     |========================================================================================
    */

    // ------------------------------------------
    // *** Possible Errors
    // ------------------------------------------
    'for-direction': 'error',                                       /* Enforce "for" loop update clause moving the counter in the right direction */
    'getter-return': 'error',                                       /* Enforces that a return statement is present in property getters */
    'no-async-promise-executor': 'off',                             /* Disallow using an async function as a Promise executor */
    'no-compare-neg-zero': 'error',                                 /* Disallow comparing against -0 */
    'no-cond-assign': 'error',                                      /* Assignment operators in conditional expressions */
    'no-constant-condition': 'error',                               /* Disallow constant expressions in conditions */
    'no-control-regex': 'error',                                    /* Disallow control characters in regular expressions */
    'no-debugger': 'error',                                         /* Disallow the use of debugger */
    'no-dupe-args': 'error',                                        /* Disallow duplicate arguments in `function` definitions */
    'no-dupe-else-if': 'error',                                     /* Disallow duplicate conditions in if-else-if chains */
    'no-dupe-keys': 'error',                                        /* Disallow duplicate keys in object literals */
    'no-duplicate-case': 'error',                                   /* Disallow duplicate case labels */
    'no-empty': 'error',                                            /* Disallow empty block statements */
    'no-empty-character-class': 'error',                            /* Disallow empty character classes in regular expressions */
    'no-ex-assign': 'error',                                        /* Disallow reassigning exceptions in `catch` clauses */
    'no-extra-boolean-cast': 'off',                                 /* Disallow unnecessary boolean casts */
    'no-extra-parens': 'off',                                       /* Disallow unnecessary parentheses */
    'no-extra-semi': 'error',                                       /* Disallow unnecessary semicolons */
    'no-func-assign': 'error',                                      /* Disallow reassigning `function` declarations */
    'no-import-assign': 'error',                                    /* Disallow assigning to imported bindings */
    'no-inner-declarations': 'error',                               /* Disallow variable or `function` declarations in nested blocks */
    'no-invalid-regexp': 'error',                                   /* Disallow invalid regular expression strings in `RegExp` constructors */
    'no-irregular-whitespace': 'error',                             /* Disallow irregular whitespace */
    'no-loss-of-precision': 'error',                                /* Disallow number literals that lose precision */
    'no-misleading-character-class': 'error',                       /* Disallow characters which are made with multiple code points in character class syntax */
    'no-obj-calls': 'error',                                        /* Disallow calling global object properties as functions */
    'no-promise-executor-return': 'off',                            /* Disallow returning values from Promise executor functions */
    'no-prototype-builtins': 'off',                                 /* Disallow calling some `Object.prototype` methods directly on objects */
    'no-regex-spaces': 'error',                                     /* Disallow multiple spaces in regular expressions */
    'no-setter-return': 'error',                                    /* Disallow returning values from setters */
    'no-sparse-arrays': 'error',                                    /* Disallow sparse arrays */
    'no-template-curly-in-string': 'error',                         /* Disallow template literal placeholder syntax in regular strings */
    'no-unexpected-multiline': 'error',                             /* Disallow confusing multiline expressions */
    'no-unreachable': 'error',                                      /* Disallow unreachable code after `return`, `throw`, `continue`, and `break` statements */
    'no-unreachable-loop': 'error',                                 /* Disallow loops with a body that allows only one iteration */
    'no-unsafe-finally': 'error',                                   /* Disallow control flow statements in `finally` blocks */
    'no-unsafe-negation': 'error',                                  /* Disallow negating the left operand of relational operators */
    'no-unsafe-optional-chaining': 'error',                         /* Disallow use of optional chaining in contexts where the `undefined` value is not allowed */
    'use-isnan': 'error',                                           /* Require calls to `isNaN()` when checking for `NaN` */
    'valid-typeof': 'error',                                        /* Enforce comparing `typeof` expressions against valid strings */

  },
  ignorePatterns: [
    '**/*.test.js',
    '**/*.json',
    '**/*.md',
    '**/LICENSE',
    '**/*.txt',
    '**/coverage/**',
    '**/node_modules/**',
  ],
};


