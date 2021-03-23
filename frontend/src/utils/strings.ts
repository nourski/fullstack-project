import _ from 'lodash'

export const capitalize = _.capitalize
export const startCase = _.startCase
export const upperFirst = _.upperFirst

export const upperEachFirst = (str: string) => {
  return _.startCase(_.camelCase(str))
}

export default {
  capitalize,
  startCase,
  upperFirst,
  upperEachFirst,
}
