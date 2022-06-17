import { createForm, Rule } from "effector-forms";

const rules = {
  required: (): Rule<string> => ({
    name: "required",
    validator: (value) => {
      return {
        isValid: Boolean(value),
        errorText: "Пустое поле",
      };
    },
  }),
  phone: (): Rule<string> => ({
    name: "phone",
    validator: (value) => ({
      isValid: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(
        value
      ),
      errorText: "Введите номер телефона",
    }),
  }),
  mail: (): Rule<string> => ({
    name: "phone",
    validator: (value) => ({
      isValid:
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
          value
        ),
      errorText: "Введите почту",
    }),
  }),
  allString: (): Rule<string> => ({
    name: "allString",
    validator: (value) => {
      return {
        isValid: !/\d/.test(value),
        errorText: "allString",
      };
    },
  }),
  allNumbers: (): Rule<string> => ({
    name: "allNumbers",
    validator: (value) => {
      return {
        isValid: !/[^0-9]/.test(value),
        errorText: "allNumbers",
      };
    },
  }),
};

const deliveryForm = createForm({
  fields: {
    name: {
      init: "",
      rules: [rules.required(), rules.allString()],
    },
    surname: {
      init: "",
      rules: [rules.required(), rules.allString()],
    },
    phone: {
      init: "",
      rules: [rules.required(), rules.phone()],
    },
    mail: {
      init: "",
      rules: [rules.required(), rules.mail()],
    },
    nameCompany: {
      init: "",
    },
    country: {
      init: "",
      rules: [rules.required(), rules.allString()],
    },
    city: {
      init: "",
      rules: [rules.required(), rules.allString()],
    },
    streetHome: {
      init: "",
      rules: [rules.required()],
    },
    postcode: {
      init: "",
      rules: [rules.required(), rules.allNumbers()],
    },
    comment: {
      init: "",
    },
  },
  validateOn: ["submit"],
});

deliveryForm.$values.watch((state) => console.log(state));

export default deliveryForm;
