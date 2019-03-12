import React, { useState } from "react";

class EditField extends React.Component {
    constructor(props) {
      super(props);
      this.state = { dataNum: props.dataNum };
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
      // if (e.target.value >>> 0 !== parseFloat(e.target.value)) {
      //   e.target.value = e.target.value.slice(0, -1);
      //   return;
      // }
  
      // if (e.target.value === null) {
      //   e.target.value = "";
      //   return;
      // }
  
      this.setState({ dataNum: e.target.value });
    }
  
    render() {
      return (
        <div>
          <form>
            <div className="form-group">
              <label htmlFor="inputDataNum">Entries in table</label>
              <input
                type="number"
                className="form-control"
                id="inputDataNum"
                aria-describedby="dataHelp"
                onChange={this.handleChange}
                placeholder="10"
              />
              <small id="dataHelp" className="form-text text-muted">
                Change amount of entries in table
              </small>
            </div>
          </form>
          <button
            id="refreshBtn"
            type="button"
            className="btn btn-success"
            onClick={() => this.props.onclick(this.state.dataNum)}
          >
            Refresh
          </button>
        </div>
      );
    }
  }

  export default EditField;