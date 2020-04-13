import React, { Component } from "react";
import Aux from "../Auxilary/Auxilary";
import Modal from "../../UI/Modal/Modal";

const withError = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInter = axios.interceptors.request.use(
        req => {
          this.setState({ error: null });
          return req;
        },
        error => {
          this.setState({ error: error });
        }
      );

      this.respInter = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      console.log(
        "With Error COmpo  COmp will unmount",
        this.reqInter,
        this.respInter
      );
      axios.interceptors.request.eject(this.reqInter);
      axios.interceptors.response.eject(this.respInter);
    }

    modalCloseCallBack = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClose={this.modalCloseCallBack}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}></WrappedComponent>
        </Aux>
      );
    }
  };
};

export default withError;
