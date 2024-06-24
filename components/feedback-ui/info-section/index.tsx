// lucide-react
import { Info } from "lucide-react";

// components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const InfoSection = () => {
  return (
    <div className="w-4/5">
      <Alert>
        <Info className="h-5 w-5" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          Organised imports will be available from here.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default InfoSection;
