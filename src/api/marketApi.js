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
    console.log("accessToken", accessToken);
    console.log("config.requiresAuth", config.requiresAuth);
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
    const originalRequest = error.config;
    // 리프레시 토큰 요청에서의 401 오류인지 확인
    const isRefreshTokenRequest = originalRequest.url === "/auth/refresh-token";

    // 401 인증에러 + 재요청이 아닐때 + refreshToken에 대한 요청이 아닐 떄
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isRefreshTokenRequest
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await marketApi.post("/auth/refresh-token");
        useAuthStore.getState().setAccessToken(data.accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return marketApi(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰 요청 실패 시 로그아웃 처리
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

/**
 * 사용자 (user)에 관련된 정보를 이용한 api입니다.
 *
 */

// 인증이 필요한 요청
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

// 토큰 리프레쉬 (cookie의 refresh토큰 사용 없을 경우 401에러) 삭제예정
export const postRefreshToken = async () => {
  const response = marketApi.post("/auth/refresh-token");
  useAuthStore.getState().setAccessToken(response.data.accessToken);
  return await response.data;
};

//
export const getAuthProfile = async () => {
  return await marketApi.get("/auth/profile", { requiresAuth: true });
};

//내 정보 가져오기
export const getUsersMe = async () => {
  return await marketApi.get("/users/me", { requiresAuth: true });
};

// 유저 정보 업데이트
export const updateUser = async (name) => {
  return await marketApi.put("/users/update", name, { requiresAuth: true });
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
  return marketApi.get("/posts/published", {
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
export const getPostByUser = (userId) => {
  return marketApi.get(`/posts/${userId}/posts`);
};

export default marketApi;
