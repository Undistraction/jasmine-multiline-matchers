import dedent from 'dedent-preserving-indents'
import { iterableEquality } from '../utils'
import { equals } from '../jasmine_utils'
import { multilineMessage } from '../multiline_utils'

const NAME = `toEqualMultiline`

const toEqualMultiline = (received, expectedTemplateString) => {
  const expected = dedent(expectedTemplateString)
  const pass = equals(received, expected, [iterableEquality])
  const message = multilineMessage(pass, received, expected, NAME, `value`)

  // Passing the the actual and expected objects so that a custom reporter
  // could access them, for example in order to display a custom visual diff,
  // or create a different error message
  return { actual: received, expected, message, name: NAME, pass }
}

export default toEqualMultiline
