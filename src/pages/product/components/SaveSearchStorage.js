// 임시로 사용할 브라우저 캐시 스토리지 선언
export const cacheStorage = {
  cache: {},
  getItem(key) {
    return this.cache[key] || null;
  },
  setItem(key, value) {
    this.cache[key] = value;
  },
  removeItem(key) {
    delete this.cache[key];
  },
  clear() {
    this.cache = {};
  }
};

// 로컬 스토리지에 최근 검색어 저장
export const saveLocalStorage = (word, isAuthenticated, accessToken) => {
  let updatedSearches;

  // 로컬 스토리지에서 최근 검색어 가져옴
  const existingSearches =
    JSON.parse(localStorage.getItem("RecentSearches")) || [];

  if (isAuthenticated) {
    // 로그인 되어있는 경우, 저장된 스토리지의 토큰과 로그인한 유저의 토큰 값 비교
    const existingTokenIndex = existingSearches.findIndex(
      (item) => item.token === accessToken
    );

    if (existingTokenIndex !== -1) {
      // 이미 해당 토큰이 존재하는 경우, 해당 토큰의 검색어 업데이트
      updatedSearches = existingSearches.map((item, index) =>
        index === existingTokenIndex
          ? {
              token: accessToken,
              // 새로운 검색어를 추가하고 중복 제거 후 최대 4개까지 유지
              keyword: [word, ...item.keyword]
                .filter((keyword, i, self) => self.indexOf(keyword) === i)
                .slice(0, 4)
            }
          : item
      );
    } else {
      // 해당 토큰이 존재하지 않는 경우, 새로운 토큰과 검색어를 추가
      updatedSearches = [
        ...existingSearches,
        { token: accessToken, keyword: [word] }
      ];
    }
  } else {
    return;
  }

  localStorage.setItem("RecentSearches", JSON.stringify(updatedSearches));
};

// 로컬 스토리지에 저장된 최근 검색어 조회
export const getLocalStorage = (isAuthenticated, accessToken) => {
  let storedSearches = [];

  if (isAuthenticated && accessToken) {
    // 로그인 및 유효한 토큰을 가진 사용자인 경우

    // 로컬 스토리지에서 "RecentSearches" 키의 값을 가져와 파싱
    const userTokenSearches =
      (JSON.parse(localStorage.getItem("RecentSearches")) || [])[0] || {};

    // 해당 토큰의 최근 검색어를 가져오거나, 값이 없으면 빈 배열 사용
    storedSearches = userTokenSearches.keyword || [];
  }
  // 최종적으로 로그인 상태가 아니거나 토큰이 유효하지 않은 경우 빈 배열 반환
  return storedSearches;
};

// 캐시 스토리지에 최근 검색어 저장
export const saveCacheStorage = (word, isAuthenticated, accessToken) => {
  let updatedSearches;

  const existingSearches =
    JSON.parse(cacheStorage.getItem("RecentSearches")) || [];

  if (isAuthenticated) {
    // 로그인 되어있는 경우, 저장된 스토리지의 토큰과 로그인한 유저의 토큰 값 비교
    const existingTokenIndex = existingSearches.findIndex(
      (item) => item.token === accessToken
    );

    if (existingTokenIndex !== -1) {
      // 이미 해당 토큰이 존재하는 경우, 해당 토큰의 검색어 업데이트
      updatedSearches = existingSearches.map((item, index) =>
        index === existingTokenIndex
          ? {
              token: accessToken,
              // 새로운 검색어를 추가하고 중복 제거 후 최대 4개까지 유지
              keyword: [word, ...item.keyword]
                .filter((keyword, i, self) => self.indexOf(keyword) === i)
                .slice(0, 4)
            }
          : item
      );
    } else {
      // 해당 토큰이 존재하지 않는 경우, 새로운 토큰과 검색어를 추가
      updatedSearches = [
        ...existingSearches,
        { token: accessToken, keyword: [word] }
      ];
    }
  } else {
    return;
  }

  cacheStorage.setItem("RecentSearches", JSON.stringify(updatedSearches));
};

// 캐시 스토리지에 저장된 최근 검색어 조회
export const getCacheStorage = (isAuthenticated, accessToken) => {
  let storedSearches = [];

  if (isAuthenticated && accessToken) {
    // 로그인 및 유효한 토큰을 가진 사용자인 경우

    // 캐시 스토리지에서 "RecentSearches" 키의 값을 가져와 파싱
    const userTokenSearches =
      (JSON.parse(cacheStorage.getItem("RecentSearches")) || [])[0] || {};

    // 해당 토큰의 최근 검색어를 가져오거나, 값이 없으면 빈 배열 사용
    storedSearches = userTokenSearches.keyword || [];
  }
  // 최종적으로 로그인 상태가 아니거나 토큰이 유효하지 않은 경우 빈 배열 반환
  return storedSearches;
};

const SaveSearchStorage = {
  cacheStorage,
  saveLocalStorage,
  getLocalStorage,
  saveCacheStorage,
  getCacheStorage
};

export { SaveSearchStorage };
