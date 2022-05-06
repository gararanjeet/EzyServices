import waterServicingLogo from "../../images/waterService/waterServiceLogo.svg";
import houseCleaningLogo from "../../images/HouseKeeping/houseCleaningLogo.svg";
import WaterServiceForm from "../../components/waterServiceForm/WaterServiceForm";
import HouseCleaningForm from "../../components/houseCleaningForm/HouseCleaningForm";

export const paths = {
  waterservicing: {
    logo: waterServicingLogo,
    form: () => <WaterServiceForm />,
  },
  houseCleaning: {
    logo: houseCleaningLogo,
    form: () => <HouseCleaningForm />,
  },
};
