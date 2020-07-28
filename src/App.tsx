import React, { useState, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { State } from "./reducers";
import { fetchUsers, createUser } from "./actions";
import { User } from "./firestore";

type AppProps = {} & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const App: React.FC<AppProps> = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(20);

  useEffect(() => {
    props.dispatchFetchUsers();
  }, []);
  return (
    <div className="App">
      {props.isLoading && <div>Loading...</div>}
      <div>
        <h3>Add user</h3>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        Age:
        <input
          type="number"
          value={age}
          onChange={(event) => setAge(parseInt(event.target.value))}
        />
        <br />
        <button
          onClick={() => {
            setAge(20);
            setName("");
            props.dispatchCreateUser({ name, age });
          }}
        >
          送信
        </button>
      </div>
      <div>
        <h3>Users</h3>
        {props.isError && <div>{props.errorMessage}</div>}
        {props.users.map((user, index) => (
          <div key={index}>
            <div>{`${user.name} (${user.age}`})</div>
          </div>
        ))}
      </div>
    </div>
  );
};

function mapStateToProps(state: any): State {
  return {
    users: state.get("users"),
    isLoading: state.get("isLoading"),
    isError: state.get("isError"),
    errorMessage: state.get("errorMessage"),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    dispatchFetchUsers: () => dispatch(fetchUsers()),
    dispatchCreateUser: (user: User) => dispatch(createUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
