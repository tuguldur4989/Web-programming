import React from 'react';
import {Link} from 'react-router-dom'
import {
  Typography
} from '@material-ui/core';
import './userDetail.css';


/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = undefined
  }
   componentDidMount () {
    fetch(`/user/${this.props.match.params.userId}`).then(response => response.json()).then(data => {
      this.setState({ ...data })
      this.props.setData(this.props.match.path,data.first_name)
    });
    fetch(`/photosOfUser/${this.props.match.params.userId}`).then(response => response.json()).then(data => {
      this.setState({ photos:data })
    });
  }

  componentDidUpdate(prevprop) {
    if (prevprop.match.params.userId !== this.props.match.params.userId) {
     fetch(`/user/${this.props.match.params.userId}`).then(response => response.json()).then(data => {
      this.setState({ ...data })
      this.props.setData(this.props.match.path,data.first_name)
    });
    fetch(`/photosOfUser/${this.props.match.params.userId}`).then(response => response.json()).then(data => {
      this.setState({ photos:data })
    });
    }
  }
  render() {
    return (
      <div className="userDetail">
        {
          this.state ? (
            <React.Fragment>
              <div>
                {
                  this.state.photos?<img src={`images/${this.state.photos[0].file_name}`} alt=""/>:""
                }
        
        </div>
        <div>
        <Typography variant="h2">{`${this.state.first_name} ${this.state.last_name}`}</Typography>
        <Typography variant="h6">
          <b>Bio</b>:{this.state.description}
        </Typography>
        <Typography variant="h6">
          <b>Current city</b>:{this.state.location}
        </Typography>
        <Typography variant="h6">
         <b>Occupation</b>:{this.state.occupation}
          </Typography>
          <Link to={`/photos/${this.state._id}`}>
            <Typography variant="button">See Photos of {this.state.first_name}</Typography>
          </Link>
              </div>
              </React.Fragment>
          ):""
        }
      </div>
    );
  }
}

export default UserDetail;
