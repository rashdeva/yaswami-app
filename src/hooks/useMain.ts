import { useMainButton } from "@tma.js/sdk-react";
import { useEffect } from "react";

export const useMain = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  const mb = useMainButton();

  useEffect(() => {
    mb.setBgColor("#").setText(text).show().on("click", onClick);

    return () => {
      mb.hide().off("click", onClick);
    };
  }, [mb]);
};
