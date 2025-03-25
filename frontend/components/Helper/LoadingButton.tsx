import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

interface Props extends React.ComponentProps<typeof Button> {
  isLoading: boolean;
}

const LoadingButton = ({ isLoading, children, ...props }: Props) => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Loader className="animate-spin mr-2" size={16} />}
      {children}
    </Button>
  );
};

export default LoadingButton;
