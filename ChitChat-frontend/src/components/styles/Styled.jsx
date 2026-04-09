import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent} from "react-router-dom";
import { gray } from "../../constants/color";

export const VisuallyHiddenInput = styled("input")({

    border:0,
    clip:"rect( 0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,

});

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  
  &:hover {
    background-color: rgba(184, 74, 74, 0.1);
  
   
  }

  
`;



export const InputBox = styled("input") `
width: 100%;
height: 100%;
border: none;
outline: none;
padding: 0.5rem 3rem;
border-radius: 1.5rem;
background-color: ${gray};

`

export const SearchField = styled("input") `
padding: 0.7rem 1rem;
width: 20vmax;
border: none;
outline: none;
border-radius: 1.2rem;
background-color: #f1f1f1;
font-size: 1.1rem;
@media (max-width: 600px) {  /* Adjust padding for small screens */
    padding: 0.3rem 1rem;
   width: 14vmax;
  }
     @media (max-width: 900px) {  /* Adjust padding for small screens */
    padding: 0.3rem 1rem;
   width: 14vmax;
  }

`;


export const CurveButton = styled("button") `
border-radius: 1.5rem;
padding: 0.6rem 2.5rem;
border:none;
outline: none;
cursor: pointer;
background-color:  #DCAE96;
color: white;
font-size: 1.1rem;
&:hover {
background-color:rgb(193, 150, 128);
}
@media (max-width: 600px) {  /* Adjust padding for small screens */
    padding: 0.3rem 1rem;
   width: 14vmax;
  }

  @media (max-width: 900px) {  /* Adjust padding for small screens */
    padding: 0.3rem 1rem;
   width: 14vmax;
  }


`


export const bounceAnimation = keyframes `
0% {transform: scale(0.5); }
50% {transform: scale(0.2); }
0% {transform: scale(1); }

`;


export const BouncingSkeleton = styled(Skeleton)(() => ({
 animation:  `${bounceAnimation} 1s infinite`,
}))