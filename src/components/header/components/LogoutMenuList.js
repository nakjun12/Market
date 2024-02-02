import { ROUTES } from "@/utils/constants/routePaths";
import useAuthStore from "@/utils/hooks/store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const LogoutMenuList = () => {
  const { logout, userName } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li onClick={() => navigate(ROUTES.PROFILE)}>
          <a className="justify-between">
            HI! {userName}
            <span className="badge">Profile</span>
          </a>
        </li>
        <li onClick={() => logout()}>
          <div>Logout</div>
        </li>
      </ul>
    </div>
  );
};
