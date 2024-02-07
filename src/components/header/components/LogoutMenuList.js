import { getUserMe, updateUser } from "@/api/marketApi";
import { ROUTES } from "@/utils/constants/routePaths";
import useAuthStore from "@/utils/hooks/store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const LogoutMenuList = () => {
  const { logout, userName, setUser } = useAuthStore();
  const navigate = useNavigate();

  const testButton = async () => {
    const newName = prompt("새로운 사용자 이름을 입력하세요:", userName); // 기본값으로 현재 userName을 사용
    if (newName && newName.trim() !== "") {
      // 입력값 검증
      await updateUser({ username: newName })
        .then((res) => {
          console.log("res", res.data.username);
          setUser({ userName: res.data.username });
          alert("사용자 이름이 성공적으로 업데이트되었습니다.");
        })
        .catch((error) => {
          console.error("사용자 이름 업데이트 실패:", error);
          alert("사용자 이름 업데이트에 실패했습니다.");
        });
    } else {
      alert("유효한 사용자 이름을 입력해주세요.");
    }
  };

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
        <li onClick={testButton}>
          <div>changeName</div>
        </li>
        <li onClick={() => getUserMe()}>
          <div>Me</div>
        </li>
      </ul>
    </div>
  );
};
