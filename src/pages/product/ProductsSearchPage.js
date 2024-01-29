import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import RecentSearches from "./components/RecentSearches";
import useAuthStore from "@/utils/hooks/store/useAuthStore";
import { getUsersMe } from "@/api/marketApi";

const ProductsSearchPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, accessToken } = useAuthStore();
  const [inputVal, setInputVal] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const saveSearchKeyword = (word) => {
    // 최근 검색어 저장 로직 추가
    const existingSearches =
      JSON.parse(localStorage.getItem("RecentSearches")) || [];

    let updatedSearches;

    if (isAuthenticated) {
      // 로그인 한 사용자일 때
      const existingTokenIndex = existingSearches.findIndex(
        (item) => item.token === accessToken
      );

      if (existingTokenIndex !== -1) {
        // 해당 토큰이 이미 존재하는 경우(검색 기록 O)
        updatedSearches = existingSearches.map((item, index) =>
          index === existingTokenIndex
            ? {
                token: accessToken,
                keyword: [word, ...item.keyword]
                  .filter((keyword, i, self) => self.indexOf(keyword) === i)
                  .slice(0, 4)
              }
            : item
        );
      } else {
        // 로그인 & 이전 최근 검색 기록 없는 경우
        updatedSearches = [
          ...existingSearches,
          { token: accessToken, keyword: [word] }
        ];
      }
    } else {
      // 미로그인
      updatedSearches = existingSearches.map((item) => item);
    }

    localStorage.setItem("RecentSearches", JSON.stringify(updatedSearches));
  };

  const handleSearchSubmit = (current) => {
    let searchWord;

    console.log("type::", typeof current);
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
