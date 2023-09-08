import React from 'react';
import Article from '../styled/Article';
import { SimpleP } from '../styled/Paragraphs';
import { Title1 } from '../styled/Titles';

const Welcome = () => {
  return (
    <Article
      $maxHeight={ "fit-content" }
    >
      <Title1>Boas vindas ao meu portfólio,</Title1>
      <SimpleP>Sou desenvolvedor web full-stack em formação e aqui procuro desenvolver e demonstrar minhas habilidades.</SimpleP>
      <SimpleP>
        Também busco a troca de idéias para disseminar conhecimento e para isso dedico uma seção deste portal a publicar artigos.
        Nessa seção haverá artigos que serão publicados com intenção de fazer contribuições acadêmicas ao assunto, os quais poderão receber devolutivas com sugestões e comentários.
      </SimpleP>
      <SimpleP>
        Sempre que for algum artigo tratando de alguma aplicação desenvolvida, haverá a possibilidade de contribuir com o seu 
        desenvolvimento seja para melhoria da ferramenta, refatoração de código ou resolução de problemas(bugs). 
      </SimpleP>
      <SimpleP>Então, obrigado por estar aqui e espero que seja um tempo proveitoso para você!</SimpleP>
    </Article>
  );
};

export default Welcome;
