import React from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form';
import validate from './validation';

import './MyForm.css'

const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderHobbies = ({fields, meta: {error}}) => (
  <ul>
    <li className={'list-item'}>
      <button className={'addHobbyBtn'} type="button" onClick={() => fields.length < 5 && fields.push()}>+ hobby
      </button>
    </li>
    {fields.map((hobby, index) => (
      <div key={index} className={'divItems'}>
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`hobby #${index + 1}`}
        />
        <button
          className={'removeBtn'}
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
        >- hobby
        </button>
      </div>
    ))}
    {error && <li className="error list-item">{error}</li>}
  </ul>
);

const renderUsers = ({fields, meta: {touched, error, submitFailed}}) => (
  <ul>
    <li className={'list-item'}>
      <button className={'addUserBtn'} type="button" onClick={() => fields.push({})}>Add User</button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((user, index) => {
      return (
        <div key={index} className={'list-item'}>
          <h4>User #{index + 1}</h4>
          <div className={'divItems'}>
            <Field
              name={`${user}.name`}
              type="text"
              component={renderField}
              label="Name"
            />
            {error && error[`${user}.name`]}
            <button
              className={'removeBtn'}
              type="button"
              title="Remove User"
              onClick={() => fields.remove(index)}
            >delete
            </button>
          </div>
          <FieldArray name={`${user}.hobbies`} component={renderHobbies}/>
        </div>
      )
    })}
  </ul>
);

const MyForm = ({handleSubmit, pristine, reset, submitting}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="users" component={renderUsers}/>
      <div>
        <button className={'submitBtn'} type="submit" disabled={submitting}>Submit</button>
        <button className={'clearBtn'} type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Form
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'MyForm',
  validate,
})(MyForm);
