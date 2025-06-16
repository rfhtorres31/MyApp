import { BACKEND_URL, BACKEND_URL_2 } from "@env";
import {getGenericPassword, resetGenericPassword} from 'react-native-keychain';


// Note: An Asynchronous Function always returns a Promise because the result of this is not immediate. (Like a literal promise in real life.. hehe)
export const verifyToken = async (authToken :any): Promise<boolean> => {
         
      try {
            
          const responseObj = await fetch(`${BACKEND_URL}/api/auth/verify-token`, {
                 method: 'GET',
                 headers: {
                    "Authorization": `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                 },
          });

          if (!responseObj.ok) {
            return false; 
          }

          return true;    
        }

        catch (err) {   
           console.log(err);  
           return false;
        }
};



export const logoutUser = async (): Promise<any> => {
  
      try {

            const credentials = await getGenericPassword();

            if (!credentials) {
                throw new Error("No token stored");
            } 
            
            const authToken = credentials.password;
            const isTokenValid = await verifyToken(authToken);

            if (!isTokenValid){
               return {success:false, error: "Token is invalid"};
            }

            // This returns a Response Object, use .json() method to parse the content of it
            const responseObj = await fetch(`${BACKEND_URL}/api/auth/logout`, {
                   method: 'GET',
                     headers: {
                        "Authorization": `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                     },
            });
               
            if (!responseObj.ok) {
                  throw new Error("Error encounter on Logout");
            }
            

            // If responseObj.ok is true, (200 response from backend meaning token deletion from redis is successful
            // Deletes token from keychain storage
            const data = await responseObj.json();
            console.log(data);
            await resetGenericPassword(); // returns true if deleted and false if not
            return {success:true};
         
       } catch (err) {
             console.error(err);
             return {success:false, error: err};
       }

};