import type { PropType } from 'vue'

type inputType = 'text' | 'textarea' | 'password' | 'date' | 'datetime' | 'time'
type inputState = 'error' | 'warning' | 'default'

export const inputProps = {
  type: {
    type: String as PropType<inputType>,
    default: 'text',
  },
  round: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number],
  },
  label: {
    type: String,
    default: undefined,
  },
  size: String,
  placeholder: String,
  state: {
    type: String as PropType<inputState>,
    default: 'default',
  },
}

export const inputEmits = {
  'update:modelValue': (value: string | number) => true,
  'change': (value: string, evt: Event) => true,
  'pressEnter': (evt: KeyboardEvent) => true,
  'clear': (evt: MouseEvent) => true,
  'focus': (evt: FocusEvent) => true,
  'blur': (evt: FocusEvent) => true,
}
