import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecentSearches from "./components/RecentSearches";
import useAuthStore from "@/utils/hooks/store/useAuthStore";
import {
  saveLocalStorage,
  saveCacheStorage
} from "@/pages/product/components/SaveSearchStorage";

const ProductsSearchPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, id: loginId } = useAuthStore();
  const [inputVal, setInputVal] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const saveSearchKeyword = (word) => {
    // 최근 검색어 저장 로직 추가
    // 로컬 스토리지 사용할 수 없을 때 브라우저 캐시 사용
    try {
      saveLocalStorage(word, isAuthenticated, loginId);
    } catch (error) {
      saveCacheStorage(word, isAuthenticated, loginId);
    }
  };

  const handleSearchSubmit = (current) => {
    let searchWord;

    // console.log("type::", typeof current);
    if (typeof current === "string") {
      // 최근 검색어를 클릭한 경우
      searchWord = current.trim();
    } else {
      if (inputVal === "") {
        // 검색어가 빈 값인 경우 처리하지 않음
        // 에러 팝업 또는 다른 처리를 여기에 추가
        return;
      }
      // 검색 버튼을 클릭한 경우
      searchWord = inputVal;
    }

    // 최근 검색어 저장
    saveSearchKeyword(searchWord);

    // 검색어 업데이트 및 초기화 + 메뉴 이동
    navigate(`/web/search/${encodeURIComponent(searchWord)}`);
    setSearchTerm(searchWord);
    setInputVal("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputVal) handleSearchSubmit();
  };

  const handleSearchChange = (e) => {
    // 검색어 입력이 있을 때만 동작
    setInputVal(e.target.value);
  };

  useEffect(() => {}, [searchTerm]);

  return (
    <div>
      <div className="navbar bg-base-100" style={{ padding: "15px" }}>
        <div className="navbar-start lg:flex">
          <div className="flex-none gap-2">
            <form onSubmit={onSubmit}>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="input input-bordered w-24 md:w-auto"
                  value={inputVal}
                  onChange={handleSearchChange}
                  style={{ width: "20.5rem" }}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="navbar-end">
          <button className="btn" onClick={handleSearchSubmit}>
            검색
          </button>
        </div>
      </div>
      {/* 최근 검색어 영역 */}
      <RecentSearches
        searchTerm={searchTerm}
        handleSearchSubmit={handleSearchSubmit}
      />
    </div>
  );
};

export default ProductsSearchPage;
