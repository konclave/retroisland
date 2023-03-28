import { GenericSlide } from "yet-another-react-lightbox";
import { VideoPlayer } from "./video-player";

declare module "yet-another-react-lightbox" {
  export interface CustomSlide extends GenericSlide {
    url: string;
  }

  interface SlideTypes {
    "custom-slide": CustomSlide;
  }
}
