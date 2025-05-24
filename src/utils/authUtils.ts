import { BACKEND_URL } from "@env";

// Note: An Asynchronous Function always returns a Promise because the result of this is not immediate. (Like a literal promise in real life.. hehe)
export const verifyToken = async (authToken :any): Promise<boolean> => {
         
      try {
            
          const response = await fetch(`${BACKEND_URL}/api/auth/verify-token`, {
                 method: 'GET',
                 headers: {
                    "Authorization": `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                 },
          });
          
          const data = await response.json();
          console.log(data);

          if (!response.ok) {
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

