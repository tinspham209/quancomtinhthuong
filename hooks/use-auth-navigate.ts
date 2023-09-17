import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useAuthNavigate = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigateToLogin = () => {
    toast.error("Unauthorized, Please sign in first");
    router.push(`/sign-in?redirect_url=${pathname}`);
  };

  return { navigateToLogin };
};

export default useAuthNavigate;
