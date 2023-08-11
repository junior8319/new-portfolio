import { useState } from 'react';
import { Title2 } from '../../styled/Titles';
import { Label } from '../../styled/Labels';
import { Input } from '../../styled/Inputs';
import { SaveButton } from '../../styled/Buttons';

const ProjectsForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const sendRegisterRequest = (event) => {
    event.preventDefault();

    console.log(file);
    const formData = new FormData();
    formData.append('snapshot', file);

    const options = {
      method: 'POST',
      body: formData,
    };

    fetch('http://localhost:3001/upload', options)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Title2>Cadastro de Projetos</Title2>

      <form
        action="/upload"
        method="post"
        encType="multipart/form-data"
        onSubmit={ sendRegisterRequest }
      >
        <Label
          htmlFor="snapshot"
        >
          Snapshot:
        </Label>

        <Input
          id="snapshot"
          name="snapshot"
          type="file"
          accept="image/*"
          onChange={ handleFileChange }
        />

        <SaveButton
          type="submit"
          value='Salvar'
        />
      </form>
    </>
  );
};

export default ProjectsForm;