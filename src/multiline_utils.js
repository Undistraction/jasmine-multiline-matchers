import { matcherHint, printReceived, printExpected } from 'jest-matcher-utils'
import diff from 'jest-diff'

// eslint-disable-next-line import/prefer-default-export
export const multilineMessage = (pass, received, expected, name, field) => pass
    ? () =>
        `${matcherHint(`.not.${name}`)}\n\n` +
        `Expected ${field} to not equal:\n` +
        `  ${printExpected(expected)}\n` +
        `Received:\n` +
        `  ${printReceived(received)}`
    : () => {
        const diffString = diff(expected, received)
        return (
          `${matcherHint(`.${name}`)}\n\n` +
          `Expected ${field} to equal:\n` +
          `  ${printExpected(expected)}\n` +
          `Received:\n` +
          `  ${printReceived(received)}${
            diffString ? `\n\nDifference:\n\n${diffString}` : ``
          }`
        )
      }
