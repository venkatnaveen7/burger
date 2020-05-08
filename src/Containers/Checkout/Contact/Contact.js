import React, { Component } from "react";
import Button from "../../../Components/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../UI/Spinner/Spinner";
import classes from "./Contact.module.css";
import MyInput from "../../../UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/WithError/WithError";
import * as actionTypes from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    isUserFormValid: false,
    userForm: {
      name: {
        value: "",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Your name"
        },
        valid: false,
        touched: false,
        validations: {
          required: true
        }
      },
      mobileNumber: {
        value: "",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Your Mobile Number"
        },
        valid: false,
        touched: false,
        validations: {
          required: true,
          absoluteLength: 11
        }
      },
      address: {
        value: "",
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "Enter Your Address"
        },
        valid: false,
        touched: false,
        validations: {
          required: true,
          minLength: 20
        }
      },
      city: {
        value: "",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter City Name"
        },
        valid: false,
        touched: false,
        validations: {
          required: true,
          minLength: 3
        }
      },
      email: {
        value: "",
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter Your Email"
        },
        valid: false,
        touched: false,
        validations: {
          required: true
        }
      },
      deliveryType: {
        value: "Normal",
        elementType: "select",
        elementConfig: {
          options: [
            { value: "Fastest", type: "Fast" },
            { value: "Normal", type: "Normal" },
            { value: "Hurry", type: "Im Hungry Now..!" }
          ]
        },
        valid: true
      }
    }
  };

  orderHandler = e => {
    e.preventDefault();
    console.log(this.props.ingredients);
    const formData = {};
    for (let element in this.state.userForm) {
      formData[element] = this.state.userForm[element].value;
    }

    //this.setState({ loading: true });
    const orderData = {
      /* customeDetails: {
        name: "Raghu",
        mobilenum: "12346987",
        address: { DNO: " 11 -87", city: "Hyderabad" },
        email: "Data@data.com"
      } */
      customerDetails: formData,
      burgerDetails: {
        ingredients: this.props.ingredients
      },
      price: this.props.price
    };

    this.props.purchaseBurger(orderData);

    /*  axios
      .post("orders.json", orderData)
      .then(response => {
        console.log("Order Saved", response);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        console.log("Order Failed", error);
        this.setState({ loading: false });
      }); */
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

  inputChangeHandler = (event, elementId) => {
    const form = { ...this.state.userForm };
    const valueToUpdate = event.target.value;
    const updatedFormElement = { ...form[elementId] };
    updatedFormElement.touched = true;
    updatedFormElement.value = valueToUpdate;
    updatedFormElement.valid = this.checkValidation(
      updatedFormElement.value,
      updatedFormElement.validations
    );
    form[elementId] = updatedFormElement;

    let isFormValid = true;
    for (let el in form) {
      isFormValid = isFormValid && form[el].valid;
    }

    this.setState({ userForm: form, isUserFormValid: isFormValid });
  };

  render() {
    let formElementsArray = [];
    for (let formEl in this.state.userForm) {
      formElementsArray.push({
        id: formEl,
        config: { ...this.state.userForm[formEl] }
      });
    }

    let myform = (
      <form className={classes.ContactData} onSubmit={this.orderHandler}>
        {formElementsArray.map(el => (
          <MyInput
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            invalid={!el.config.valid}
            touched={el.config.touched}
            validations={el.config.validations}
            changed={event => this.inputChangeHandler(event, el.id)}
          />
        ))}

        <Button
          btnType="Success"
          disable={
            !this.state.isUserFormValid
          } /*  clicked={this.orderHandler} */
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      myform = <Spinner></Spinner>;
    }
    return <div>{myform}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.orders.loading
  };
};

const mapDispatcherToActions = dispatch => {
  return {
    purchaseBurger: orderData =>
      dispatch(actionTypes.startBurgerPurchase(orderData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatcherToActions
)(withErrorHandler(ContactData, axios));
