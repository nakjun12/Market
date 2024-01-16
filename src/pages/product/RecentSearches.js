import styled from "@emotion/styled";
import { useEffect, useState } from "react";

// 검색 - 최근 검색어 목록 컴포넌트
const RecentSearches = ({ searchTerm, handleSearchSubmit }) => {
  const [recentSearches, setRecentSearches] = useState([]);

  const RecentWrap = styled.div`
    padding: 15px 10px;
  `;

  const RecentWordBadge = styled.div`
    margin-right: 10px;
  `;

  const handleClearRecentSearches = () => {
    localStorage.removeItem("RecentSearches");
    setRecentSearches([]);
  };

  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem("RecentSearches")) || [];
    setRecentSearches(storedSearches);
  }, [searchTerm]);

  return (
    <RecentWrap>
      <div>
        {recentSearches.map((search, index) => (
          <RecentWordBadge
            className="badge badge-outline"
            key={index}
            onClick={() => handleSearchSubmit(search)}>
            {search.length > 6 ? `${search.slice(0, 5)}..` : search}
          </RecentWordBadge>
        ))}
      </div>
      <div>
        <button onClick={handleClearRecentSearches}>최근 검색어 초기화</button>
      </div>
    </RecentWrap>
  );
};

export default RecentSearches;
