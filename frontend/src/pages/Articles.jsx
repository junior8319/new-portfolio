import React from 'react';
import NavBar from '../components/NavBar';
import Container from '../styled/Container';
import BuildingComp from '../components/BuildingComp';
import image from '../assets/images/handyman.jpg';

const Articles = () => {
  return (
    <>
      <NavBar />
      <Container
        $height="90vh"
      >
        <BuildingComp
          buildingProps={{
            title: 'Página dos Meus Artigos em construção...',
            image: image,
            imageBy: 'https://pixabay.com/pt/users/alexas_fotos-686414/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3094035',
            imageSource: 'https://pixabay.com/pt//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3094035'
          }}
        />
      </Container>
    </>
  );
};

export default Articles;
