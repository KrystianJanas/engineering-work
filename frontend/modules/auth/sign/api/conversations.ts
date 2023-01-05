import axios from 'axios';

export const signIn = async (login: string, password: string) => {
  const errors: any = [];
  if (login && login.length > 4 && login.includes('@')) {
    if (password && password.length > 4) {
      try {
        const response = await axios
          .post('http://localhost:3001/api/auth/login', {
            login,
            password,
          })
          .catch((reason) => {
            errors.push(reason.response.data);
            return errors;
          });

        if (response.data) {
          return { user: response.data };
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      errors.push('Niepoprawny format hasła!');
    }
  } else {
    errors.push('Niepoprawny adres e-mail!');
  }

  return { errors };
};

export const signUp = async (
  login: string,
  password: string,
  rePassword: string
) => {
  const errors: any = [];
  if (login && login.length > 4 && login.includes('@')) {
    if (password && password.length > 4) {
      if (rePassword && rePassword.length > 4 && password === rePassword) {
        try {
          const response = await axios
            .post('http://localhost:3001/api/auth', {
              login,
              password,
            })
            .catch((reason) => {
              errors.push(reason.response.data);
              return errors;
            });

          if (
            response.data &&
            response.data.status &&
            response.data.status === 201
          ) {
            return { success: true };
          }
          return { errors };
        } catch (error) {
          console.log(error);
        }
      } else {
        errors.push('Podane hasła nie zgadzają się!');
      }
    } else {
      errors.push('Niepoprawny format hasła!');
    }
  } else {
    errors.push('Niepoprawny adres e-mail!');
  }

  return { errors };
};
