import { BuildingContainer, InnerContent } from "../styled/Container";
import NavLink from "../styled/Link";
import { SimpleP } from "../styled/Paragraphs";
import { NormalPicture } from "../styled/Pictures";
import { Title1 } from "../styled/Titles";

const BuildingComp = ({ buildingProps }) => {
  return (
    <BuildingContainer
      $backgroundColor="#57575780"
    >
      <InnerContent
        $textAlign="center"
      >
        <Title1>{buildingProps.title}</Title1>
      </InnerContent>
      <InnerContent
        $textAlign="center"
      >
        <NormalPicture
          $width="50%"
          $margin="10px 10px 0 10px"
          src={buildingProps.image}
        />
        <SimpleP
          $padding="0"
          $width="100%"
          $margin="0 10px 10px 10px"
        >
          <NavLink
            href={ buildingProps.imageBy }
            target="_blank"
          >
            Por Alexas_Fotos
          </NavLink>

          <NavLink
            href={buildingProps.imageSource}
            target="_blank"
          >
            {", Em Pixabay"}
          </NavLink>
        </SimpleP>
      </InnerContent>
    </BuildingContainer>
  );
};

export default BuildingComp;
