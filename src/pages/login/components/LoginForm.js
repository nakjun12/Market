import { postAuthLogin } from "@/api/marketApi";
import { PASSWORD_REGEX } from "@/utils/constants/constants";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: postAuthLogin,
    onSuccess: () => {
      // 모달 / 로딩처리
    },
    onError: () => {
      // 모달 / 로딩처리
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 로딩 중 얼리 리턴
    if (isPending) return;
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    mutate({ email, password });
  };

  return (
    <div>
      <section className="bg-base-50 dark:bg-base-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-base-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                로그인
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                    title="비밀번호는 6~12자리여야 하며, 최소 하나의 숫자, 영문자, 특수문자를 포함해야 합니다."
                    placeholder="••••••••"
                    pattern={PASSWORD_REGEX}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-gray-700 bg-base-300 hover:bg-base-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  로그인
                </button>
                <div className="flex gap-2">
                  <p className="text-sm font-light text-base-500">
                    가입이 필요하신가요?
                  </p>
                  <div
                    onClick={() => navigate("/join")}
                    className="text-blue-500 font-black hover:underline">
                    Join here
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
