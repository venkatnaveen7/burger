import React, { Component } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../Components/Button/Button";
import cssClasses from "./Auth.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import RingaRinga from "../../UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  componentDidMount() {
    if (!this.props.buildingBurger) this.props.setAuthRedirectPath("/");
  }

  state = {
    isSignIn: true,
    isUserFormValid: false,
    authForm: {
      userName: {
        value: "",
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter Your Login ID"
        },
        valid: false,
        touched: false,
        validations: {
          required: true,
          minLength: 5
        }
      },
      password: {
        value: "",
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter Your Password"
        },
        valid: false,
        touched: false,
        validations: {
          required: true,
          minLength: 8
        }
      }
    }
  };
  checkValidation(value, rules) {
    if (rules == undefined) return true;
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() != "";
    }

    if (rules.absoluteLength) {
      isValid = value.trim().length == rules.absoluteLength;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength;
    }

    return isValid;
  }

  inputChangeHandler = (event, id) => {
    const form = { ...this.state.authForm };
    const elementToUpdate = this.state.authForm[id];
    elementToUpdate.value = event.target.value;
    elementToUpdate.touched = true;
    elementToUpdate.valid = this.checkValidation(
      elementToUpdate.value,
      elementToUpdate.validations
    );
    form[id] = elementToUpdate;
    let isFormValid = true;
    for (let el in form) {
      isFormValid = isFormValid && form[el].valid;
    }
    this.setState({ authForm: form, isUserFormValid: isFormValid });
  };

  loginFormSubmited = event => {
    event.preventDefault();
    this.props.authenticate(
      this.state.authForm.userName.value,
      this.state.authForm.password.value,
      this.state.isSignIn
    );
  };

  signInHandler = () => {
    this.setState(prevState => {
      return {
        isSignIn: !prevState.isSignIn
      };
    });
  };

  render() {
    const configArray = [];
    for (let key in this.state.authForm) {
      configArray.push({
        id: key,
        config: { ...this.state.authForm[key] }
      });
    }
    const formElements = configArray.map(el => {
      return (
        <Input
          key={el.id}
          elementType={el.config.elementType}
          value={el.config.value}
          invalid={!el.config.valid}
          touched={el.config.touched}
          validations={el.config.validations}
          changed={event => this.inputChangeHandler(event, el.id)}
          elementConfig={el.config.elementConfig}
        ></Input>
      );
    });

    let redirect;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to={this.props.authRedirectPath} />;
    }

    let formData = (
      <div className={cssClasses.Auth}>
        {redirect}
        <span
          style={{
            color: "green",
            fontSize: "larger",
            fontFamily: " auto",
            fontStyle: "inherit"
          }}
        >
          {this.state.isSignIn
            ? "You are Logging In"
            : "You are Registering new User"}
        </span>

        <form onSubmit={this.loginFormSubmited}>
          {formElements}

          <span
            style={{
              color: "red",
              fontSize: "larger",
              fontFamily: " auto",
              fontStyle: "inherit"
            }}
          >
            {this.props.error}
          </span>
          <br />
          <Button disable={!this.state.isUserFormValid} btnType="Success">
            {this.state.isSignIn ? "LOGIN " : "REGISTER "}
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.signInHandler}>
          {/* Switch to{" "} */}
          {this.state.isSignIn
            ? "Dont have Account ? Register "
            : "Already Have Account?  Login"}
        </Button>
      </div>
    );
    if (this.props.loading) {
      formData = <RingaRinga></RingaRinga>;
    }

    return formData;
  }
}
const mapPropsToDispatch = dispatch => {
  return {
    authenticate: (un, pwd, isSignIn) =>
      dispatch(actions.authenticate(un, pwd, isSignIn)),
    setAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

const mapPropsToState = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null,
    buildingBurger: state.burgerBuilder.buildingBurger,
    authRedirectPath: state.auth.authRedirectPath
  };
};

export default connect(
  mapPropsToState,
  mapPropsToDispatch
)(Auth);
