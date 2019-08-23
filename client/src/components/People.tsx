import React from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardSubtitle,
  Button
} from 'reactstrap';

import { connect } from "react-redux";
import { getUsers, deleteUser, addUser } from "../actions/userActions";

type INavState = {
  users: IUser[];
}

type IUser = {
  _id: string;
  name: string;
}

type IPeopleProps = {
  deleteUser: Function;
  getUsers: Function;
  user: any;
}

export class People extends React.Component<IPeopleProps, INavState> {

  static state: INavState;

  public componentDidMount() {
    this.props.getUsers();
  }

  public render(): React.ReactElement<any> {

    const { users } = this.props.user;

    const noConfessions = users.length === 0;

    return (
      <>
        <h2 style={{ textAlign: "center", margin: "40px 0", color: "#e1e1e1" }}>Confessions</h2>

        {noConfessions ?
          <p style={{ color: "#ccc", textAlign: "center" }}>No confessions registered.</p>
          :
          users.map((user: any) => {

            const date = new Date(user.date);
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();

            return (
              <Card key={user._id} style={{ margin: "20px 0" }}>
                <CardBody>
                  <CardTitle>
                    {user.name}
                  </CardTitle>

                  <CardSubtitle>
                    {user.sin}
                  </CardSubtitle>

                  <CardText style={{ margin: 0 }}>
                    {user.deed}
                    <br />
                    <small>{`${day}/${month}/${year}`}
                    </small>

                  </CardText>
                  {user.file &&
                    <a
                      href={`http://localhost:5000/files/${user._id}/${user.file}`}
                      style={{ display: "block", fontSize: "12px", margin: "20px 0 0" }}
                      download
                    >

                      <i className="fa fa-file" />
                      {` ${user.file}`}

                    </a>
                  }
                  <Button
                    outline
                    type="button"
                    color="danger"
                    className="float-right"
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                    onClick={this.delete.bind(this, user._id)}
                  >
                    <i className="fa fa-trash"></i>

                  </Button>
                </CardBody>
              </Card>
            )
          }
          )}
      </>
    );

  }

  public delete(_id: string) {
    this.props.deleteUser(_id);
  }
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps, { getUsers, deleteUser, addUser })(People);

