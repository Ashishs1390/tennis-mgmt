const checkValidity = (value, rules, form) => {
    let isValid = true;
    let errorMessageFor = '';
    const allControls = {...form};
    const setErrorMesage = (valid, error) => {
        if (valid && errorMessageFor === '') {
            errorMessageFor = error;
        }
    }

    let notRequired = false;
    for(const rule of rules) {
        switch(rule.name) {
            case 'required': 
                if(rule.value) {
                    isValid = value.trim() !== '' && isValid;
                    setErrorMesage(!isValid, 'required');
                } else {
                    notRequired = true && value.trim() === '';
                }
            break;
            case 'minLength':
                isValid = (rule.value <= value.length && isValid) || notRequired;
                setErrorMesage(!isValid, 'minLength');
            break;
            case 'maxLength':
                isValid = (rule.value > value.length && isValid) || notRequired;
                setErrorMesage(!isValid, 'maxLength');
            break;
            case 'email':
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                isValid = re.test(String(value.trim()).toLowerCase()) || notRequired;
                setErrorMesage(!isValid, 'email');
            break;
            case 'confirm':
                isValid = (value.trim() !== '' && value === allControls[rule.value].value && isValid) || notRequired;
                setErrorMesage(!isValid, 'confirm');
            break;
        }
    }

    if(isValid) {
        return {isValid, errorMessageFor: ''};
    } else {
        return {isValid, errorMessageFor};
    }
    
  }

  export default checkValidity;