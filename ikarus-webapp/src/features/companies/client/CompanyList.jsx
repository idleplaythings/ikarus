window.CompanyList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const companies = Meteor.subscribe('Companies');

    return {
      ready: companies.ready(),
      companies: Company.getAll()
    };
  },

  render() {
    const {companies} = this.data;

    if (!companies.length) {
      return (
        <p>No companies found.</p>
      );
    }

    return (
      <div>
        <h2>Companies ({companies.length})</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Players</th>
              <th>Renown</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(company =>
              <tr key={company._id}>
                <td><a href={Router.path('company', company)}>{company.name}</a></td>
                <td>{company.playerCount()}</td>
                <td>{company.getRenown()}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
});