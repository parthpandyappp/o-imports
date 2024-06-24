// lucide-react
import { ShieldAlert } from "lucide-react";

// components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DisabledSection = () => {
  return (
    <div className="w-4/5">
      <Alert>
        <ShieldAlert className="h-5 w-5" />
        <AlertTitle>Disabled</AlertTitle>
        <AlertDescription>
          Please select a programming language from the dropdown above to enable
          this area.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DisabledSection;
