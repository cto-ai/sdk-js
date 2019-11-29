export interface Team {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface User {
  id: string
  username: string
  emails: [
    {
      verified: boolean
      address: string
    },
  ]
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
}

export interface APIError {}

export interface APIResponse<T> {
  data: T
  error?: APIError[]
}

export type Questions<A extends Answers = Answers> =
  | Question<A>
  | Question<A>[]
  | ReadonlyArray<Question<A>>
export type Answers = Record<string, any>

interface QuestionCommon<A> {
  /**
   * The name to use when storing the answer in the answers hash.
   * If the name contains periods, it will define a path in the answers hash.
   */
  name: string
  /**
   * The question to print. If defined as a function, the first parameter will be
   * the current inquirer session answers.
   * Defaults to the value of `name` (followed by a colon).
   */
  message: string

  flag?: string
}

// interface QuestionOptions<A> {
//   match?: RegExp
// }

export type Question<A extends Answers = Answers> =
  | InputQuestion<A>
  | NumberQuestion<A>
  | SecretQuestion<A>
  | PasswordQuestion<A>
  | ConfirmQuestion<A>
  | ListQuestion<A>
  | AutoCompleteQuestion<A>
  | CheckboxQuestion<A>
  | EditorQuestion<A>
  | DatePickerQuestion<A>

interface InputQuestion<A> extends QuestionCommon<A> {
  type: 'input'
  default?: string
  allowEmpty?: boolean
}

interface NumberQuestion<A> extends QuestionCommon<A> {
  type: 'number'
  default?: number
  minimum?: number
  maximum?: number
}

interface SecretQuestion<A> extends QuestionCommon<A> {
  type: 'secret'
}

interface PasswordQuestion<A> extends QuestionCommon<A> {
  type: 'password'
  confirm?: boolean
}

interface ConfirmQuestion<A> extends QuestionCommon<A> {
  type: 'confirm'
  default?: boolean
}

interface ListQuestion<A> extends QuestionCommon<A> {
  type: 'list'
  choices: string[]
  default?: string | number
}

interface AutoCompleteQuestion<A> extends QuestionCommon<A> {
  type: 'autocomplete'
  choices: string[]
  default?: string | number
}

interface CheckboxQuestion<A> extends QuestionCommon<A> {
  type: 'checkbox'
  choices: string[]
}

interface EditorQuestion<A> extends QuestionCommon<A> {
  type: 'editor'
  default?: string | number
}

interface DatePickerQuestion<A> extends QuestionCommon<A> {
  type: 'datepicker'
  variant?: 'date' | 'time' | 'datetime'
  default?: string | Date
  minimum?: string | Date
  maximum?: string | Date
}
