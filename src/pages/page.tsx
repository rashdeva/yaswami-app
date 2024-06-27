import LogoPng from "~/assets/sun.svg";
import { useEffect } from "react";
import { useBackButton } from "@tma.js/sdk-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "~/db/userStore";
import { getTeacher } from "~/db/api";

export default function MainPage() {
  const bb = useBackButton();
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (bb) {
      bb.hide();
    }
  }, [bb]);

  useEffect(() => {
    if (user.id) {
      getTeacher(user.id).then(({ data }) => {
        if (data && data.length > 0) {
          navigate("/events");
        } else {
          navigate("/onboarding");
        }
      });
    }
  }, [user.id]);

  return (
    <div className="h-dvh flex flex-col justify-center items-center py-4">
      <img src={LogoPng} className="max-w-40 animate-spin-slow" alt="" />
    </div>
  );
}
