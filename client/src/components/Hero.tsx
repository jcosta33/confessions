import React from 'react';
import {
  Container,
  Button,
  Modal,
  ModalBody,
} from 'reactstrap';

import Form from './Form';

export interface INavState {
  isConfessing: boolean;
}

export default class hero extends React.Component<{}, INavState> {

  constructor() {

    super({});

    this.state = {
      isConfessing: false
    }

  }

  static state: INavState;

  public render(): React.ReactElement<any> {

    return (
      <>
        <section className="hero">

          <Container>
            <h1 style={{ color: "#fff" }}>Let Jesus into your life</h1>
            <span style={{ display: "block", fontWeight: 300, fontSize: "20px", marginBottom: "20px", color: "#fff" }}>
              Register the deeds of sinners
              <br />Judge with the Holy Spirit
              <br />Get a discount on our prayer generator
            </span>
            <Button type="button" color="secondary" style={{ cursor: "pointer" }} onClick={this.handleForm.bind(this)}>New confession</Button>
          </Container>

        </section>

        <Modal isOpen={this.state.isConfessing} toggle={this.handleForm.bind(this)}>
          <ModalBody>
            <Form handleForm={this.handleForm.bind(this)} />
          </ModalBody>
        </Modal>

      </>
    );

  }

  private handleForm() {
    this.setState(
      (prevState) => ({
        isConfessing: !prevState.isConfessing
      })
    )
  }

}


