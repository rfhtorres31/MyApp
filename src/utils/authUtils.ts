import { BACKEND_URL } from "@env";
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
          
          const data = await responseObj.json();
          console.log(data);

          if (!responseObj.ok) {
             console.log(data);
             throw new Error (JSON.stringify(data));           
          }
          return true;
        }

        // If token is invalid, redirect to Home (Auto Logout)
        catch (e) {      
           return false;
        }
};



export const logoutUser = async (): Promise<boolean> => {
  
      try {

            const credentials = await getGenericPassword();

            if (!credentials) {
                return false;
            } 
            
            const authToken = credentials.password;
            const isTokenValid = await verifyToken(authToken);

            if (!isTokenValid){
               return false;
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
               
            // Deletes user token from keychain storage
            await resetGenericPassword(); // returns true if deleted and false if not
            return true;
         
       } catch (err) {
             console.error(err);
             return false;
       }

};