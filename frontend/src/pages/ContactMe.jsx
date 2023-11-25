import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Container from '../styled/Container';
import { FormContainer, FormDiv100 } from '../styled/Form';
import { Label, Span } from '../styled/Labels';
import { Title1 } from '../styled/Titles';
import Article from '../styled/Article';
import { Input, TextArea } from '../styled/Inputs';
import { CancelButton, SaveButton } from '../styled/Buttons';
import {
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
  validateToEnableSubmission,
  verifyErrorsAlertShowing
} from '../services/validateForm';
import { SimpleP } from '../styled/Paragraphs';
import { sendEmail } from '../helpers/contactApi';
import Loading from '../components/Loading';

const ContactMe = () => {
  const initialMsgObj = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  const initialErrors = {
  name:{ error: '', required: true },
  email: { error: '', required: true },
  phone: { error: '', required: false },
  message: { error: '', required: true },
  };

  const [messageObj, setMessageObj] = useState(initialMsgObj);
  const [errorsObj, setErrorsObj] = useState(initialErrors);
  const [submissionEnabled, enableSubmission] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [sendingStatus, setSendingStatus] = useState('');
  const [sendingStatusMsg, setSendingStatusMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'phone') {
      setMessageObj({
        ...messageObj,
        phone: value.replace(/\D/g, ''),
      });
    } else {
      setMessageObj({
        ...messageObj,
        [name]: value,
      });
    }
  };

  const monitorSendingStatus = (status) => {
    if (status.length === 0) return '';

    if (status === 'OK') {
      return 'Obrigado pelo seu contato, retornarei em breve.';
    } else {
      return `Lamento, não foi possível enviar seu contato. \n ${status}`;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrorsObj(
      validateToEnableSubmission(
        errorsObj,
        messageObj,
      )
    );

    if (submissionEnabled) {
      setIsSending(true);

      sendEmail(messageObj)
      .then((response) => setSendingStatus(response))
      .catch((response) => setSendingStatus(response))
      .finally(() => {
        setIsSending(false);
        setMessageObj(initialMsgObj);
      });
    }
  };

  useEffect(() => {
    if (sendingStatus.length > 0) {
      setSendingStatusMessage(monitorSendingStatus(sendingStatus));
    } else {
      setSendingStatusMessage('');
    }

    (verifyErrorsAlertShowing(errorsObj, messageObj))
    ?
      enableSubmission(false)
    :
      enableSubmission(true)
  }, [errorsObj, messageObj, sendingStatus]);

  return (
    <>
      <Container>
        <Article
          $maxHeight={ 'fit-content' }
        >
          <Title1>Contato</Title1>

          <FormContainer>
            <FormDiv100
              $padding={'0 10px'}
              $margin={'1px auto'}
            >
              <Label htmlFor='name'>
                Nome:
                {errorsObj.name.required &&
                  <Span>*</Span>}
              </Label>

              <Input
                id='name'
                name='name'
                placeholder='Seu nome aqui...'
                value={messageObj.name}
                required
                onChange={(event) => handleInputChange(event)}
                onKeyUp={() => {
                  setErrorsObj({
                    ...errorsObj,
                    name: { ...errorsObj.name, error: validateName(messageObj.name) }
                  });
                } } />
            </FormDiv100>

            {errorsObj.name.error.length > 0 &&
              <FormDiv100
                $padding={'0 10px'}
                $margin={'1px auto'}
              >
                <SimpleP color={'#f59a9a'}>{errorsObj.name.error}</SimpleP>
              </FormDiv100>}

            <FormDiv100
              $padding={'0 10px'}
              $margin={'1px auto'}
            >
              <Label htmlFor='email'>
                E-mail:
                {errorsObj.email.required &&
                  <Span>*</Span>}
              </Label>

              <Input
                id='email'
                name='email'
                placeholder='ex.: seuEndereço@dominio.com'
                value={messageObj.email}
                required
                onChange={(event) => handleInputChange(event)}
                onKeyUp={() => {
                  setErrorsObj({
                    ...errorsObj,
                    email: { ...errorsObj.email, error: validateEmail(messageObj.email) }
                  });
                } } />
            </FormDiv100>

            {errorsObj.email.error.length > 0 &&
              <FormDiv100
                $padding={'0 10px'}
                $margin={'1px auto'}
              >
                <SimpleP color={'#f59a9a'}>{errorsObj.email.error}</SimpleP>
              </FormDiv100>}

            <FormDiv100
              $padding={'0 10px'}
              $margin={'1px auto'}
            >
              <Label htmlFor='phone'>
                Telefone:
                {errorsObj.phone.required &&
                  <Span>*</Span>}
              </Label>

              <Input
                id='phone'
                name='phone'
                placeholder='(ddd com 2 dígitos) + número...(digite somente números)'
                mask='(99) 99999-9999999'
                maskChar={null}
                value={messageObj.phone}
                onChange={(event) => handleInputChange(event)}
                onKeyUp={() => {
                  setErrorsObj({
                    ...errorsObj,
                    phone: { ...errorsObj.phone, error: validatePhone(messageObj.phone) }
                  });
                } } />
            </FormDiv100>

            {errorsObj.phone.error.length > 0 &&
              <FormDiv100
                $padding={'0 10px'}
                $margin={'1px auto'}
              >
                <SimpleP color={'#f59a9a'}>{errorsObj.phone.error}</SimpleP>
              </FormDiv100>}

            <FormDiv100
              $padding={'0 10px'}
              $margin={'1px auto'}
            >
              <Label
                htmlFor='message'
              >
                Mensagem:
                {errorsObj.message.required &&
                  <Span>*</Span>}
              </Label>

              <TextArea
                rows={10}
                id='message'
                name='message'
                placeholder='Digite sua mensagem...'
                value={messageObj.message}
                required
                onChange={(event) => handleInputChange(event)}
                onKeyUp={() => {
                  setErrorsObj({
                    ...errorsObj,
                    message: { ...errorsObj.message, error: validateMessage(messageObj.message) }
                  });
                } } />
            </FormDiv100>

            {errorsObj.message.error.length > 0 &&
              <FormDiv100
                $padding={'0 10px'}
                $margin={'1px auto'}
              >
                <SimpleP color={'#f59a9a'}>{errorsObj.message.error}</SimpleP>
              </FormDiv100>}

            <FormDiv100
              $padding={'0 10px'}
              $margin={'1px auto'}
            >
              {(sendingStatusMsg && sendingStatusMsg.length > 0) &&
                <FormDiv100>
                  <SimpleP
                    color={(sendingStatus === 'OK') ? '#13890f' : '#f59a9a'}
                  >
                    {sendingStatusMsg}
                  </SimpleP>

                  <CancelButton
                    type='button'
                    value={'Fechar'}
                    onClick={() => setSendingStatus('')} />
                </FormDiv100>}

              {isSending
                ?
                <FormDiv100
                  // $height={'100px'}
                >
                  <Loading
                    word={'Enviando...'}
                    $marginTop={'0'}
                    $marginBottom={'5px'}
                    $height={'30px'}
                    $width={'95%'}
                    $fontSize={'24px'}
                  />
                </FormDiv100>
                :
                <SaveButton
                  type='button'
                  value={'Enviar'}
                  onClick={(event) => handleSubmit(event)} />}
            </FormDiv100>
          </FormContainer>
        </Article>
      </Container>
    </>
  );
};

export default ContactMe;
