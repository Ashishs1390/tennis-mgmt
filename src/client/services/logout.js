import { post } from '../api/axios.api';

class Logout {
    constructor(navigate) {
       this.navigate = navigate;
    }

    logout = async () => {
        const result = await post('/api/tennismgmt/user/logout');
        if (!result.error) {
          this.navigate('/');
          localStorage.clear();
          history.go(); 
        } else {
          alert('Some thing went wrong while logout, please try again');
        }
      }
}
export default Logout;