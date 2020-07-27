import React, { useState, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { State } from "./reducers";
import { fetchUsers, createUser } from "./actions";

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
      {props.isLoading && <div>Loading</div>}
      {props.isError && <div>{props.errorMessage}</div>}

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
        {props.users.map((user, index) => (
          <div key={index}>
            <div>{`${user.name} (${user.age}`})</div>
          </div>
        ))}
      </div>
    </div>
  );
};

function mapStateToProps(state: State) {
  return {
    users: state.users,
    isLoading: state.isLoading,
    isError: state.isError,
    errorMessage: state.errorMessage,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    dispatchFetchUsers: () => dispatch(fetchUsers()),
    dispatchCreateUser: (user: any) => dispatch(createUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
