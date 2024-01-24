import { ROUTES } from "@/utils/constants/routePaths";
import useAuthStore from "@/utils/hooks/store/useAuthStore";
import { HomeIcon } from "@heroicons/react/16/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { LogoutMenuList } from "./components/LogoutMenuList";
import { LoginMenuList } from "./components/LoginMenuList";
import { useLocation } from "react-router-dom";
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleSearchIconClick = () => {
    // 현재 경로가 검색 페이지가 아닌 경우에만 동작하도록 처리
    if (location.pathname !== "/web/search") {
      navigate("/web/search");
    }
  };

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div
          tabIndex={0}
          role="button"
          className="flex-col btn"
          onClick={() => navigate(ROUTES.HOME)}>
          <HomeIcon className="w-8 h-8" />
          <div className="text-lg">PineMarket</div>
        </div>
      </div>
      <div className="navbar-end">
        <button
          className="btn btn-ghost btn-circle"
          onClick={handleSearchIconClick}>
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
        {isAuthenticated ? <LogoutMenuList /> : <LoginMenuList />}
      </div>
    </div>
  );
}
