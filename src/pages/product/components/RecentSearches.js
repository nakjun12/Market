import useAuthStore from "@/utils/hooks/store/useAuthStore";
import styled from "@emotion/styled";
import { UsersIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

// 검색 - 최근 검색어 목록 컴포넌트
const RecentSearches = ({ searchTerm, handleSearchSubmit }) => {
  const { isAuthenticated, accessToken } = useAuthStore();
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    let storedSearches = [];

    if (isAuthenticated && accessToken) {
      // 로그인 & 토큰 유효 사용자일 때
      const userTokenSearches =
        (JSON.parse(localStorage.getItem("RecentSearches")) || [])[0] || {};

      storedSearches = userTokenSearches.keyword || [];
    } else {
      // 미로그인 사용자일 때
      storedSearches = [];
    }

    setRecentSearches(storedSearches);
  }, [searchTerm, isAuthenticated, accessToken]);

  return (
    <>
      {recentSearches.length > 0 && (
        <RecentWrap>
          <ResentTitle>최근 검색어</ResentTitle>
          <div>
            {recentSearches.map((word, index) => (
              <RecentWordBadge
                className="badge badge-primary badge-md"
                key={index}
                onClick={() => handleSearchSubmit(word)}>
                {word.length > 6 ? `${word.slice(0, 5)}..` : word}
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
