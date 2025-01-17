import {
  DateTimeResolver,
  DateResolver,
  LocalTimeResolver,
} from 'graphql-scalars'
import { asNexusMethod, enumType } from 'nexus'

export const DateTime = asNexusMethod(DateTimeResolver, 'datetime')
export const Date = asNexusMethod(DateResolver, 'date')
export const LocalTime = asNexusMethod(LocalTimeResolver, 'localTime')

export const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})
