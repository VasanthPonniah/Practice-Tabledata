import React from 'react'
import classes from './NewUser.module.css';
import useInput from '../hooks/useInput';

const NewUser = (props) => {
    const {
        input: enteredName,
        inputIsValid: nameIsValid,
        inputHasError: nameInputIsInValid,
        inputChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName,
    } = useInput((value) => value.trim() !== '');
    const {
        input: enteredAge,
        inputIsValid: ageIsValid,
        inputHasError: ageInputIsInValid,
        inputChangeHandler: ageChangeHandler,
        inputBlurHandler: ageBlurHandler,
        reset: resetAge,
    } = useInput((value) => value > 0);
    const {
        input: enteredExperience,
        inputIsValid: experienceIsValid,
        inputHasError: experienceInputIsInValid,
        inputChangeHandler: experienceChangeHandler,
        inputBlurHandler: experienceBlurHandler,
        reset: resetExperience,
    } = useInput((value) => value > 0);
    const {
        input: enteredQualification,
        inputIsValid: qualificationIsValid,
        inputHasError: qualificationInputIsInValid,
        inputChangeHandler: qualificationChangeHandler,
        inputBlurHandler: qualificationBlurHandler,
        reset: resetQualification,
    } = useInput((value) => value.trim().length !== "");
    const {
        input: enteredResidence,
        inputIsValid: residenceIsValid,
        inputHasError: residenceInputIsInValid,
        inputChangeHandler: residenceChangeHandler,
        inputBlurHandler: residenceBlurHandler,
        reset: resetResidence,
    } = useInput((value) => value.trim() !== "");
    const {
        input: enteredPhone,
        inputIsValid: phoneIsValid,
        inputHasError: phoneInputIsInValid,
        inputChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
        reset: resetPhone,
    } = useInput((value) => value.trim().length === 10);

    let formIsValid = false;
    if (nameIsValid && ageIsValid && experienceIsValid && qualificationIsValid && residenceIsValid && phoneIsValid)
        formIsValid = true;

    const submitHandler = (event) => {
        event.preventDefault();
        const addedUser = {
            id: Math.random() * 100,
            name: enteredName,
            age: enteredAge,
            experience: enteredExperience,
            qualification: enteredQualification,
            residence: enteredResidence,
            phone: enteredPhone
        }
        props.onAdd(addedUser)
        resetName();
        resetAge();
        resetExperience();
        resetQualification();
        resetResidence();
        resetPhone();
    }


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className='control-group'>
                <div className={classes.formControl}>
                    <label htmlFor='name'>Name</label>
                    <input
                        id='name'
                        type="text"
                        autoComplete='off'
                        value={enteredName}
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler} />
                    {nameInputIsInValid && <p className={classes.errorText}>Name should not be empty.</p>}
                </div>
                <div className={classes.formControl}>
                    <label htmlFor='age'>Age</label>
                    <input
                        id='age'
                        type="number"
                        value={enteredAge}
                        onChange={ageChangeHandler}
                        onBlur={ageBlurHandler} />
                    {ageInputIsInValid && <p className={classes.errorText}>Enter a valid age.</p>}
                </div>
                <div className={classes.formControl}>
                    <label htmlFor='experience'>Experience</label>
                    <input
                        id='experience'
                        type="number"
                        value={enteredExperience}
                        onChange={experienceChangeHandler}
                        onBlur={experienceBlurHandler} />
                    {experienceInputIsInValid && <p className={classes.errorText}>Enter a valid experience</p>}
                </div>
                <div className={classes.formControl}>
                    <label htmlFor='qualification'>Qualification</label>
                    <input
                        id='qualification'
                        type="text"
                        value={enteredQualification}
                        onChange={qualificationChangeHandler}
                        onBlur={qualificationBlurHandler} />
                    {qualificationInputIsInValid && <p className={classes.errorText}>Qualification field should not be empty</p>}
                </div>
                <div className={classes.formControl}>
                    <label htmlFor='residence'>Residence</label>
                    <input
                        id='residence'
                        type="text"
                        value={enteredResidence}
                        onChange={residenceChangeHandler}
                        onBlur={residenceBlurHandler} />
                    {residenceInputIsInValid && <p className={classes.errorText}>Enter Valid residential area</p>}
                </div>
                <div className={classes.formControl}>
                    <label htmlFor='phone'>Phone</label>
                    <input
                        id='phone'
                        type="text"
                        autoComplete='off'
                        value={enteredPhone}
                        onChange={phoneChangeHandler}
                        onBlur={phoneBlurHandler} />
                    {phoneInputIsInValid && <p className={classes.errorText}>Enter valid phone number</p>}
                </div>
                <div className="form-actions">
                    <button type="button" onClick={props.onClose}>Cancel</button>
                    <button disabled={!formIsValid} style={{ margin: '8px' }}>Add</button>
                </div>
            </div>
        </form>
    )
}

export default NewUser