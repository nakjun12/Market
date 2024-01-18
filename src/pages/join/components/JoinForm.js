import { postAuthSignup } from "@/api/marketApi";
import { PASSWORD_REGEX } from "@/utils/constants/constants";
import useModalStore from "@/utils/hooks/store/useModalStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const JoinForm = () => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore();
  const { mutate, isPending } = useMutation({
    mutationFn: postAuthSignup,
    onSuccess: () => {
      openCustomPopup({ process: true });
    },
    onError: () => {
      openCustomPopup({ process: false });
    }
  });

  const openCustomPopup = ({ process }) => {
    const handleConfirm = () => {
      // 성공 실패시
      if (process) {
        navigate("/login");
      } else {
        closeModal();
      }
    };

    const customContent = (
      <>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            가입에 {process ? "성공" : "실패"} 했습니다.
          </h3>
          {process ? (
            <p className="py-4">
              확인 버튼 클릭으로 로그인 페이지로 이동합니다.
            </p>
          ) : (
            <p className="py-4">다시 시도해 주시기 바랍니다.</p>
          )}
          <div className="modal-action">
            <button className="btn" onClick={handleConfirm}>
              확인
            </button>
          </div>
        </div>
      </>
    );
    openModal(customContent); // 백드롭 클릭으로 팝업을 닫습니다.
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 로딩 중 얼리 리턴
    if (isPending) return;
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const username = formData.get("username");

    if (password !== confirmPassword) {
      return console.log("패스워드 틀림 모달 리턴");
    }

    mutate({ email, password, username });
  };

  return (
    <>
      <section className="bg-base-100 dark:bg-base-900 h-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-base-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                회원가입
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-base-900">
                    User name
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    placeholder="Brian"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-base-900">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-base-900 sm:text-sm rounded-lg block w-full p-2.5 "
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-base-900">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    title="비밀번호는 6~12자리여야 하며, 최소 하나의 숫자, 영문자, !,@,#를 포함해야 합니다."
                    placeholder="••••••••"
                    pattern={PASSWORD_REGEX}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-base-900">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    title="비밀번호는 6~12자리여야 하며, 최소 하나의 숫자, 영문자, !,@,#를 포함해야 합니다."
                    placeholder="••••••••"
                    pattern={PASSWORD_REGEX}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-gray-700 bg-base-300 hover:bg-base-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  {isPending ? (
                    <span className="loading loading-dots loading-xs" />
                  ) : (
                    "가입하기"
                  )}
                </button>
                <div className="flex gap-2">
                  <p className="text-sm font-light text-base-500">
                    이미 회원 가입하셨나요?
                  </p>
                  <div
                    onClick={() => navigate("/login")}
                    className="text-blue-500 font-black hover:underline">
                    Login here
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
