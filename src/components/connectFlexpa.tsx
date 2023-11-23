import { useEffect } from "react";

// Initializing the FlexpaLink from the global object
declare const FlexpaLink: {
  create(config: FlexpaLinkConfig): Record<string, unknown>;
  open: () => Record<string, unknown>;
};

interface FlexpaLinkConfig {
  publishableKey: string;
  onSuccess: (publicToken: string) => void;
  onLoad?: () => void;
  onExit?: (error?: { code: string }) => void;
};

type ConnectProps = {
  setConnected: (val: boolean) => void;
  setAccessInfo: (val: {accessToken?: string, expiresIn?: number}) => void;
};

export default function ConnectFlexpa({setConnected, setAccessInfo} : ConnectProps) {

  useEffect(() => {
    if (!process.env.REACT_APP_FLEXPA_PUBLISHABLE_KEY) {
      console.error('No publishable key found. Check in .env')
    }
    // Creating FlexpaLink for users to authorize connection to health care data
    else {
      FlexpaLink.create({
        publishableKey: process.env.REACT_APP_FLEXPA_PUBLISHABLE_KEY,
        onSuccess: async (publicToken) => {
          // Exchanging the publicToken for an access token through the backend server
          let response;
          try {
            response = await fetch('http://localhost:8000/access-token-route', {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ publicToken })
            })
          } catch (err) {
            console.log(`error on request to server ${err}`)
          }

          if (!response) return;

          const { accessToken, expiresIn } = (await response.json());

          // Setting the cookie once accessToken is successful
          try {
            await fetch('http://localhost:8000/set-cookie', {
              method: 'POST',
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify({expiresIn, accessToken}),
              credentials: 'include'
            });
          } catch (err) {
            console.log('error on cookie request')
          }

          // Exchange the component of connecting to healthcare to the benefits components
          setConnected(true);
          setAccessInfo({accessToken: accessToken, expiresIn: expiresIn});
        }
      })
    }
    
  }, [setConnected, setAccessInfo])

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-xl">Connect with your health data</h2>
      <button 
        className="hover:bg-lime-green mt-4 py-1 px-3 border border-black rounded-full" 
        onClick={() => FlexpaLink.open()}>
        Click here to get started
      </button>
    </div>
  )
}