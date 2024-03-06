function getData(url: string): Promise<any> {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.open("GET", url);
      xhr.send();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
          }
        }
      };
    });
  }
  
  export default getData;