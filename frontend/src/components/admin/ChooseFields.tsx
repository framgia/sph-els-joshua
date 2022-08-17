import { FiPlus } from 'react-icons/fi'
import { GrFormSubtract } from 'react-icons/gr'

import { IChoice } from '~/data/interfaces'
import { convertIndexToAlphabet } from '~/helpers/convertIndexToAlphabet'

type ChooseProps = {
  choices: any
  actions: {
    handleChangeInput: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void
    handleAddField: () => void
    handleRemoveField: (id: string) => void
  }
  isSubmitting: boolean
}

const ChooseFields: React.FC<ChooseProps> = (props): JSX.Element => {
  const { choices, actions, isSubmitting } = props
  const {handleChangeInput, handleAddField, handleRemoveField } = actions

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
          disabled={isSubmitting}
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
          disabled={choices?.length === 1 || isSubmitting}
        >
          <GrFormSubtract className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          type="button" 
          className="btn-default rounded-r-sm"
          onClick={handleAddField}
          disabled={choices?.length >= 7 || isSubmitting}
        >
          <FiPlus className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  ))
}

export default ChooseFields
