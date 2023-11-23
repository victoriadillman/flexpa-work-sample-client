import { useState, useEffect } from "react";
import ConnectFlexpa from './connectFlexpa';
import BenefitsContainer from './benefitsContainer'

export default function LandingContainer() {
  // Connected state to determine whether user needs to connect or can have benefits displayed dependenten on cookie or successful call to accessToken exchange
  const [connected, setConnected] = useState<boolean>(false);
  const [accessInfo, setAccessInfo] = useState<{accessToken?: string, expiresIn?: number}>({});

  // Checking for cookie on landing
  useEffect(() => {
    let response;
    const cookieCheck = async () => {
      try {
        response = await fetch('http://localhost:8000/check-cookie', {
          method: 'GET',
          headers: {
            "Content-type": "application/json"
          },
          credentials: 'include'
        });
        const hasCookie = await response.json()
        // If there is a cookie, sending the accessToken to the displayBenefits container for rendering
        if (hasCookie) {
          setAccessInfo({accessToken: hasCookie.access});
          setConnected(true);
        }
      } catch (err) {
        console.log(`error on cookie req ${err}`)
      }
    } 
    cookieCheck();
  }, [])

  return (
    <div className="flex flex-col justify-center items-center outline-dashed w-1/2 mt-8 p-4">
      {connected? (
        <BenefitsContainer accessInfo={accessInfo}/>
      ) : (
        <ConnectFlexpa setConnected={setConnected} setAccessInfo={setAccessInfo} />
      )
      }
    </div>
  )
}