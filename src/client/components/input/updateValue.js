const updateValue = (values, setFormValue, formObj, formObjName) => {
    //  values = {
//     first_name: 'papu',
//     last_name: 'pande',
//     email: 'papu.pande@gmail.com',
//     password: '12345',
//     confirmPassword:'12345'
// };
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