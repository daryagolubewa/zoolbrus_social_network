import React, { Component } from 'react';
import './profile-page.css';
import {
  Button,
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl
} from 'react-bootstrap';
import Type from 'prop-types';
import { selectLoginUser } from '../../redux/selectors/login-selectors';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import {
  postLoginStartAC,
  postLoginSuccessAC,
  postLoginErrorAC
} from '../../redux/actions/login-actions';


const mapStateToProps = state => ({
  login: selectLoginUser(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  doRoute: push,
  postLoginStart: postLoginStartAC,
  postLoginSuccess: postLoginSuccessAC,
  postLoginError: postLoginErrorAC
}, dispatch);

function FieldGroup({
  id, label, help, ...props
}) {
  return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
  );
}


class ChangeProfile extends Component {
  static propTypes = {
    discription: Type.string,
    company: Type.string,
    links: Type.array
  };

  state = {
    discription: this.props.discription,
    company: this.props.company
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    console.log('111111111111111111111111', this.props);
    
  }
  changeProfile = async () => {
    const {
      discription,
      company
    } = this.state;
    console.log(this.props);
    
    let res = await fetch('/api/profile/change', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        id: this.props.login._id,
        discription,
        company
      })
    });
    res = await res.json();
    this.setState({ company: res.company, discription: res.discription });
  }

  render() {
    return (
      <div>
        <FieldGroup
        id="formControlsFile"
        type="file"
        label="Аватарка"
        help="Выберите аватарку"
        />

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Места работы</ControlLabel>
          <FormControl
          componentClass="textarea"
          placeholder="Введите ваши места работы"
          defaultValue={ this.state.company }
          name="company"
          onChange={ this.handleChange }
          />
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>О себе</ControlLabel>
          <FormControl
          componentClass="textarea"
          placeholder="Введите информацию о себе"
          defaultValue={this.state.discription}
          name="discription"
          onChange={ this.handleChange } 
          rows="10"
          />
        </FormGroup>

        <Button
        type="submit"
        onClick={ () => {
          this.changeProfile();
          this.props.show();
          this.props.changeCompany(this.state.company);
          this.props.changeDiscription(this.state.discription);
        }
        }>
          Сохранить изменения
        </Button>
      </div>
    );
  }
}

const ChangeProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeProfile);
export default ChangeProfilePage;
