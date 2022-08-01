import { NextPage } from 'next'
import { v4 as uuidv4 } from 'uuid'
import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { GrFormSubtract } from 'react-icons/gr'

import Layout from '~/layouts/adminLayout'
import { categories } from '~/data/categories'
import { classNames } from '~/utils/classNames'
import { QuestionFormValues } from '~/data/types'
import { ICategory, IChoice } from '~/data/interfaces'

const Questions: NextPage = (): JSX.Element => {
  /**
    * This will partially save your choices data
   */
  const [choices, setChoices] = useState<IChoice[]>([
    {
      id: uuidv4(),
      value: ''
    }
  ])
  
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<QuestionFormValues>()


  /**
    * This will handle dynamic input field
   */
  const handleChangeInput = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputFields = choices.map((i: any) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i
    })
    setChoices(newInputFields)
  }

  /**
    * This will remove dynamic choice field
   */
  const handleRemoveField = (id: string): void => {
    const values = [...choices]
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    )
    setChoices(values)
  }

  /**
    * This will add dynamic choice field
   */
  const handleAddField = (): void => setChoices([...choices, { id: uuidv4(), value: '' }])

    /**
    * This will Save all the data seelcted
   */
  const handleSave = (data: QuestionFormValues) => {
    console.log('Category ID', data?.category_id)
    console.log('Question: ', data?.value)
    console.log('Choices: ', choices)
  }

  return (
    <Layout metaTitle="Questions">
      <main className="pt-4 px-4">
        <section className={classNames(
          'overflow-x-auto relative rounded-2xl shadow-md bg-white',
          'max-w-lg mx-auto border'
        )}>
          <form className="p-10" onSubmit={handleSubmit(handleSave)}>
            <h1 className="text-center font-extrabold text-lg text-gray-700">Add Question</h1>
            <div className="mt-3">
              <label htmlFor="first_name" className="form-label">Categories *</label>
              <select 
                className="form-control" 
                tabIndex={1}
                {...register('category_id')}
              >
               {categories?.map(({ id, title }: ICategory) => <option key={id} value={id}>{title}</option>)}
              </select>
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="form-label">Question *</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Write your question"
                tabIndex={2}
                {...register('value')}
              />
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="form-label">Choices *</label>
              <ChooseFields
                choices={choices}
                actions={{ 
                  handleAddField,
                  handleChangeInput, 
                  handleRemoveField, 
                }}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button type="submit" className="btn-success px-10 py-3">Save</button>
            </div>
          </form>
        </section>
      </main>
    </Layout>
  )
}

type ChooseProps = {
  choices: any
  actions: {
    handleChangeInput: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void
    handleAddField: () => void
    handleRemoveField: (id: string) => void
  }
}

const ChooseFields: React.FC<ChooseProps> = (props): JSX.Element => {
  const { choices, actions } = props
  const {handleChangeInput, handleAddField, handleRemoveField } = actions

  const convertIndexToAlphabet = (num: number): string | undefined => {
    let columnLetter = '',
    t;
    while (num > 0) {
      t = (num - 1) % 26;
      columnLetter = String.fromCharCode(65 + t) + columnLetter;
      num = (num - t) / 26 | 0;
    }
    return columnLetter || undefined;
  }

  return choices?.map((choice: IChoice, i: number) => (
    <div
      key={choice?.id}
      className="flex items-center space-x-1 space-y-2">
      <div className="relative flex items-center flex-1">
        <div className="absolute flex items-center px-4 pt-2">
          <span className="font-bold text-green-500 pr-3 border-r">{convertIndexToAlphabet(i+1)}</span>
        </div>
        <input
          type="text"
          name="value"
          required
          value={choice?.value}
          onChange={(event) => handleChangeInput(choice?.id, event)}
          className="form-control pl-12"
        />
      </div>
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button 
          type="button" 
          className="btn-default rounded-l-sm"
          onClick={() => handleRemoveField(choice?.id)}
          disabled={choices?.length === 1}
        >
          <GrFormSubtract className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          type="button" 
          className="btn-default rounded-r-sm"
          onClick={handleAddField}
          disabled={choices?.length >= 7}
        >
          <FiPlus className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  ))
}

export default Questions
