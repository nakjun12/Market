import useAuthStore from "@/utils/hooks/store/useAuthStore";
import axios from "axios";

const baseURL = "https://pinemarket.cielui.com";

const marketApi = axios.create({
  baseURL,
  withCredentials: true
});

// 요청 인터셉터: 모든 요청 전에 실행
marketApi.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState(); // useAuthStore에서 액세스 토큰 가져오기
    if (config.requiresAuth && accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`; // 액세스 토큰이 있으면 요청 헤더에 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // 요청 오류 처리
  }
);

// 응답 인터셉터: 모든 응답 후에 실행
marketApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 401에러의 경우 (인증 에러)

    if (error.response?.status === 401) {
      const originalRequest = error.config;
      const isRefreshTokenRequest = originalRequest.url.includes(
        "/auth/refresh-token"
      );
      // Refresh token 에러 (만료 혹은 없거나 비적합)
      if (isRefreshTokenRequest) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      // 재시도이지 않은 에러
      if (!originalRequest._retry) {
        // 무한 재요청 방지를 위한 트리거
        originalRequest._retry = true;
        const newAccessToken = await refreshAccessTokenAndFetchUser();
        if (newAccessToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return marketApi(originalRequest); // 재요청
        }
      }
    }

    return Promise.reject(error); // 다른 모든 에러는 여기서 처리
  }
);

// 리프래쉬 토큰에 대한 함수
async function refreshAccessTokenAndFetchUser() {
  try {
    const { data } = await marketApi.post("/auth/refresh-token");
    if (data.accessToken) {
      useAuthStore.getState().setAccessToken(data.accessToken);
      return data.accessToken;
    }
  } catch (error) {
    if (error.response?.status !== 401) {
      // 401 만료 이외에 통신 자체 에러일 경우 에러표출
      console.error(error);
    }
    useAuthStore.getState().logout();
    return null;
  }
}

/**
 * 사용자 (user)에 관련된 정보를 이용한 api입니다.
 *
 */

// 인증이 필요한 요청 (헤더 정보 주입)
//const response = await marketApi.get('/protected-route', { requiresAuth: true });

// 인증이 필요하지 않은 요청
//const response = await marketApi.get('/public-route');

// hello + 사용자 이름 반환
export const getHello = async () => {
  return await marketApi.get(`/hello/test`);
};

// 받아온 회원이 입력한 정보로 회원가입
export const postAuthSignup = async ({ email, password, username }) => {
  const response = await marketApi.post("/auth/signup", {
    email,
    password,
    username
  });
  useAuthStore.getState().setAccessToken(response.data.accessToken);
  return response.data;
};

// 사용자가 입력한 정보로 로그인
export const postAuthLogin = async ({ email, password }) => {
  const response = await marketApi.post("/auth/login", {
    email,
    password
  });
  useAuthStore.getState().setAccessToken(response.data.accessToken);
  return response.data;
};
//
export const getUserMe = async () => {
  return await marketApi.get("/users/me", { requiresAuth: true });
};

// 유저 정보 업데이트
export const updateUser = async (data) => {
  return await marketApi.put("/users/update", data, { requiresAuth: true });
};

// 유저 비밀번호 변경
export const changePassword = async (pwData) => {
  return await marketApi.put("/users/change-password", pwData, {
    requiresAuth: true
  });
};

/**
 * 게시물 (post)에 관련된 정보를 이용한 api입니다.
 *
 */
// 새 게시물 등록
export const postPosts = async (postData) => {
  return await marketApi.post("/posts", postData, { requiresAuth: true });
};

// 검색 조건에 따라 게시물 가져오기

export const getPublishedPosts = ({
  page,
  limit,
  query,
  orderBy,
  direction
}) => {
  return marketApi.get("/posts/list", {
    params: {
      page,
      limit,
      query,
      orderBy,
      direction
    }
  });
};

// 게시물 상세 정보 가져오기
export const getPostById = (id) => {
  return marketApi.get(`/posts/${id}`);
};

// 특정 사용자의 게시물 목록 가져오기
export const getPostByUser = ({
  page,
  limit,
  query,
  orderBy,
  direction,
  userId
}) => {
  return marketApi.get(`/posts/${userId}/list`, {
    params: {
      page,
      limit,
      query,
      orderBy,
      direction
    }
  });
};

export default marketApi;
