import React, { Fragment } from 'react';
import { connect } from 'react-redux';


const Error = ({ error }) => (
  <Fragment>
    {error.message && <div className="alert alert-danger">{error.message}</div>}
  </Fragment>
);


export default connect(store => ({ error: store.error }))(Error);
