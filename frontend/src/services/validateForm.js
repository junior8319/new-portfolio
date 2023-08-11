export const validateName = (receivedNameString) => {
  if (typeof receivedNameString !== 'string') {
    return 'Este campo deve receber uma string';
  }

  if (receivedNameString.length <= 3) {
    return 'O nome deve ter mais de três caracteres.';
  }

  return '';
};

export const validatePhone = (receivedPhone) => {
  if (receivedPhone.length === 0) return '';

  const VALID_NUMBER = /[0-9]{9,14}/gm;
  const IS_VALID = VALID_NUMBER.test(receivedPhone);

  return (IS_VALID)
  ?
    ''
  :
    'Favor informar um número de telefone válido (digite somente números).';
};

export const validateEmail = (receivedEmailString) => {
  const VALID_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm;
  const IS_VALID = VALID_EMAIL.test(receivedEmailString);

  return (IS_VALID)
  ?
    ''
  :
    (
      'Favor informar um endereço de e-mail'
    +
      ' válido (ex. "seuIdentificador@dominio.com.br").'
    );
};

export const validateMessage = (receivedMsgString) => {
  const VALID_MESSAGE = /\p{L}+/gu;
  const IS_VALID = receivedMsgString.match(VALID_MESSAGE);

  return (IS_VALID !== null && IS_VALID.length > 0)
  ?
    ''
  :
    'Esta não é uma mensagem válida, favor redigir com palavras legíveis.';
};

export const validateToEnableSubmission = (errors, messageObject) => {
  const errorKeys = Object.keys(errors);

  errorKeys.forEach(key => {
    if (messageObject[key].length === 0 && errors[key].required) {
      errors = {
        ...errors,
        [key]: {
          ...errors[key],
          error: `Este campo é de preenchimento obrigatório`,
        } 
      };
    }
    
    if (key === 'phone' && messageObject[key].length === 0) {
      errors = {
        ...errors,
        [key]: {
          ...errors[key],
          error: '',
        } 
      };
    }
  });

  return errors;
};

export const verifyErrorsAlertShowing = (errorsObject, messageObject) => {
  const errorsKeys = Object.keys(errorsObject);

  const response = errorsKeys.some(key => {
    if (errorsObject[key].required && messageObject[key].length === 0) return true;

    if (errorsObject[key].error.length > 0) return true;

    return false;
  });

  return response;
};
