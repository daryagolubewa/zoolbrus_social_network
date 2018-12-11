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


export default class FormProfilePage extends Component {
    static propTypes = {
      discription: Type.string,
      work: Type.string,
      links: Type.array
    };

    state = {
      work: 'FaceBook'
    }

    render() {
      const {
        discription,
        work
      } = this.props;
      return (
            <form>
                <FieldGroup
                    id="formControlsFile"
                    type="file"
                    label="Аватарка"
                    help="Выберите аватарку"
                />

                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Места работы</ControlLabel>
                    <FormControl componentClass="textarea"
                    placeholder="Введите ваши места работы"
                    defaultValue={work}
                    // onChange={ (e)=>{ this.setState({work: e.target.value }) }}
                    />
                </FormGroup>

                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>О себе</ControlLabel>
                    <FormControl componentClass="textarea"
                    placeholder="Введите информацию о себе"
                    defaultValue={discription}/>
                </FormGroup>

                <Button type="submit">Сохранить изменения</Button>
            </form>
      );
    }
}
