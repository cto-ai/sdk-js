const errorCodes = {
  100: (command = '') => `Error requesting command ${command}`
}

export default class CTOAI_Error extends Error {
  code: string | number
  command?: string
  constructor(code: string | number, command?: string) {
      super((errorCodes as any)[code](command))
      this.name = 'CTOAI_JSSDK_Error'
      this.code = code

      // Set the prototype explicitly.
      Object.setPrototypeOf(this, CTOAI_Error.prototype);
  }
}
