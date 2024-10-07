import React, { createContext, useContext, useLayoutEffect, useMemo } from 'react'
import { makeTenoxUI, MakeTenoxUIParams } from '@tenoxui/core'
import { type Property } from '@tenoxui/property'
import { property as txProps } from '../lib/tenoxui/property'
import { classes as txClasses } from '../lib/tenoxui/classes'
import { values as txValues } from '../lib/tenoxui/values'
import { merge } from '../lib/merge'

type TenoxUIConfig = Omit<MakeTenoxUIParams, 'element'>
interface TenoxUIProviderProps extends Partial<TenoxUIConfig> {
  children: React.ReactNode
}

const TenoxUIContext = createContext<TenoxUIConfig | null>(null)

export function useConfig({
  property = {},
  values = {},
  classes = {},
  breakpoints = []
}: Partial<TenoxUIConfig> = {}): TenoxUIConfig {
  return useMemo(
    () => ({
      property: { ...txProps, ...property } as Property,
      values: merge(txValues, values),
      classes: merge(txClasses, classes),
      breakpoints
    }),
    [property, values, classes, breakpoints]
  )
}

export function useStyler({
  property = {},
  values = {},
  classes = {},
  breakpoints = []
}: Partial<TenoxUIConfig> = {}): TenoxUIConfig {
  const config = useConfig({ property, values, classes, breakpoints })

  useLayoutEffect(() => {
    document.querySelectorAll('*[class]').forEach(element => {
      new makeTenoxUI({
        element: element as HTMLElement,
        ...config
      }).useDOM()
    })
  }, [config])

  return config
}

export const TenoxUIProvider: React.FC<TenoxUIProviderProps> = ({
  property = {},
  values = {},
  classes = {},
  breakpoints = [],
  children
}) => {
  const config = useStyler({ property, values, classes, breakpoints })

  return <TenoxUIContext.Provider value={config}>{children}</TenoxUIContext.Provider>
}

export const useTenoxUI = (): TenoxUIConfig => {
  const context = useContext(TenoxUIContext)
  if (context === null) {
    throw new Error('useTenoxUI must be used within a TenoxUIProvider')
  }
  return context
}
