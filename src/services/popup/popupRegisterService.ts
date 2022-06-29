import { createForm, Rule } from 'effector-forms'
import { forward } from 'effector'
import { appService } from '../app/appService'
const rules = {
  required: (): Rule<string> => ({
    name: 'required',
    validator: (value) => {
      return {
        isValid: Boolean(value),
        errorText: 'Пустое поле',
      }
    },
  }),
  phone: (): Rule<string> => ({
    name: 'phone',
    validator: (value) => ({
      isValid: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value),
      errorText: 'Введите номер телефона',
    }),
  }),
  mail: (): Rule<string> => ({
    name: 'phone',
    validator: (value) => ({
      isValid: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value),
      errorText: 'Введите почту',
    }),
  }),
  allString: (): Rule<string> => ({
    name: 'allString',
    validator: (value) => {
      return {
        isValid: !/\d/.test(value),
        errorText: 'allString',
      }
    },
  }),
  allNumbers: (): Rule<string> => ({
    name: 'allNumbers',
    validator: (value) => {
      return {
        isValid: !/[^0-9]/.test(value),
        errorText: 'allNumbers',
      }
    },
  }),
  password: (): Rule<string> => ({
    name: 'password',
    validator: (value) => {
      return {
        isValid: value.length < 6 ? false : true,
        errorText: 'Пароль должен содержать больше 6 символов',
      }
    },
  }),
}

const registerForm = createForm({
  fields: {
    name: {
      init: '',
      rules: [rules.required()],
    },
    phone: {
      init: '',
      rules: [rules.required(), rules.phone()],
    },
    mail: {
      init: '',
      rules: [rules.required(), rules.mail()],
    },
    password: {
      init: '',
      rules: [rules.required(), rules.password()],
    },
  },
  validateOn: ['submit'],
})

export default registerForm
