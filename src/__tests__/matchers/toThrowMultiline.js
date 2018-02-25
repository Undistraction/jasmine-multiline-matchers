describe(`toThrowMultiline()`, () => {
  it(`passes when error message is identical`, () => {
    const expectedMessage = `
              one
                two
                two
                  three
                two
                  three
                    four
                two
              one`

    const message = `one
  two
  two
    three
  two
    three
      four
  two
one`
    const f = () => {
      throw new Error(message)
    }

    expect(() => f()).toThrowMultiline(expectedMessage)
  })

  it(`fails when error message is not identical`, () => {
    const expectedMessage = `
            one
                two
                two
                  three
                two
                  three
                    four
                two
              one`

    const message = `one
  two
  two
    three
  two
    three
      four
  two
one`
    const f = () => {
      throw new Error(message)
    }

    expect(() => f()).not.toThrowMultiline(expectedMessage)
  })
})
