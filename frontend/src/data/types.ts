export type CategoryFormValues  = {
  title: string
  description: string
}

export type SignInUpFormValues  = {
  name: string
  email: string
  password: string
  setErrors?: React.Dispatch<React.SetStateAction<never[]>>
}

export type QuestionFormValues = {
  id: string
  value: string
  category_id: number
}
