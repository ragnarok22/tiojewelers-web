import axios from 'axios';

export const login = ({ email, password }) => {
  return axios.post('/oauth',
    JSON.stringify({
      username: email,
      password: password,
      grant_type: 'password',
      client_id: 'htG3wAssD',
      client_secret: 'weridetheworld',
    }),
    {
      validateStatus: (status) => {
        return status >= 200 && status < 500;
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
}
export const profile = () =>
  axios.get('/profile');

export const subscribe = (email) =>
  axios.post('/suscriptions', {
    email: email
  });

export const logout = () =>
  axios.post(`/logout`,
    JSON.stringify({}));

export const registration = ({ password, email }) =>
  axios.post('/register',
    {
      email: email,
      password: password
    }
  )

export const updatePassword = (previousPasswd, newPasswd) =>
  axios.post(
    '/password',
    {
      password: previousPasswd,
      newPassword: newPasswd,
    }
  );

export const updateProfile = ({ ...rest }, newData) =>
  axios.post(`/profile`, {
    ...rest, ...newData
  });

export const updateProfilePicture = (data) =>
  axios.post(`/profile`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    }});

  export const resendCode = () =>
    axios.post('/resendcode', JSON.stringify({}));


  export const activateUser = (code) =>
    axios.post('/activate',
      {
        code: code
      }
    );

  export const forgotPassword = (email) =>
    axios.post('/forget',
      {
        email: email
      }
    );

  export const resetPassword = (code, password, email) =>
    axios.post('/reset',
      {
        email: email,
        code: code,
        password: password
      }
    );

  export const deleteUser = (password) =>
    axios.post('/delete',
      {
        password: password
      }
    );

  // ejemplo para subir al server algun objeto que tenga dentro una imagen
  export const uploadObject = (token, item) => {
    const data = new FormData();
    data.append('media', {
      uri: 'file://' + item.photoPath,
      type: 'image/jpeg',
      name: 'media',
    });
    data.append('color', 'rojo');

    return axios.post(ip() + '/ruta al api', data, {
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  // ejemplo para descargar una imagen del server
  export const downloadSaveSample = (token, uuid, path_mobile_phone) =>
    RNFetchBlob.config({
      path: path_mobile_phone,
    }).fetch('GET', ip() + '/media/' + String(uuid), {
      Authorization: 'Bearer ' + token,
    });
