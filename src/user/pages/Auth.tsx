import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { HTTP_METHODS, useFetch } from "../../shared/hooks/UseFetch";
import { getEndPoint, UserAPIs } from "../../api/api";

enum AppState {
  SIGN_UP = "Sign up",
  LOGIN = "Login"
}

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {fetchData, isLoading, error, clearError} = useFetch();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (isLoginMode) {
     
      const user = await fetchData(
        getEndPoint + UserAPIs.LoginUser,
          HTTP_METHODS.POST,
          {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          },
        );
        if(user?.hasOwnProperty("_id")) {
          auth.login();
        }
    } else {
      
        const user = await fetchData(
          getEndPoint + UserAPIs.SignUpUser, 
          HTTP_METHODS.POST, 
          {
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          });
        
        if(user?.hasOwnProperty("_id")) {
          auth.login();
        }
    }
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        <h2>Login Required</h2>
        <hr />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
            )}
            <Input
              element="input"
              id="email"
              type="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid password, at least 5 characters."
              onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? AppState.LOGIN : AppState.SIGN_UP}
            </Button>
          </form>
        )}
        <Button inverse onClick={switchModeHandler} disabled={isLoading}>
          Switch to {isLoginMode ? AppState.SIGN_UP :  AppState.LOGIN}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
