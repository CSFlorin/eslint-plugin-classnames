// @ts-check

/**
 * @fileoverview Rule to suggest using className() or clsx() in JSX className
 * @author fsubal
 */
"use strict";

const RuleTester = require("eslint").RuleTester;
const rule = require("../../../lib/rules/prefer-classnames-function");

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run("prefer-classnames-function", rule, {
  valid: [
    {
      code: '<button className="bg-blue-300">Hello</button>;',
      options: [
        {
          maxSpaceSeparetedClasses: 1,
        },
      ],
    },
    {
      code: '<button className={classNames("bg-blue-300", "block")}>Hello</button>;',
      options: [
        {
          maxSpaceSeparetedClasses: 1,
          functionName: "className",
        },
      ],
    },
    {
      code: `
<button
  className={classNames("bg-blue-300", "block", isRelative && "relative")}
>
  Hello
</button>;
      `,
      options: [
        {
          maxSpaceSeparetedClasses: 1,
          functionName: "className",
        },
      ],
    },
    {
      code: '<button className="bg-blue-300 block">Hello</button>;',
      options: [
        {
          maxSpaceSeparetedClasses: 2,
        },
      ],
    },
  ],
  invalid: [
    {
      code: '<button className="bg-blue-300 block">Hello</button>;',
      options: [
        {
          maxSpaceSeparetedClasses: 1,
          functionName: "className",
        },
      ],
      errors: [
        {
          message:
            "The className has more than 1 classes. Use className() instead.",
          suggestions: [
            {
              desc: "Call className() instead",
              output:
                '<button className={className("bg-blue-300", "block")}>Hello</button>;',
            },
          ],
        },
      ],
    },
  ],
});
