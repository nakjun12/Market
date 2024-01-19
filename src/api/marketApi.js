import axios from "axios";

const baseURL = "https://pinemarket.cielui.com";

const marketApi = axios.create({
  baseURL,
  withCredentials: true
});

/**
 * 사용자 (user)에 관련된 정보를 이용한 api입니다.
 *
 */
// hello + 사용자 이름 반환
export const getHello = () => {
  return marketApi.get(`/hello/test`);
};

// 받아온 회원이 입력한 정보로 회원가입
export const postAuthSignup = ({ email, password, username }) => {
  const response = marketApi.post("/auth/signup", {
    email,
    password,
    username
  });
  return response.data;
};

// 사용자가 입력한 정보로 로그인
export const postAuthLogin = ({ email, password }) => {
  const response = marketApi.post("/auth/login", {
    email,
    password
  });
  console.log("response", response);
  return response.data;
};

// 토큰 리프레쉬
export const postRefreshToken = () => {
  return marketApi.post("/auth/refresh-token");
};

//
export const getAuthProfile = () => {
  return marketApi.get("/auth/profile");
};

//
export const getUsersMe = () => {
  return marketApi.get("/users/me");
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
