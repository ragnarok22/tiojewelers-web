function fetchWithAuthentication(url, authToken) {
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${authToken}`);
  return fetch(url, { headers });
}

export async function displayProtectedImage(imageUrl, authToken) {
  try {
    // Fetch the image.
    const response = await fetchWithAuthentication(
      imageUrl, authToken
    );
    // Create an object URL from the data.
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    return objectUrl
    //element.current.onload = () => URL.revokeObjectUrl(objectUrl);
  } catch (error) {
    console.error(error);
  }
}


export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

