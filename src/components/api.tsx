import axios from "axios";

const api = axios.create({
    baseURL:process.env.REACT_APP_API_URL_ISLOGIN,
    headers:{ "Content-Type" :"application/json" },
    withCredentials:true
})

export const checkIsOnlineUser = async () : Promise<boolean> => {
    try{
        const response = await api.post("/api/login",{
            data: {
                email: "exemple@gmail.com",
                password: "user123456@",
              }
        });
        return response.status ===  201;
    }
    catch(error){
        return false;
    }
}

export const logOutUser = async ():Promise<boolean> => {
    try{
        const response = await api.post("/api/logOut",{});
        return response.status === 200;
    }
    catch(error){
      alert("Une erreur est survenue lors de la déconnexion.");
      return false;
    }
}