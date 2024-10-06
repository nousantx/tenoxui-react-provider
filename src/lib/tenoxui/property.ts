import { property as txProps, type Property } from '@tenoxui/property'

const properties: Property = {
  bgc: 'backgroundColor'
}

export const property = { ...txProps, properties }
