import type { PropType } from 'vue'

type positionType = 'top' | 'bottom'

export interface AffixProps {
  offset?: number
  position?: positionType
  zIndex?: number
}

export const affixProps = {
  offset: {
    type: Number,
    default: 0,
  },
  position: {
    type: String as PropType<positionType>,
    default: 'top',
  },
  zIndex: {
    type: Number,
    default: 100,
  },
}
