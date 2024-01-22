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
    // 401 오류 발생 시 (토큰 만료 등) 한 번만 재시도
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await marketApi.post("/auth/refresh-token"); // 리프레시 토큰으로 새 액세스 토큰 요청
        useAuthStore.getState().setAccessToken(data.accessToken); // 새 토큰을 스토어에 저장
        return marketApi(originalRequest); // 원래 요청 재실행
      } catch (refreshError) {
        return Promise.reject(refreshError); // 리프레시 토큰 요청 오류 처리
      }
    }
    return Promise.reject(error); // 기타 응답 오류 처리
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

//
export const getUsersMe = async () => {
  return await marketApi.get("/users/me", { requiresAuth: true });
};

// 유저 정보 업데이트
export const updateUser = (name) => {
  return marketApi.put("/users/update", name);
};

// 유저 비밀번호 변경
export const changePassword = (pwData) => {
  return marketApi.put("/users/change-password", pwData);
};

/**
 * 게시물 (post)에 관련된 정보를 이용한 api입니다.
 *
 */
// 새 게시물 등록
export const postPosts = (postData) => {
  return marketApi.post("/posts", postData);
};

// 검색 조건에 따라 게시물 가져오기
export const getPublishedPosts = (page, limit, query, orderBy, direction) => {
  return postsApi.get("/posts/published", {
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
