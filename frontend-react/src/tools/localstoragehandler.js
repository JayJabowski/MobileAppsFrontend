const LocalStorageHandler = () =>{

    const addToLocalStorage = (Obj) =>{
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
            token: localStorage.getItem("token"),
            theme: localStorage.getItem("isLight")
        }
    }

    const getThemeFromStorage = () => {
        return {
            theme: localStorage.getItem("isLight")
        }
    }

    return {
        addToLocalStorage,
        clearLocalStorage,
        getLoginFromStorage,
        getThemeFromStorage
    }

}

export default LocalStorageHandler;