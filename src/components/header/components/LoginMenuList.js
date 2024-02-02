import { ROUTES } from "@/utils/constants/routePaths";
import { useNavigate } from "react-router-dom";

export const LoginMenuList = () => {
  const navigate = useNavigate();
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <svg
            className="absolute w-10 h-10 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"></path>
          </svg>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li onClick={() => navigate(ROUTES.LOGIN)}>
          <div>Login</div>
        </li>
        <li onClick={() => navigate(ROUTES.JOIN)}>
          <div>Join</div>
        </li>
      </ul>
    </div>
  );
};
