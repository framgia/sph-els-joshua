import tw from 'twin.macro'
import { FiPlus } from 'react-icons/fi'
import { GrFormSubtract } from 'react-icons/gr'

import { IChoice } from '~/data/interfaces'
import { styles as global } from '~/twin/global.styles'
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

const styles = {
  wrapper: [
    tw`flex items-center space-x-1 space-y-2`
  ],
  input_fields: [
    tw`
      relative flex items-center flex-1
      [> div]:(absolute flex items-center px-4 pt-2)
      [> div > span]:(font-bold text-green-500 pr-3 border-r)
      [> input]:(pl-12)
    `
  ],
  btn_options: [
    tw`inline-flex rounded-md shadow-sm`
  ]
}

const ChooseFields: React.FC<ChooseProps> = (props): JSX.Element => {
  const { choices, actions, isSubmitting } = props
  const {handleChangeInput, handleAddField, handleRemoveField } = actions

  return choices?.map((choice: IChoice, i: number) => (
    <div
      key={choice?.id}
      css={styles.wrapper}
    >
      <div css={styles.input_fields}>
        <div>
          <span>{convertIndexToAlphabet(i+1)}</span>
        </div>
        <input
          type="text"
          name="value"
          required
          disabled={isSubmitting}
          value={choice?.value}
          onChange={(event) => handleChangeInput(choice?.id, event)}
          css={global.form_control}
        />
      </div>
      <div css={styles.btn_options} role="group">
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
