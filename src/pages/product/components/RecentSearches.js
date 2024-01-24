import styled from "@emotion/styled";
import { useEffect, useState } from "react";

// 검색 - 최근 검색어 목록 컴포넌트
const RecentSearches = ({ searchTerm, handleSearchSubmit }) => {
  const [recentSearches, setRecentSearches] = useState([]);

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
    <>
      {recentSearches.length > 0 && (
        <RecentWrap>
          <ResentTitle>최근 검색어</ResentTitle>
          <div>
            {recentSearches.map((search, index) => (
              <RecentWordBadge
                className="badge badge-primary badge-md"
                key={index}
                onClick={() => handleSearchSubmit(search)}>
                {search.length > 6 ? `${search.slice(0, 5)}..` : search}
              </RecentWordBadge>
            ))}
          </div>
          <div>
            {/* <button onClick={handleClearRecentSearches}>최근 검색어 초기화</button> */}
          </div>
        </RecentWrap>
      )}
    </>
  );
};

export default RecentSearches;

const RecentWrap = styled.div`
  padding: 0px 16px;
`;

const ResentTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const RecentWordBadge = styled.div`
  margin: 10px 10px 0 0;
  height: 30px;
  border-radius: 18px;
`;
