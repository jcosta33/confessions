import React from 'react';
import { connect } from "react-redux";
import { addUser } from "../actions/userActions";
import {
  Button,
  Form,
  FormGroup,
  Label,
  CustomInput,
  FormText,
  FormFeedback,
  Input
} from 'reactstrap';


type IFormProps = {
  addUser: Function;
  handleForm: Function;
}

type IFormState = {
  name: string;
  sin: string;
  deed: string;
  dateOfBirth: string;
  userTooYoung: boolean;
  file?: File;
  formReady: boolean;
}

export class UserForm extends React.Component<IFormProps, IFormState> {

  constructor(props: IFormProps) {

    super(props);

    this.state = {
      name: '',
      dateOfBirth: '',
      sin: 'Lust',
      deed: '',
      userTooYoung: false,
      formReady: false
    }

    this.ageInput = React.createRef();
  }

  private ageInput: React.RefObject<HTMLInputElement>;

  public render(): React.ReactElement<any> {

    let birthdayProps: any = {
      invalid: false
    }

    let submitProps: any = {
      disabled: true
    }

    if (this.state.dateOfBirth !== '') {

      birthdayProps.invalid = this.state.userTooYoung;

    }

    if (!this.state.userTooYoung && this.state.formReady) {

      submitProps.disabled = false;

    }

    return (
      <Form onSubmit={this.onSubmit.bind(this)}>
        <h3>Enter new confession</h3>
        <FormGroup>
          <Label>Sinner name</Label>
          <Input
            type="text"
            placeholder='Christopher McChristian'
            name="name"
            onChange={this.onChange.bind(this)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Date of Birth</Label>
          <Input
            {...birthdayProps}
            ref={this.ageInput}
            type="date"
            placeholder='Christopher McChristian'
            name="dateOfBirth"
            onChange={this.onChange.bind(this)}
          />

          {this.state.userTooYoung ?
            <FormFeedback>Oh noes! Too young for redemption</FormFeedback>
            :
            <FormText>Must be over 18</FormText>
          }
        </FormGroup>

        <FormGroup>
          <Label>Select a sin</Label>
          <Input defaultValue="Lust" type="select" name="sin" onChange={this.onChange.bind(this)}>
            <option>Lust</option>
            <option>Gluttony</option>
            <option>Greed</option>
            <option>Sloth</option>
            <option>Wrath</option>
            <option>Envy</option>
            <option>Pride</option>
            <option>Other</option>
          </Input>

        </FormGroup>
        <FormGroup>
          <Label>Describe deed</Label>
          <Input
            type="textarea"
            name="deed"
            onChange={this.onChange.bind(this)}
            placeholder={'Marital infidelity of a ghastly sort...'}
          />
        </FormGroup>

        <FormGroup>
          <Label>Upload a file unto the Lord</Label>
          <CustomInput id="file" type="file" name="file" onChange={this.onChange.bind(this)} />
        </FormGroup>

        <FormGroup>
          <Button {...submitProps} color="primary" type="submit">New confession</Button>
        </FormGroup>
      </Form>
    );

  }

  private onSubmit(e: any) {

    e.preventDefault();

    const user = {
      name: this.state.name,
      dateOfBirth: this.state.dateOfBirth,
      sin: this.state.sin,
      deed: this.state.deed,
      file: this.state.file
    }

    this.props.addUser(user);
    this.props.handleForm();

  }


  private onChange(e: any) {

    const currentState = this.state as IFormState;
    let newState;

    if (e.target.name === 'file') {

      newState = {
        [e.target.name]: e.target.files[0],
        formReady: true
      }

    } else if (e.target.name === 'dateOfBirth') {

      newState = {
        [e.target.name]: e.target.value,
        userTooYoung: this.invalidAge(e.target.value),
        formReady: true
      }

    } else {

      newState = {
        [e.target.name]: e.target.value,
        formReady: true
      }

    }

    let key: keyof typeof currentState;

    /* 
      Check if all state information is set (except file, which is optional)
    */
    for (key in this.state) {
      // check also if property is not inherited from prototype
      if (this.state.hasOwnProperty(key) && (this.state[key] === '')) {
        newState.formReady = false;
      }
    }

    this.setState({
      ...currentState, ...newState
    });

  }

  private invalidAge(dateString: string) {

    const today = new Date();
    const birthDate = new Date(dateString);
    const m = today.getMonth() - birthDate.getMonth();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age < 18;

  }

}

const mapStateToProps = (state: any) => ({
  name: state.name
});

export default connect(mapStateToProps, { addUser })(UserForm);
