import React, { createContext, useContext, useLayoutEffect, useMemo } from 'react'
import { makeTenoxUI, MakeTenoxUIParams } from '@tenoxui/core'
import { property as txProps } from '../lib/tenoxui/property'
import { classes as txClasses } from '../lib/tenoxui/classes'
import { values as txValues } from '../lib/tenoxui/values'
import { merge } from '../lib/merge'

type TenoxUIConfig = Omit<MakeTenoxUIParams, 'element'>
interface TenoxUIProviderProps extends Partial<TenoxUIConfig> {
  children: React.ReactNode
}

const TenoxUIContext = createContext<TenoxUIConfig | null>(null)

export const TenoxUIProvider: React.FC<TenoxUIProviderProps> = ({
  property = {},
  values = {},
  classes = {},
  breakpoints = [],
  children
}) => {
  const config: TenoxUIConfig = useMemo(
    () => ({
      property: { ...txProps, ...property },
      values: merge(txValues, values),
      classes: merge(txClasses, classes),
      breakpoints
    }),
    [property, values, classes, breakpoints]
  )

  useLayoutEffect(() => {
    document.querySelectorAll('*[class]').forEach((element) => {
      new makeTenoxUI({
        element: element as HTMLElement,
        ...config
      }).useDOM()
    })
  }, [config])

  return <TenoxUIContext.Provider value={config}>{children}</TenoxUIContext.Provider>
}
