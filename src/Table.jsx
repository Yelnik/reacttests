class Table extends React.Component {
    constructor(props) {
      super(props);
      this.state = { tableData: [], datAmt: props.dataNum || "10" };
  
      this.refreshResults = this.refreshResults.bind(this);
    }
  
    async componentDidMount() {
      var response = await fetch(
        "https://randomuser.me/api/?results=" + this.state.datAmt
      );
  
      var data = await response.json();
      await this.setState({ tableData: data.results });
  
      console.log(this.state.tableData[0]);
    }
  
    rowClick(id) {
        let list = this.state.tableData.slice();
        let personObj = list.find(person => person.cell == id);
        personObj.name.first = "Rick";
        this.setState({ tableData: list });
        console.log(personObj);
    }
  
    async refreshResults(amount) {
      var response = await fetch("https://randomuser.me/api/?results=" + amount);
      var data = await response.json();
      await this.setState({ tableData: data.results });
    }
  
    render() {
      const { tableData } = this.state;
  
      return (
        <div id="tableDiv">
          <EditFIeld onclick={this.refreshResults} dataNum={this.state.datAmt} />
          <table
            className="table table-dark table-striped text-center"
            id="empTbl"
          >
            <thead>
              <tr>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">DOB</th>
                <th scope="col">Location</th>
                <th scope="col">Cell</th>
                <th scope="col">Gender</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(person => (
                <tr key={person.cell} onClick={ () => this.rowClick(person.cell)}>
                  <td>{person.name.first}</td>
                  <td>{person.name.last}</td>
                  <td>{person.dob.date}</td>
                  <td>{person.location.city + ", " + person.location.state}</td>
                  <td>{person.cell}</td>
                  <td>{person.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  