/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Note:
 * - This is copied from jest/expect becuase these functions are not exposed
 * publicly.
 * - all flow annotations have been removed
 */

import {
  equals,
  isA,
  isImmutableUnorderedKeyed,
  isImmutableUnorderedSet,
} from './jasmine_utils'

const IteratorSymbol = Symbol.iterator

const hasIterator = object => !!(object != null && object[IteratorSymbol])

// eslint-disable-next-line import/prefer-default-export
export const iterableEquality = (a, b) => {
  if (
    typeof a !== `object` ||
    typeof b !== `object` ||
    Array.isArray(a) ||
    Array.isArray(b) ||
    !hasIterator(a) ||
    !hasIterator(b)
  ) {
    return undefined
  }
  if (a.constructor !== b.constructor) {
    return false
  }

  if (a.size !== undefined) {
    if (a.size !== b.size) {
      return false
    } else if (isA(`Set`, a) || isImmutableUnorderedSet(a)) {
      let allFound = true
      for (const aValue of a) {
        if (!b.has(aValue)) {
          allFound = false
          break
        }
      }
      if (allFound) {
        return true
      }
    } else if (isA(`Map`, a) || isImmutableUnorderedKeyed(a)) {
      let allFound = true
      for (const aEntry of a) {
        if (
          !b.has(aEntry[0]) ||
          !equals(aEntry[1], b.get(aEntry[0]), [iterableEquality])
        ) {
          allFound = false
          break
        }
      }
      if (allFound) {
        return true
      }
    }
  }

  const bIterator = b[IteratorSymbol]()

  for (const aValue of a) {
    const nextB = bIterator.next()
    if (nextB.done || !equals(aValue, nextB.value, [iterableEquality])) {
      return false
    }
  }
  if (!bIterator.next().done) {
    return false
  }
  return true
}
