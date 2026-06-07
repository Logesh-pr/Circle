import { useEffect, useRef, useState } from "react";

//react hook form
import { useForm } from "react-hook-form";

//components
import FormField from "../components/ui/FormField";

//react query
import { useCheckUsername, useSetUsername } from "../hooks/useAuthQuery";

//Zustand
import { useTempUserStore } from "../store/useAuthStore";

//icons
import { CircleCheck, CircleX } from "lucide-react";

//react router
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export default function UsernameSelection() {
  const { mutate: checkUsernameMutate, isPending: isCheckUsernamePending } =
    useCheckUsername();
  const { mutate: setUsernameMutate, isPending: isSetUsernamePending } =
    useSetUsername();
  const tempUsername = useTempUserStore((state) => state.tempUsername);
  const debounceRef = useRef(null);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const navigate = useNavigate();

  const icons = {
    iconSuccess: <CircleCheck className="text-green-500" />,
    iconError: <CircleX className="text-red-500" />,
  };
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,

    formState: { errors },
  } = useForm({ defaultValues: { username: tempUsername }, mode: "onChange" });

  const username = watch("username");

  useEffect(() => {
    if (!username || username.length < 5) {
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      setUsernameAvailable(false);
      return;
    }

    clearErrors("username");

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      checkUsernameMutate(
        { username },
        {
          onSuccess: (data) => {
            if (data.status === 200) {
              setUsernameAvailable(true);
              clearErrors("username");
            }
          },
          onError: (err) => {
            setUsernameAvailable(false);
            if (err.response.data.message === "username is already taken") {
              setError("username", {
                type: "manual",
                message: err.response.data.message,
              });
            } else {
              setError("common", {
                type: "manual",
                message: "something went wrong, Try signup again",
              });
            }
          },
        },
      );
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [username]);

  function onSubmit(data) {
    setUsernameMutate(data, {
      onSuccess: (data) => {
        navigate("/", { replace: true });
      },
      onError: (err) => {
        navigate("/auth/signup", { replace: true });
      },
    });
  }
  return (
    <>
      <div className=" ">
        <h5 className="text-xl font-bold text-light-primary dark:text-dark-primary ">
          Choose your username
        </h5>
        <p className="mt-2 text-sm text-light-secondary dark:text-dark-secondary font-semibold">
          This is how others will find you. You can always change it later.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <fieldset>
            <FormField
              label="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              errors={errors}
              error={errors.username}
              register={register}
              disabled={isSetUsernamePending}
              showValidation={true}
              isChecking={isCheckUsernamePending}
              showIcons={true}
              icons={icons}
              usernameAvailable={usernameAvailable}
              validation={{
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Must be at least 5 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Must be at most 15 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: "Only letters, numbers, and underscores allowed",
                },
                setValueAs: (value) => (value || "").toLowerCase().trim(),
              }}
            />
          </fieldset>

          <p className="text-sm font-semibold text-light-secondary dark:text-dark-secondary">
            Lowercase letters, numbers, and underscores only. Min 3 characters.
          </p>

          <Button
            value={"Finish setup"}
            disabled={
              !usernameAvailable ||
              isSetUsernamePending ||
              isCheckUsernamePending ||
              !!errors.username
            }
            btnLogic={
              !usernameAvailable ||
              isSetUsernamePending ||
              isCheckUsernamePending ||
              errors.username
            }
          />

          {/* <input
            className={`mt-6 w-full  rounded-lg py-2 font-semibold  ${!usernameAvailable || isSetUsernamePending || isCheckUsernamePending || errors.username ? "bg-accent/50 cursor-not-allowed" : "bg-accent hover:bg-accent/80 cursor-pointer"}`}
            type="submit"
            disabled={
              !usernameAvailable ||
              isSetUsernamePending ||
              isCheckUsernamePending ||
              !!errors.username
            }
            value={"Finish setup"}
          /> */}
        </form>
      </div>
    </>
  );
}
