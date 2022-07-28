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
