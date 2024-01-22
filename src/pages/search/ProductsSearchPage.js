import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import RecentSearches from "./components/RecentSearches";

const ProductsSearchPage = () => {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (current) => {
    let searchWord;

    console.log("type::", typeof current);
    if (typeof current === "string") {
      // 최근 검색어를 클릭한 경우
      console.log("최근 검색어", current);
      searchWord = current.trim();
    } else {
      if (inputVal === "") {
        // 검색어가 빈 값인 경우 처리하지 않음
        console.log("빈 값을 입력하고 검색하는 경우 처리하지 않음");
        // 에러 팝업 또는 다른 처리를 여기에 추가
        return;
      }
      // 검색 버튼을 클릭한 경우
      console.log("검색 버튼");
      searchWord = inputVal;
    }

    // 최근 검색어 저장 로직 추가
    const existingSearches =
      JSON.parse(localStorage.getItem("RecentSearches")) || [];

    // 최근 검색어 목록 업데이트
    const updatedSearches = [
      searchWord,
      ...existingSearches.filter((item) => item !== searchWord).slice(0, 3)
    ];
    localStorage.setItem("RecentSearches", JSON.stringify(updatedSearches));

    console.log("handleSearchSubmit inputVal::", searchWord);

    // 검색어 업데이트 및 초기화 + 메뉴 이동
    navigate(`/web/search/${encodeURIComponent(searchWord)}`);
    setSearchTerm(searchWord);
    setInputVal("");
  };

  const handleSearchChange = (e) => {
    // 검색어 입력이 있을 때만 동작

    setInputVal(e.target.value);
  };

  useEffect(() => {
    console.log("검색된 값::", searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <div className="navbar bg-base-100" style={{ padding: "15px" }}>
        <div className="navbar-start lg:flex">
          <div className="flex-none gap-2">
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
