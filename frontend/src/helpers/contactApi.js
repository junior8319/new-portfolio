import emailjs from '@emailjs/browser';

const PUBLIC_KEY = process.env.REACT_APP_BASE_PUBLIC_KEY;
const SERVICE_ID = process.env.REACT_APP_BASE_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_BASE_TEMPLATE_ID;

export const sendEmail = async (messageObject) => {
  const response = await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    messageObject,
    PUBLIC_KEY,
  ).then((response) => {
    return response.text;
  }).catch( (error) => {
    return error.text;
  });

  return response;
};
