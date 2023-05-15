const LocalStorageHandler = () =>{

    const addLoginToLocalStorage = (Obj) =>{
        const keys = Object.keys(Obj);
  
        keys.forEach((k) => {
          localStorage.setItem(k,Obj[`${k}`]);
        })
  
    }
  
    const clearLocalStorage = () => {
      localStorage.clear();
    }

    const getLoginFromStorage = () => {
        return {
            hash: localStorage.getItem("hash"),
            user: localStorage.getItem("user"),
            token: localStorage.getItem("token")
        }
    }

    return {
        addLoginToLocalStorage,
        clearLocalStorage,
        getLoginFromStorage
    }

}

export default LocalStorageHandler;