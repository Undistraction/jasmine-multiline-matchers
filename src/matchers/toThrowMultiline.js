import dedent from 'dedent-preserving-indents'
import { formatStackTrace, separateMessageFromStack } from 'jest-message-util'
import { RECEIVED_COLOR, matcherHint } from 'jest-matcher-utils'
import getType from 'jest-get-type'
import { equals } from '../jasmine_utils'
import { iterableEquality } from '../utils'
import { multilineMessage } from '../multiline_utils'

const NAME = `toThrowMuliline`

const printActualErrorMessage = (
  error,
  pass,
  received,
  expected,
  name,
  field
) => {
  if (error) {
    const { stack } = separateMessageFromStack(error.stack)
    const msg = `Instead, it threw:\n${RECEIVED_COLOR(
      `${formatStackTrace(
        stack,
        {
          rootDir: process.cwd(),
          testMatch: [],
        },
        {
          noStackTrace: false,
        }
      )}`
    )}`

    if (received) {
      return `${msg}\n\n${multilineMessage(
        pass,
        received,
        expected,
        name,
        field
      )()}`
    }
  }

  return `But it didn't throw anything.`
}

const toThrowMultiline = (actual, expectedTemplateString) => {
  if (typeof actual !== `function`) {
    throw new Error(
      `${matcherHint(NAME, `function`, getType(expectedTemplateString))}\n\n` +
        `Received value must be a function, but instead ` +
        `"${getType(actual)}" was found`
    )
  }

  let error
  try {
    actual()
  } catch (err) {
    error = err
  }

  let pass = false
  let received
  let expected

  if (error) {
    expected = dedent(expectedTemplateString)
    received = error.message
    pass = equals(received, expected, [iterableEquality])
  }
  const message = () =>
    `${matcherHint(NAME, `function`, getType(expectedTemplateString))}\n\n` +
    `Expected the function to throw with message.\n${printActualErrorMessage(
      error,
      pass,
      received,
      expected,
      NAME,
      `message`
    )}`

  return {
    name: NAME,
    message,
    pass,
  }
}

export default toThrowMultiline
