import useAuthStore from "@/utils/hooks/store/useAuthStore";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getLocalStorage } from "@/pages/product/components/SaveSearchStorage";
import { getCacheStorage } from "@/pages/product/components/SaveSearchStorage";

// 검색 - 최근 검색어 목록 컴포넌트
const RecentSearches = ({ searchTerm, handleSearchSubmit }) => {
  const { isAuthenticated, id: loginId } = useAuthStore();
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    let storedSearches = [];

    try {
      // 로컬 스토리지 사용할 수 없을 때 브라우저 캐시 사용
      storedSearches = getLocalStorage(isAuthenticated, loginId);
    } catch (error) {
      storedSearches = getCacheStorage(isAuthenticated, loginId);
    }

    setRecentSearches(storedSearches);
  }, [searchTerm, isAuthenticated, loginId]);

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
