# jasmine-multiline-matchers

Use multiline template strings as values for your expectations without worrying about indentation.

## Install

```
yarn add jasmine-multiline-matchers
```

or

```
npm install jasmine-multiline-matchers
```

## Usage

See explaination of the problems with multiline template strings and how they are handled in the [README](https://github.com/Undistraction/dedent-preserving-indents) for `dedent-preserving-indents` which is the library used under the hood of these matchers.

### toEqualMultiline

A version of `toEqual` that supports multiline template strings.

```javascript
it(`returns a multiline string`, () => {
  const expected = `
           Here is a multiline string
             - It can be indented
               However you like.
        And it doesn't just check the first line`
  expect(f()).toEqualMultiline(expected)
})
```

The expected string will have its whitespace trimmed to the line with the least whitespace, so the above would become:

```text
  Here is a multiline string
      - It can be indented
        However you like.
And it doesn't just check the first line
```

### toThrowMultiline

A version of `toThrow` that supports multiline template strings. Note that unlike `toThrow` it assumes you will supply an expected value you want to compare to the Error's message.

```javascript
it(`returns a multiline string`, () => {
  const expected = `
          Here is a an error message
            - It is formatted
              However you like`
  expect(() => f()).toThrowMultiline(expected)
})
```

## Using the matchers with Jest

Add the following line to your `jest.config.js`:

```javascript
{
  ...
  setupTestFrameworkScriptFile: `<rootDir>/src/__tests__/testHelpers/customMatchers.js`,
}
```

Then in `customMatchers.js`:

```javascript
import toEqualSuccessWithValue from '../../matchers/validation/toEqualSuccessWithValue'
import toEqualFailureWithValue from '../../matchers/validation/toEqualFailureWithValue'

expect.extend({
  toEqualSuccessWithValue,
  toEqualFailureWithValue,
})
```
