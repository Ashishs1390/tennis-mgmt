const updateValue = (values, setFormValue, formObj, formObjName) => {
    const allControls = Object.entries(values);
    const updatedForm = { ...formObj[formObjName] };
    for(let i = 0; i < allControls.length; i++) {
        const updateFormElement = { ...updatedForm[allControls[i][0]] };
        updateFormElement.value = allControls[i][1];
        updatedForm[allControls[i][0]] = updateFormElement;
    }
    setFormValue({ [formObjName]: updatedForm, formIsValid: formObj.formIsValid });
}

export default updateValue;