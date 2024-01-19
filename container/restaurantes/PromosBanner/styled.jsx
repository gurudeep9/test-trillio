import { BGColor } from "public/colors";
import styled, { css } from "styled-components";

export const Content = styled.div`
    margin: auto;
    font-size: 16px;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    width: 100%;
    max-width: 1766px!important;
`
export const CardProduct = styled.div`
    height: 300px;
    width: 100%;
    border-radius: 2%;
    box-shadow: 1px 1px 3px #7c7c7c54;
    `
export const Img = styled.img`
    background-color: rgb(255 251 251 / 70%);
    background-blend-mode: overlay;
    object-fit: contain;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    min-height: 120px;
    object-fit: cover;
    border-radius: 4px;

`
export const BannerPromo = styled.div`
    cursor: pointer;
    margin: auto;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    @media (max-width: 640px) {
        height: auto;
        width: 100%;
        
     }
`
export const ContainerCardProduct = styled.div`
    .Swiper_wrapper_banner {
        height: 240px;

    }

`
export const ImageBannerPromo = styled.img`
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: top;
    object-position: top;
    width: 100%;
`
export const CardPromo = styled.div`
    position: relative;
    border-radius: 5px;
    border-radius: 6px;
    display: block;
    height: 250px;
    overflow: hidden;
    position: relative;
    text-align: center;
    @media (max-width: 960px){
        height: 250px;

    }
    .goto-action {
    align-items: center;
    bottom: 0;
    box-sizing: border-box;
    display: -webkit-flex;
    display: flex;
    left: 0;
    padding: 16px;
    position: absolute;
    width: 100%;
    z-index: 1;
    background: linear-gradient(0deg,rgb(255 0 0 / 53%) 0%,rgb(255 0 0 / 0%) 100%);
    }
    .text {
        font-size: 22px;
    font-weight: 600;
    line-height: 1.09;
    color: ${BGColor};
    }
`
export const ContainerSliderPromo = styled.div`
    display: grid;
    grid-template-columns: repeat(100, 100px); 
    padding: 5px;
    gap: 10px;
    place-content: center;
    grid-template-columns: 33% repeat(auto-fill, 33%) 33%;
    @media (max-width: 960px){
        grid-template-columns: repeat(auto-fill, 45%);
        /* display: flex; */
    }
`
